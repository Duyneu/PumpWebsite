import { useSyncExternalStore } from 'react';
import { getEffectiveProducts, syncProductsFromD1 } from '../utils/productStorage';
import { Product } from '../types';

let cachedProducts: Product[] | null = null;
let initializedSync = false;

function getCachedProducts(): Product[] {
  if (!initializedSync && typeof window !== 'undefined') {
    initializedSync = true;
    syncProductsFromD1();
  }
  if (!cachedProducts) {
    cachedProducts = getEffectiveProducts();
  }
  return cachedProducts;
}

function subscribe(callback: () => void): () => void {
  const handler = () => {
    cachedProducts = getEffectiveProducts();
    callback();
  };
  window.addEventListener('voltor_products_changed', handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener('voltor_products_changed', handler);
    window.removeEventListener('storage', handler);
  };
}

export function useProducts(): Product[] {
  return useSyncExternalStore(subscribe, getCachedProducts, () => []);
}

export function invalidateProductsCache(): void {
  cachedProducts = getEffectiveProducts();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('voltor_products_changed'));
  }
}
