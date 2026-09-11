export interface Brand {
  id: string;
  name: string;
  logoUrl: string | null;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  attributes: Record<string, string>;
  price: number;
  compareAtPrice: number | null;
  isActive: boolean;
  isWholesaleEligible: boolean;
  wholesaleMoq: number | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  specifications: Record<string, string> | null;
  categoryId: string;
  category?: Category;
  brandId: string | null;
  brand?: Brand | null;
  isStudentDiscountEligible: boolean;
  isActive: boolean;
  variants: ProductVariant[];
  images: ProductImage[];
  createdAt: string;
}

export interface ListProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  brandId?: string;
  isStudentDiscountEligible?: boolean;
  search?: string;
}
