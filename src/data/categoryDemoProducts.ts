import { CategoryType } from "./categoriesData";

// Пул реальных изображений проекта, используем для карусели демо-товаров
const IMAGE_POOL = [
  "/img/12bdf578-7cfe-4dd8-be76-225c50da33d8.jpg",
  "/img/13af019d-fd32-49c0-88e6-fbb18b518599.jpg",
  "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
  "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
  "/img/362f4a8d-c95c-4a33-a331-7aed8fda79db.jpg",
  "/img/3c6225a0-ffae-46df-84b3-37b833e80bee.jpg",
  "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
  "/img/4455f9ea-1266-4bb2-b0ca-3f7ddfc86aee.jpg",
  "/img/559113ab-05d9-4e39-9c9c-dcbdbe63e35b.jpg",
  "/img/6d3bd2ba-b4b6-4fca-8627-990d1c18fbc8.jpg",
  "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
  "/img/81fc0ed8-6b11-402d-9048-0116ba26a8e4.jpg",
  "/img/8b7fccbc-5aa7-4f7b-82e2-aabfd14263ff.jpg",
  "/img/920b621f-0803-406a-bfa1-f3d8b85c1762.jpg",
  "/img/967a43bb-bb29-400c-ae7e-cad802988407.jpg",
  "/img/a8a12200-5509-4746-826f-bafbbb74fb68.jpg",
  "/img/c75818f8-e6f1-4921-ab0a-99f7e8109e4d.jpg",
  "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
  "/img/de534f08-2a51-46d8-87f1-b55042f10230.jpg",
  "/img/e609e60c-cb27-4ef8-809f-b5d3ba4a4fe1.jpg",
  "/img/e7d14dd1-2dbd-4ef4-a9fa-16c8b4ff8b33.jpg",
  "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
  "/img/fd7d00c7-29ce-4483-b35b-705ae512901d.jpg",
];

export interface DemoProduct {
  id: string;
  name: string;
  categoryName: string;
  description: string;
  images: string[];
}

function getImagesFor(seed: number, count = 3): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (seed + i * 7) % IMAGE_POOL.length;
    result.push(IMAGE_POOL[idx]);
  }
  return result;
}

function getProductBaseNames(category: CategoryType): string[] {
  const items = category.description
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const names: string[] = [];
  for (let i = 0; i < 4; i++) {
    const base = items[i % items.length] || category.name;
    const capitalized = base.charAt(0).toUpperCase() + base.slice(1);
    const batch = Math.floor(i / items.length);
    names.push(batch > 0 ? `${capitalized} (партия ${batch + 1})` : capitalized);
  }
  return names;
}

// Тестовая генерация: по 4 демо-товара на каждую категорию (без исключения).
// Все товары помечены как отсутствующие на складе — это временная витрина-заглушка,
// чтобы показать, как будет выглядеть карточка с фото, описанием и каруселью.
export function getDemoProductsForCategory(category: CategoryType): DemoProduct[] {
  const names = getProductBaseNames(category);
  return names.map((name, index) => ({
    id: `${category.id}-${index}`,
    name,
    categoryName: category.name,
    description: `${name} из раздела «${category.name}». Качественная продукция от проверенных поставщиков. Уточняйте наличие и сроки поставки у менеджера.`,
    images: getImagesFor(category.id * 4 + index, 3),
  }));
}
