export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
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
