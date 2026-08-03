import { fetchWithCache, invalidateCache } from '@/lib/apiCache';
import { BackendProduct } from '@/utils/mapBackendProduct';

export const PRODUCTS_URL = 'https://functions.poehali.dev/65a30f37-03fa-4e12-ad16-d14f83cd61b4';

export interface BackendCategory {
  id: number;
  name: string;
  slug: string;
}

interface ProductsListResponse {
  products: BackendProduct[];
  pagination?: {
    page: number;
    limit: number;
    total_count: number;
    total_pages: number;
  };
}

// Категории почти никогда не меняются в рамках сессии — держим их в кэше долго.
const CATEGORIES_TTL = 10 * 60 * 1000;
// Списки товаров могут обновляться поставщиками — кэшируем на короткое время,
// чтобы просто не дублировать запросы при повторном рендере/переходах туда-обратно.
const PRODUCTS_TTL = 60 * 1000;

/** Загружает список категорий (с кэшированием). */
export async function fetchCategories(): Promise<BackendCategory[]> {
  return fetchWithCache('categories', CATEGORIES_TTL, async () => {
    const res = await fetch(`${PRODUCTS_URL}?action=categories`);
    const data = await res.json();
    return (data.categories || []) as BackendCategory[];
  });
}

/** Загружает список товаров по параметрам запроса (с кэшированием по строке параметров). */
export async function fetchProductsList(params: Record<string, string | number>): Promise<ProductsListResponse> {
  const search = new URLSearchParams(
    Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
  ).toString();
  const key = `products:${search}`;
  return fetchWithCache(key, PRODUCTS_TTL, async () => {
    const res = await fetch(`${PRODUCTS_URL}?${search}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return (await res.json()) as ProductsListResponse;
  });
}

/** Загружает один товар по id (с кэшированием). */
export async function fetchProductById(id: string | number): Promise<BackendProduct> {
  const key = `product:${id}`;
  return fetchWithCache(key, PRODUCTS_TTL, async () => {
    const res = await fetch(`${PRODUCTS_URL}?id=${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return (await res.json()) as BackendProduct;
  });
}

/** Сбрасывает кэш списков товаров — вызывать после создания/изменения/удаления товара. */
export function invalidateProductsCache() {
  invalidateCache('products:');
  invalidateCache('product:');
}
