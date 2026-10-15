/**
 * Image optimization utilities
 * Helps reduce bandwidth and improve loading times
 */

export interface ImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
}

/**
 * Generate responsive image sizes
 * @param baseUrl Base image URL
 * @returns Object with different image sizes
 */
export function generateResponsiveImages(baseUrl: string): ImageSizes {
  // For Unsplash images, we can use query params to get optimized sizes
  if (baseUrl.includes('unsplash.com')) {
    return {
      mobile: `${baseUrl}&w=640&q=75`,
      tablet: `${baseUrl}&w=1024&q=80`,
      desktop: `${baseUrl}&w=1920&q=85`,
    };
  }

  // For other images, return the same URL
  return {
    mobile: baseUrl,
    tablet: baseUrl,
    desktop: baseUrl,
  };
}

/**
 * Get optimized image URL based on device pixel ratio
 * @param baseUrl Base image URL
 * @param width Desired width
 * @param quality Desired quality (1-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  width: number = 800,
  quality: number = 80
): string {
  if (baseUrl.includes('unsplash.com')) {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const actualWidth = Math.round(width * dpr);
    return `${baseUrl}&w=${actualWidth}&q=${quality}&dpr=${dpr}`;
  }

  return baseUrl;
}

/**
 * Preload critical images
 * @param urls Array of image URLs to preload
 */
export function preloadImages(urls: string[]): void {
  if (typeof window === 'undefined') return;

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images using Intersection Observer
 * @param img Image element
 * @param src Image source URL
 */
export function lazyLoadImage(img: HTMLImageElement, src: string): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(img);
  } else {
    // Fallback for browsers without Intersection Observer
    img.src = src;
  }
}

/**
 * Convert image to WebP format (client-side check)
 * @returns true if WebP is supported
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;

  const elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    // Check if browser supports WebP
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  return false;
}

/**
 * Get image format based on browser support
 * @param originalUrl Original image URL
 * @returns Optimized image URL with best format
 */
export function getBestImageFormat(originalUrl: string): string {
  // If Unsplash, we can request WebP format
  if (originalUrl.includes('unsplash.com') && supportsWebP()) {
    return `${originalUrl}&fm=webp`;
  }

  return originalUrl;
}

/**
 * Calculate optimal image quality based on network speed
 * @returns Quality value (1-100)
 */
export function getOptimalQuality(): number {
  if (typeof navigator === 'undefined') return 80;

  const connection = (navigator as any).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 60;
      case '3g':
        return 70;
      case '4g':
        return 85;
      default:
        return 80;
    }
  }

  return 80;
}
