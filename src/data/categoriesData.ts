export interface CategoryType {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
  color: string;
  href: string;
}

export const categoriesData: CategoryType[] = [
  {
    id: 1,
    name: "Металлопрокат",
    description: "Трубы, листы, профили, арматура",
    icon: "Wrench",
    image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
    productCount: 1250,
    color: "from-gray-500 to-gray-700",
    href: "/catalog?category=Металлопрокат"
  },
  {
    id: 2,
    name: "Стройматериалы",
    description: "Цемент, кирпич, блоки, смеси",
    icon: "Home",
    image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
    productCount: 2100,
    color: "from-orange-500 to-red-600",
    href: "/catalog?category=Стройматериалы"
  },
  {
    id: 3,
    name: "Электроника",
    description: "Платы, компоненты, датчики",
    icon: "Cpu",
    image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
    productCount: 890,
    color: "from-blue-500 to-indigo-600",
    href: "/catalog?category=Электроника"
  },
  {
    id: 4,
    name: "Кровельные материалы",
    description: "Профнастил, металлочерепица, мембраны",
    icon: "Triangle",
    image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
    productCount: 670,
    color: "from-green-500 to-emerald-600",
    href: "/catalog?category=Кровельные материалы"
  },
  {
    id: 5,
    name: "Упаковочные материалы",
    description: "Коробки, пленка, скотч, этикетки",
    icon: "Package",
    image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
    productCount: 1540,
    color: "from-purple-500 to-violet-600",
    href: "/catalog?category=Упаковочные материалы"
  },
  {
    id: 6,
    name: "Электротехника",
    description: "Кабели, провода, щитовое оборудование",
    icon: "Zap",
    image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
    productCount: 980,
    color: "from-yellow-500 to-orange-500",
    href: "/catalog?category=Электротехника"
  },
  {
    id: 7,
    name: "Канцелярские товары",
    description: "Бумага, ручки, папки, принтеры",
    icon: "FileText",
    image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
    productCount: 750,
    color: "from-pink-500 to-rose-600",
    href: "/catalog?category=Канцелярские товары"
  },
  {
    id: 8,
    name: "Крепёжные изделия",
    description: "Болты, гайки, шайбы, саморезы",
    icon: "Settings",
    image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
    productCount: 1200,
    color: "from-teal-500 to-cyan-600",
    href: "/catalog?category=Крепёжные изделия"
  },
  {
    id: 9,
    name: "Светотехника",
    description: "LED-ленты, светильники, лампы",
    icon: "Lightbulb",
    image: "/img/43a9e543-590b-44fb-b286-827f5d9b1ef7.jpg",
    productCount: 420,
    color: "from-amber-500 to-yellow-600",
    href: "/catalog?category=Светотехника"
  },
  {
    id: 10,
    name: "Отделочные материалы",
    description: "Плитка, обои, ламинат, краски",
    icon: "Palette",
    image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
    productCount: 1350,
    color: "from-lime-500 to-green-600",
    href: "/catalog?category=Отделочные материалы"
  },
  {
    id: 11,
    name: "Полимерные материалы",
    description: "Пленка, трубы, листы, профили",
    icon: "Layers",
    image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
    productCount: 580,
    color: "from-indigo-500 to-purple-600",
    href: "/catalog?category=Полимерные материалы"
  },
  {
    id: 12,
    name: "Измерительные приборы",
    description: "Штангенциркули, рулетки, уровни",
    icon: "Ruler",
    image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
    productCount: 290,
    color: "from-slate-500 to-gray-600",
    href: "/catalog?category=Измерительные приборы"
  }
];