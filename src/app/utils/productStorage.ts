import { products as baseProducts } from '../data/products';
import { Product } from '../types';

const STORAGE_KEYS = {
  CUSTOM: 'custom_products',
  DELETED: 'deleted_product_ids',
  UPDATED: 'updated_products',
  D1_CACHE: 'voltor_d1_products',
};

// 23 legacy mock IDs to exclude
const LEGACY_EXCLUDED_IDS = new Set(Array.from({ length: 23 }, (_, i) => String(i + 1)));

let d1ProductsCache: Product[] | null = null;
let isSyncing = false;

/**
 * Syncs the latest product catalog from Cloudflare D1 Database.
 */
export async function syncProductsFromD1(): Promise<Product[] | null> {
  if (isSyncing) return d1ProductsCache;
  isSyncing = true;
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        d1ProductsCache = data.data;
        try {
          localStorage.setItem(STORAGE_KEYS.D1_CACHE, JSON.stringify(data.data));
        } catch {}
        window.dispatchEvent(new CustomEvent('voltor_products_changed'));
        return d1ProductsCache;
      }
    }
  } catch (err) {
    // Offline or static fallback
  } finally {
    isSyncing = false;
  }
  return null;
}

/**
 * Returns all active products combining initial products + custom created products,
 * applying updates, and filtering out deleted products.
 */
export function getEffectiveProducts(): Product[] {
  let customProducts: Product[] = [];
  let updatedProducts: Record<string, Partial<Product>> = {};
  let deletedIds: string[] = [];

  try {
    const customRaw = localStorage.getItem(STORAGE_KEYS.CUSTOM);
    if (customRaw) customProducts = JSON.parse(customRaw);

    const updatedRaw = localStorage.getItem(STORAGE_KEYS.UPDATED);
    if (updatedRaw) updatedProducts = JSON.parse(updatedRaw);

    const deletedRaw = localStorage.getItem(STORAGE_KEYS.DELETED);
    if (deletedRaw) deletedIds = JSON.parse(deletedRaw).map(String);

    if (!d1ProductsCache) {
      const cached = localStorage.getItem(STORAGE_KEYS.D1_CACHE);
      if (cached) {
        d1ProductsCache = JSON.parse(cached);
      }
    }
  } catch (err) {
    console.error('Error reading products from localStorage:', err);
  }

  // Base list: Cloudflare D1 cache if available, else filtered base products
  const baseCatalog = d1ProductsCache && d1ProductsCache.length > 0
    ? d1ProductsCache
    : baseProducts.filter(p => !LEGACY_EXCLUDED_IDS.has(String(p.id)));

  // Combine custom created products first, then base catalog
  const combined: Product[] = [...customProducts, ...baseCatalog];

  // Apply updates & deduplicate by ID
  const productMap = new Map<string, Product>();

  for (const item of combined) {
    const id = String(item.id);
    // Skip if deleted
    if (deletedIds.includes(id) || LEGACY_EXCLUDED_IDS.has(id)) {
      continue;
    }

    // Apply any updates made by admin
    const override = updatedProducts[id];
    const finalProduct: Product = override ? { ...item, ...override } : item;

    // First one encountered wins (custom products are first so they take precedence)
    if (!productMap.has(id)) {
      productMap.set(id, finalProduct);
    }
  }

  return Array.from(productMap.values());
}

/**
 * Permanently deletes a product by ID across all pages and syncs to Cloudflare D1.
 */
export function deleteProduct(id: string | number): void {
  const strId = String(id);

  try {
    // 1. Add to deleted IDs list
    const deletedRaw = localStorage.getItem(STORAGE_KEYS.DELETED);
    const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw).map(String) : [];
    if (!deletedIds.includes(strId)) {
      deletedIds.push(strId);
      localStorage.setItem(STORAGE_KEYS.DELETED, JSON.stringify(deletedIds));
    }

    // 2. Remove from custom products if present
    const customRaw = localStorage.getItem(STORAGE_KEYS.CUSTOM);
    if (customRaw) {
      const custom: Product[] = JSON.parse(customRaw);
      const filtered = custom.filter(p => String(p.id) !== strId);
      localStorage.setItem(STORAGE_KEYS.CUSTOM, JSON.stringify(filtered));
    }

    // 3. Remove from updated products if present
    const updatedRaw = localStorage.getItem(STORAGE_KEYS.UPDATED);
    if (updatedRaw) {
      const updated: Record<string, any> = JSON.parse(updatedRaw);
      delete updated[strId];
      localStorage.setItem(STORAGE_KEYS.UPDATED, JSON.stringify(updated));
    }

    // Update memory cache
    if (d1ProductsCache) {
      d1ProductsCache = d1ProductsCache.filter(p => String(p.id) !== strId);
      try {
        localStorage.setItem(STORAGE_KEYS.D1_CACHE, JSON.stringify(d1ProductsCache));
      } catch {}
    }

    // Dispatch global event for instant reactivity
    window.dispatchEvent(new CustomEvent('voltor_products_changed', { detail: { action: 'delete', id: strId } }));

    // 4. Background Sync to Cloudflare D1
    fetch(`/api/products/${encodeURIComponent(strId)}`, {
      method: 'DELETE',
    }).catch(err => console.warn('[D1 Sync] Failed to delete product from Cloudflare D1:', err));
  } catch (err) {
    console.error('Error deleting product from localStorage:', err);
  }
}

/**
 * Saves a new product or updates an existing one and syncs to Cloudflare D1.
 */
export function saveProduct(product: Product, isEdit = false): void {
  const strId = String(product.id);

  try {
    // Ensure product is not marked as deleted
    const deletedRaw = localStorage.getItem(STORAGE_KEYS.DELETED);
    if (deletedRaw) {
      const deletedIds: string[] = JSON.parse(deletedRaw).map(String);
      const filtered = deletedIds.filter(id => id !== strId);
      localStorage.setItem(STORAGE_KEYS.DELETED, JSON.stringify(filtered));
    }

    if (isEdit) {
      // Check if it's an existing custom product
      const customRaw = localStorage.getItem(STORAGE_KEYS.CUSTOM);
      let isCustom = false;
      if (customRaw) {
        const custom: Product[] = JSON.parse(customRaw);
        const idx = custom.findIndex(p => String(p.id) === strId);
        if (idx >= 0) {
          isCustom = true;
          custom[idx] = product;
          localStorage.setItem(STORAGE_KEYS.CUSTOM, JSON.stringify(custom));
        }
      }

      // If not custom, save to updated_products override map
      if (!isCustom) {
        const updatedRaw = localStorage.getItem(STORAGE_KEYS.UPDATED);
        const updated: Record<string, Product> = updatedRaw ? JSON.parse(updatedRaw) : {};
        updated[strId] = product;
        localStorage.setItem(STORAGE_KEYS.UPDATED, JSON.stringify(updated));
      }
    } else {
      // New product: add to custom_products
      const customRaw = localStorage.getItem(STORAGE_KEYS.CUSTOM);
      const custom: Product[] = customRaw ? JSON.parse(customRaw) : [];
      const filtered = custom.filter(p => String(p.id) !== strId);
      filtered.unshift(product);
      localStorage.setItem(STORAGE_KEYS.CUSTOM, JSON.stringify(filtered));
    }

    // Update memory cache
    if (d1ProductsCache) {
      const idx = d1ProductsCache.findIndex(p => String(p.id) === strId);
      if (idx >= 0) {
        d1ProductsCache[idx] = product;
      } else {
        d1ProductsCache.unshift(product);
      }
      try {
        localStorage.setItem(STORAGE_KEYS.D1_CACHE, JSON.stringify(d1ProductsCache));
      } catch {}
    }

    // Dispatch global event for instant reactivity
    window.dispatchEvent(new CustomEvent('voltor_products_changed', { detail: { action: isEdit ? 'update' : 'create', product } }));

    // 4. Background Sync to Cloudflare D1
    const method = isEdit ? 'PUT' : 'POST';
    const endpoint = isEdit ? `/api/products/${encodeURIComponent(strId)}` : '/api/products';
    fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }).catch(err => console.warn('[D1 Sync] Failed to save product to Cloudflare D1:', err));
  } catch (err) {
    console.error('Error saving product to localStorage:', err);
  }
}

/**
 * Bulk updates multiple products across a column (brand, category, price, etc.)
 */
export function batchUpdateProducts(ids: (string | number)[], updates: Partial<Product>): void {
  const strIds = ids.map(String);
  try {
    const updatedRaw = localStorage.getItem(STORAGE_KEYS.UPDATED);
    const updatedMap: Record<string, Product> = updatedRaw ? JSON.parse(updatedRaw) : {};

    const all = getEffectiveProducts();
    for (const strId of strIds) {
      const existing = all.find(p => String(p.id) === strId);
      if (existing) {
        updatedMap[strId] = { ...existing, ...updates };
      }
    }
    localStorage.setItem(STORAGE_KEYS.UPDATED, JSON.stringify(updatedMap));

    // Update memory cache
    if (d1ProductsCache) {
      d1ProductsCache = d1ProductsCache.map(p => {
        if (strIds.includes(String(p.id))) {
          return { ...p, ...updates };
        }
        return p;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.D1_CACHE, JSON.stringify(d1ProductsCache));
      } catch {}
    }

    // Trigger reactivity
    window.dispatchEvent(new CustomEvent('voltor_products_changed', { detail: { action: 'batch-update', ids: strIds, updates } }));

    // Send batch update to Cloudflare D1
    fetch('/api/products/batch-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: strIds, updates }),
    }).catch(err => console.warn('[D1 Sync] Batch update failed:', err));
  } catch (err) {
    console.error('Error in batchUpdateProducts:', err);
  }
}

/**
 * Bulk deletes multiple products by IDs.
 */
export function batchDeleteProducts(ids: (string | number)[]): void {
  const strIds = ids.map(String);
  try {
    const deletedRaw = localStorage.getItem(STORAGE_KEYS.DELETED);
    const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw).map(String) : [];
    for (const strId of strIds) {
      if (!deletedIds.includes(strId)) {
        deletedIds.push(strId);
      }
    }
    localStorage.setItem(STORAGE_KEYS.DELETED, JSON.stringify(deletedIds));

    // Update memory cache
    if (d1ProductsCache) {
      d1ProductsCache = d1ProductsCache.filter(p => !strIds.includes(String(p.id)));
      try {
        localStorage.setItem(STORAGE_KEYS.D1_CACHE, JSON.stringify(d1ProductsCache));
      } catch {}
    }

    // Trigger reactivity
    window.dispatchEvent(new CustomEvent('voltor_products_changed', { detail: { action: 'batch-delete', ids: strIds } }));

    // Send batch delete to Cloudflare D1
    fetch('/api/products/batch-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: strIds }),
    }).catch(err => console.warn('[D1 Sync] Batch delete failed:', err));
  } catch (err) {
    console.error('Error in batchDeleteProducts:', err);
  }
}

/**
 * Gets a single product by ID.
 */
export function getProductById(id: string | number): Product | undefined {
  const strId = String(id);
  const all = getEffectiveProducts();
  return all.find(p => String(p.id) === strId);
}

/**
 * Resets all deleted and custom products back to the original catalog.
 */
export function resetProductsToDefault(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM);
    localStorage.removeItem(STORAGE_KEYS.DELETED);
    localStorage.removeItem(STORAGE_KEYS.UPDATED);
    window.dispatchEvent(new CustomEvent('voltor_products_changed', { detail: { action: 'reset' } }));
  } catch (err) {
    console.error('Error resetting products:', err);
  }
}
