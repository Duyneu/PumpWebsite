import { products as baseProducts } from '../data/products';
import { Product } from '../types';

const STORAGE_KEYS = {
  CUSTOM: 'custom_products',
  DELETED: 'deleted_product_ids',
  UPDATED: 'updated_products',
};

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
  } catch (err) {
    console.error('Error reading products from localStorage:', err);
  }

  // Combine custom created products first, then base products
  const combined: Product[] = [...customProducts, ...baseProducts];

  // Apply updates & deduplicate by ID
  const productMap = new Map<string, Product>();

  for (const item of combined) {
    const id = String(item.id);
    // Skip if deleted
    if (deletedIds.includes(id)) {
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
 * Permanently deletes a product by ID across all pages.
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

    // Dispatch global event for instant reactivity
    window.dispatchEvent(new CustomEvent('voltor_products_changed', { detail: { action: 'delete', id: strId } }));
  } catch (err) {
    console.error('Error deleting product from localStorage:', err);
  }
}

/**
 * Saves a new product or updates an existing one.
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
      // Remove any duplicate if exists then unshift
      const filtered = custom.filter(p => String(p.id) !== strId);
      filtered.unshift(product);
      localStorage.setItem(STORAGE_KEYS.CUSTOM, JSON.stringify(filtered));
    }

    // Dispatch global event for instant reactivity
    window.dispatchEvent(new CustomEvent('voltor_products_changed', { detail: { action: isEdit ? 'update' : 'create', product } }));
  } catch (err) {
    console.error('Error saving product to localStorage:', err);
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
