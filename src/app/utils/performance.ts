/**
 * Performance monitoring utilities
 * Helps track and optimize app performance
 */

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private marks: Map<string, number> = new Map();

  /**
   * Start timing a performance metric
   */
  start(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * End timing and record the metric
   */
  end(name: string): number | null {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`Performance mark "${name}" not found`);
      return null;
    }

    const duration = performance.now() - startTime;
    this.metrics.push({
      name,
      duration,
      timestamp: Date.now(),
    });

    this.marks.delete(name);

    // Log if duration is too long (> 1 second)
    if (duration > 1000) {
      console.warn(`⚠️ Slow operation: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Measure function execution time
   */
  async measure<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
    this.start(name);
    try {
      const result = await Promise.resolve(fn());
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get average duration for a specific metric name
   */
  getAverage(name: string): number {
    const filtered = this.metrics.filter((m) => m.name === name);
    if (filtered.length === 0) return 0;

    const sum = filtered.reduce((acc, m) => acc + m.duration, 0);
    return sum / filtered.length;
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
    this.marks.clear();
  }

  /**
   * Log performance summary
   */
  logSummary(): void {
    const uniqueNames = [...new Set(this.metrics.map((m) => m.name))];
    
    console.group('📊 Performance Summary');
    uniqueNames.forEach((name) => {
      const avg = this.getAverage(name);
      const count = this.metrics.filter((m) => m.name === name).length;
      console.log(`${name}: ${avg.toFixed(2)}ms (${count} calls)`);
    });
    console.groupEnd();
  }
}

export const perfMonitor = new PerformanceMonitor();

/**
 * Check if device has slow network
 */
export function isSlowNetwork(): boolean {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn) {
      // Check for slow connection types
      const slowTypes = ['slow-2g', '2g'];
      if (slowTypes.includes(conn.effectiveType)) {
        return true;
      }
      // Check for save-data preference
      if (conn.saveData) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check if device has low memory
 */
export function isLowMemory(): boolean {
  if ('deviceMemory' in navigator) {
    // Less than 4GB RAM
    return (navigator as any).deviceMemory < 4;
  }
  return false;
}

/**
 * Get recommended settings based on device capabilities
 */
export function getRecommendedSettings() {
  return {
    shouldLazyLoad: true, // Always lazy load
    shouldPreload: !isSlowNetwork(), // Only preload on fast networks
    imageQuality: isSlowNetwork() ? 'low' : 'high',
    animationsEnabled: !isLowMemory(),
    cacheEnabled: true,
  };
}

/**
 * Report Web Vitals to console (for debugging)
 */
export function reportWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('🎨 LCP:', entry);
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // LCP not supported
  }

  // First Input Delay (FID)
  if ('PerformanceEventTiming' in window) {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('⚡ FID:', entry);
      }
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }
  }

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        console.log('📐 CLS:', clsValue);
      }
    }
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // CLS not supported
  }
}
