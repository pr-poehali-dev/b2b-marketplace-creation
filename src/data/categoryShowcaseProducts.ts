import { Product } from "@/components/catalog/ProductCard";
import { categoriesData } from "./categoriesData";
import { getDemoProductsForCategory } from "./categoryDemoProducts";

// ТЕСТОВО: единая витрина демо-товаров — по 4 штуки на КАЖДУЮ категорию без исключения.
// Используется как временная заглушка везде, где реальных товаров с сервера ещё нет
// (главная страница, "Популярные товары", каталог), чтобы показать вид карточек.
// Все товары помечены "Нет в наличии" (inStock: false).
// Чтобы убрать — просто перестать использовать categoryShowcaseProducts в местах вызова.

const DEMO_SELLER_EMAIL = "bmbusinessmarket@yandex.ru";

function pseudoPrice(seed: number): number {
  const base = (seed * 9301 + 49297) % 233280;
  const normalized = base / 233280;
  return Math.round((500 + normalized * 94500) / 10) * 10;
}

export const categoryShowcaseProducts: Product[] = categoriesData.flatMap((category) => {
  const demoItems = getDemoProductsForCategory(category);
  return demoItems.map((item, idx) => {
    const seed = category.id * 10 + idx;
    const product: Product = {
      id: 900000 + seed,
      name: item.name,
      image: item.images[0],
      images: item.images,
      category: category.name,
      seller: `Поставщик «${category.name}»`,
      sellerEmail: DEMO_SELLER_EMAIL,
      verified: idx % 2 === 0,
      price: pseudoPrice(seed),
      unit: "за единицу",
      minOrder: "10 шт.",
      available: "Под заказ",
      inStock: false,
      description: item.description,
      detailedDescription: item.description,
      fastDelivery: false,
      region: undefined,
    };
    return product;
  });
});
