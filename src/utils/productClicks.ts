const STORAGE_KEY = 'product_clicks';

export interface ProductClickData {
  id: number;
  name: string;
  image: string;
  category: string;
  seller: string;
  verified: boolean;
  price: string;
  unit: string;
  minOrder: string;
  available: string;
  clicks: number;
  lastClickedAt: number;
}

export function trackProductClick(product: Omit<ProductClickData, 'clicks' | 'lastClickedAt'>) {
  const data = getProductClicks();
  const existing = data[product.id];
  data[product.id] = {
    ...product,
    clicks: (existing?.clicks || 0) + 1,
    lastClickedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('product-clicks-updated'));
}

export function getProductClicks(): Record<number, ProductClickData> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function getTopProducts(limit = 8): ProductClickData[] {
  const data = getProductClicks();
  return Object.values(data)
    .sort((a, b) => b.clicks - a.clicks || b.lastClickedAt - a.lastClickedAt)
    .slice(0, limit);
}
