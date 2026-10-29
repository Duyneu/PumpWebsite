import { useSyncExternalStore } from 'react';
import { getEffectiveProducts } from '../utils/productStorage';
import { Product } from '../types';

let cachedProducts: Product[] | null = null;

function getCachedProducts(): Product[] {
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
}
