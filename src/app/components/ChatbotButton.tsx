import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasNotification?: boolean;
}

export function ChatbotButton({ isOpen, onClick, hasNotification }: ChatbotButtonProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
      {/* AI Chatbot Button - Main */}
      <button
        onClick={onClick}
        onMouseEnter={() => setHoveredButton('ai')}
        onMouseLeave={() => setHoveredButton(null)}
        className="group relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-primary/80 hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] hover:scale-110"
        aria-label="Chat với AI"
      >
        {/* Pulse animation khi không mở */}
        {!isOpen && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />}
        
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full border-2 border-primary-foreground/20 group-hover:border-primary-foreground/40 transition-colors" />
        
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground transition-transform duration-300" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-primary-foreground relative z-10 transition-transform duration-300 group-hover:scale-110" />
            {hasNotification && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full animate-pulse border-2 border-background" />
            )}
          </>
        )}
        
        {/* Tooltip */}
        {!isOpen && (
          <span className={`absolute left-full ml-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap shadow-lg transition-all duration-300 pointer-events-none ${
            hoveredButton === 'ai' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}>
            Tư vấn với AI
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-foreground rotate-45" />
          </span>
        )}
      </button>

      {/* Facebook Messenger Button */}
      <a
        href="https://www.facebook.com/profile.php?id=61576883068377"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHoveredButton('messenger')}
        onMouseLeave={() => setHoveredButton(null)}
        className="group relative w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0099FF] via-[#0066FF] to-[#5B51D8] hover:shadow-[0_8px_30px_rgba(0,102,255,0.4)] hover:scale-110"
        aria-label="Chat qua Messenger"
      >
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
        
        {/* Messenger Icon */}
        <svg className="w-6 h-6 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.02.49.53.81.98.63l1.99-.88c.17-.07.36-.09.54-.05.86.17 1.77.27 2.71.27 5.64 0 10.22-4.13 10.22-9.22S17.64 2 12 2z"/>
          <path fill="#0099FF" d="m6.53 14.97 2.97-4.72a1.5 1.5 0 0 1 2.17-.4l2.36 1.77c.23.17.54.17.77 0l3.19-2.42c.42-.32.97.19.69.64l-2.97 4.72a1.5 1.5 0 0 1-2.17.4l-2.36-1.77a.56.56 0 0 0-.77 0l-3.19 2.42c-.42.32-.97-.19-.69-.64z"/>
        </svg>

        {/* Tooltip */}
        <span className={`absolute left-full ml-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap shadow-lg transition-all duration-300 pointer-events-none ${
          hoveredButton === 'messenger' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}>
          Chat qua Messenger
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-foreground rotate-45" />
        </span>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0898296336"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHoveredButton('zalo')}
        onMouseLeave={() => setHoveredButton(null)}
        className="group relative w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden bg-[#0068FF] hover:shadow-[0_8px_30px_rgba(0,104,255,0.4)] hover:scale-110"
        aria-label="Chat qua Zalo (0898 296 336)"
        title="Chat qua Zalo (0898 296 336)"
      >
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
        
        {/* Zalo Logo */}
        <svg className="w-9 h-9 relative z-10" viewBox="0 0 48 48" fill="none">
          <rect x="4" y="4" width="40" height="40" rx="10" fill="white"/>
          <path d="M32.5 14H15.5C14.12 14 13 15.12 13 16.5V31.5C13 32.88 14.12 34 15.5 34H32.5C33.88 34 35 32.88 35 31.5V16.5C35 15.12 33.88 14 32.5 14Z" fill="#0068FF"/>
          <text x="24" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">Zalo</text>
        </svg>

        {/* Tooltip */}
        <span className={`absolute left-full ml-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap shadow-lg transition-all duration-300 pointer-events-none ${
          hoveredButton === 'zalo' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}>
          Chat qua Zalo
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-foreground rotate-45" />
        </span>
      </a>
    </div>
  );
}
