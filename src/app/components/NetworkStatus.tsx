import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * NetworkStatus component
 * Shows notification when network is slow or offline
 */
export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        setShowNotification(true);
      }
    };

    // Check network speed
    const checkNetworkSpeed = () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        if (conn) {
          const slowTypes = ['slow-2g', '2g', '3g'];
          const isSlow = slowTypes.includes(conn.effectiveType);
          setIsSlowNetwork(isSlow);
          
          if (isSlow && isOnline) {
            setShowNotification(true);
            // Auto hide after 5 seconds
            setTimeout(() => setShowNotification(false), 5000);
          }
        }
      }
    };

    // Initial check
    updateOnlineStatus();
    checkNetworkSpeed();

    // Event listeners
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Check network speed on change
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn) {
        conn.addEventListener('change', checkNetworkSpeed);
      }
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        if (conn) {
          conn.removeEventListener('change', checkNetworkSpeed);
        }
      }
    };
  }, [isOnline]);

  // Auto hide notification when back online
  useEffect(() => {
    if (isOnline && !isSlowNetwork) {
      const timer = setTimeout(() => setShowNotification(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, isSlowNetwork]);

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full mx-4"
        >
          <div
            className={`rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 ${
              !isOnline
                ? 'bg-red-500 text-white'
                : 'bg-yellow-500 text-white'
            }`}
          >
            {!isOnline ? (
              <>
                <WifiOff className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">Mất kết nối mạng</p>
                  <p className="text-xs opacity-90">Vui lòng kiểm tra kết nối của bạn</p>
                </div>
              </>
            ) : (
              <>
                <Wifi className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">Mạng chậm được phát hiện</p>
                  <p className="text-xs opacity-90">Website đã tối ưu cho trải nghiệm tốt hơn</p>
                </div>
              </>
            )}
            <button
              onClick={() => setShowNotification(false)}
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
