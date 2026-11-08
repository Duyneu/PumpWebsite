export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  brand?: string;
  sku?: string;
  model?: string;
  origin?: string;
  warranty?: string;
  image: string;
  description: string;
  specs?: {
    power?: string;
    flow?: string;
    head?: string;
    material?: string;
    [key: string]: string | undefined;
  };
  customSpecs?: Array<{ name: string; value: string }>;
  inStock: boolean;
}
