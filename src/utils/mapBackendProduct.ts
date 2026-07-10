import { Product } from "@/components/catalog/ProductCard";

export interface BackendProduct {
  id: number;
  supplier_id: number;
  category_id: number;
  category_name?: string;
  supplier_name?: string;
  name: string;
  description?: string;
  short_description?: string;
  price: number;
  currency: string;
  discount_percentage: number;
  stock_quantity: number;
  min_order_quantity: number;
  main_image_url?: string;
  gallery_images?: string[];
  status: string;
}

const FALLBACK_IMAGE = "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg";

export function mapBackendProduct(bp: BackendProduct): Product {
  const mainImage = bp.main_image_url || bp.gallery_images?.[0] || FALLBACK_IMAGE;
  const gallery = [mainImage, ...(bp.gallery_images || []).filter((u) => u && u !== mainImage)];
  const hasDiscount = bp.discount_percentage > 0;
  const oldPrice = hasDiscount
    ? Math.round(bp.price / (1 - bp.discount_percentage / 100))
    : undefined;

  return {
    id: bp.id,
    name: bp.name,
    image: mainImage,
    images: gallery,
    category: bp.category_name || "Без категории",
    seller: bp.supplier_name || "Поставщик",
    verified: false,
    price: bp.price,
    oldPrice,
    unit: "за единицу",
    minOrder: `${bp.min_order_quantity} шт.`,
    available: bp.stock_quantity > 0 ? `${bp.stock_quantity} шт.` : "Под заказ",
    inStock: bp.stock_quantity > 0,
    discount: hasDiscount ? bp.discount_percentage : undefined,
    description: bp.short_description || bp.description || "",
    detailedDescription: bp.description || bp.short_description || "",
    fastDelivery: false,
    region: undefined,
  };
}
