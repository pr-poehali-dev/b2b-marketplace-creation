import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductInquiryModal from "@/components/ProductInquiryModal";
import FlyToCartAnimation from "@/components/FlyToCartAnimation";
import { useCart } from "@/contexts/CartContext";
import CatalogHero from "@/components/catalog/CatalogHero";
import CatalogFilters from "@/components/catalog/CatalogFilters";
import CatalogToolbar from "@/components/catalog/CatalogToolbar";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import { Product } from "@/components/catalog/ProductCard";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [flyingAnimation, setFlyingAnimation] = useState<{
    isActive: boolean;
    startElement: HTMLElement | null;
    productImage?: string;
  }>({
    isActive: false,
    startElement: null,
    productImage: undefined
  });
  
  const { addItem } = useCart();

  // Расширенный каталог товаров
  const products: Product[] = [
    {
      id: 1,
      name: "Труба стальная бесшовная 108x4 мм ГОСТ 8732-78",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Металлопрокат",
      seller: "ООО «МетПром-Сталь»",
      verified: true,
      price: 45600,
      oldPrice: 48000,
      unit: "за тонну",
      minOrder: "5 тонн",
      available: "120 тонн",
      rating: 4.9,
      reviews: 127,
      inStock: true,
      discount: 5,
      description: "Высококачественная стальная труба для промышленного использования"
    },
    {
      id: 2,
      name: "Цемент ПЦ 400-Д20 навалом, М-400",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Стройматериалы",
      seller: "АО «СтройБаза Регион»",
      verified: true,
      price: 3850,
      unit: "за тонну",
      minOrder: "20 тонн",
      available: "500+ тонн",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      description: "Портландцемент высокого качества для строительных работ"
    },
    {
      id: 3,
      name: "Arduino Uno R3 + набор датчиков (комплект)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электроника",
      seller: "ТД «Электро-Компонент»",
      verified: true,
      price: 1290,
      oldPrice: 1450,
      unit: "за комплект",
      minOrder: "50 комплектов",
      available: "2,000+ шт",
      rating: 4.6,
      reviews: 234,
      inStock: true,
      discount: 11,
      description: "Полный стартовый набор для изучения Arduino с документацией"
    },
    {
      id: 4,
      name: "Профнастил оцинкованный С8-1150-0.5",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Кровельные материалы",
      seller: "ООО «КровляСтрой»",
      verified: true,
      price: 485,
      unit: "за м²",
      minOrder: "200 м²",
      available: "5,000+ м²",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      description: "Качественный профлист для кровельных и фасадных работ"
    },
    {
      id: 5,
      name: "Упаковка картонная гофрированная 300x200x100",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Упаковочные материалы",
      seller: "ООО «УпакТрейд»",
      verified: true,
      price: 18.50,
      unit: "за штуку",
      minOrder: "1,000 шт",
      available: "50,000+ шт",
      rating: 4.5,
      reviews: 67,
      inStock: false,
      description: "Прочная картонная упаковка для транспортировки товаров"
    },
    {
      id: 6,
      name: "Кабель ВВГнг-LS 3x2.5 (бухта 100м)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Электротехника",
      seller: "АО «КабельСистемы»",
      verified: true,
      price: 2340,
      unit: "за бухту",
      minOrder: "10 бухт",
      available: "200+ бухт",
      rating: 4.9,
      reviews: 98,
      inStock: true,
      description: "Негорючий силовой кабель для внутренней проводки"
    },
    {
      id: 7,
      name: "Бумага офисная А4 Svetocopy 80г/м² (500л.)",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Канцелярские товары",
      seller: "ООО «ОфисСнаб Плюс»",
      verified: true,
      price: 280,
      oldPrice: 320,
      unit: "за пачку",
      minOrder: "50 пачек",
      available: "1,000+ пачек",
      rating: 4.4,
      reviews: 145,
      inStock: true,
      discount: 13,
      description: "Высококачественная офисная бумага для печати и копирования"
    },
    {
      id: 8,
      name: "Комплект крепежа М12x60 (болт + гайка + шайба)",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Крепёжные изделия",
      seller: "ИП Крепёжкин А.В.",
      verified: false,
      price: 15,
      unit: "за комплект",
      minOrder: "500 комплектов",
      available: "10,000+ комплектов",
      rating: 4.2,
      reviews: 78,
      inStock: true,
      description: "Надежный крепежный набор из оцинкованной стали"
    },
    {
      id: 9,
      name: "Светодиодная лента RGB 5050 (5м + контроллер)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Светотехника",
      seller: "ТД «СветДиод»",
      verified: true,
      price: 1250,
      oldPrice: 1400,
      unit: "за комплект",
      minOrder: "20 комплектов",
      available: "500+ комплектов",
      rating: 4.6,
      reviews: 112,
      inStock: true,
      discount: 11,
      description: "Многоцветная LED-лента с пультом управления и контроллером"
    },
    {
      id: 10,
      name: "Плитка керамическая 30x30 см матовая",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Отделочные материалы",
      seller: "ООО «КерамПро»",
      verified: true,
      price: 890,
      unit: "за м²",
      minOrder: "50 м²",
      available: "2,000+ м²",
      rating: 4.5,
      reviews: 89,
      inStock: true,
      description: "Износостойкая керамическая плитка для внутренней отделки"
    },
    {
      id: 11,
      name: "Пленка полиэтиленовая техническая 200 мкм",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Полимерные материалы",
      seller: "АО «ПолиПак»",
      verified: true,
      price: 145,
      unit: "за м²",
      minOrder: "200 м²",
      available: "10,000+ м²",
      rating: 4.3,
      reviews: 56,
      inStock: true,
      description: "Прочная техническая пленка для упаковки и защиты"
    },
    {
      id: 12,
      name: "Инструмент измерительный: штангенциркуль 0-150мм",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Измерительные приборы",
      seller: "ТД «ТехПрибор»",
      verified: true,
      price: 850,
      unit: "за штуку",
      minOrder: "10 штук",
      available: "150+ штук",
      rating: 4.8,
      reviews: 43,
      inStock: true,
      description: "Высокоточный штангенциркуль с цифровым индикатором"
    },
    // Дополнительные товары для остальных категорий
    {
      id: 13,
      name: "Смеситель для ванны с душем, хром",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Сантехника",
      seller: "ООО «АквСистемы»",
      verified: true,
      price: 2850,
      unit: "за штуку",
      minOrder: "10 штук",
      available: "250+ штук",
      rating: 4.7,
      reviews: 92,
      inStock: true,
      description: "Качественный смеситель с керамическими картриджами"
    },
    {
      id: 14,
      name: "Унитаз компакт с бачком, белый",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Сантехника",
      seller: "АО «СанТехТрейд»",
      verified: true,
      price: 4200,
      oldPrice: 4800,
      unit: "за комплект",
      minOrder: "5 комплектов",
      available: "80+ комплектов",
      rating: 4.6,
      reviews: 67,
      inStock: true,
      discount: 13,
      description: "Современный унитаз-компакт с микролифтом сиденья"
    },
    {
      id: 15,
      name: "Радиатор алюминиевый 500мм 10 секций",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Отопление и вентиляция",
      seller: "ТД «ТеплоТехника»",
      verified: true,
      price: 3400,
      unit: "за радиатор",
      minOrder: "20 радиаторов",
      available: "500+ радиаторов",
      rating: 4.8,
      reviews: 134,
      inStock: true,
      description: "Высокоэффективный алюминиевый радиатор отопления"
    },
    {
      id: 16,
      name: "Вентилятор канальный 100мм с таймером",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Отопление и вентиляция",
      seller: "ООО «ВентСтрой»",
      verified: true,
      price: 1850,
      unit: "за штуку",
      minOrder: "15 штук",
      available: "300+ штук",
      rating: 4.5,
      reviews: 78,
      inStock: true,
      description: "Бесшумный вентилятор с функцией автоотключения"
    },
    {
      id: 17,
      name: "Тормозные колодки передние (комплект)",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Автокомплектующие",
      seller: "АвтоЗапчасти Центр",
      verified: true,
      price: 1450,
      oldPrice: 1600,
      unit: "за комплект",
      minOrder: "20 комплектов",
      available: "400+ комплектов",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      discount: 9,
      description: "Качественные тормозные колодки для легковых автомобилей"
    },
    {
      id: 18,
      name: "Масло моторное 5W-30 синтетика 4л",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Автокомплектующие",
      seller: "ТД «АвтоМасла»",
      verified: true,
      price: 2200,
      unit: "за канистру",
      minOrder: "50 канистр",
      available: "1,000+ канистр",
      rating: 4.7,
      reviews: 289,
      inStock: true,
      description: "Высококачественное синтетическое моторное масло"
    },
    {
      id: 19,
      name: "Стол офисный эргономичный 140x70см",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Мебель и интерьер",
      seller: "ООО «ОфисМебель Плюс»",
      verified: true,
      price: 8900,
      unit: "за штуку",
      minOrder: "5 штук",
      available: "120+ штук",
      rating: 4.4,
      reviews: 89,
      inStock: true,
      description: "Современный офисный стол с кабель-каналом"
    },
    {
      id: 20,
      name: "Кресло офисное с подлокотниками",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Мебель и интерьер",
      seller: "АО «КомфортМебель»",
      verified: true,
      price: 12500,
      oldPrice: 14000,
      unit: "за штуку",
      minOrder: "10 штук",
      available: "200+ штук",
      rating: 4.8,
      reviews: 145,
      inStock: true,
      discount: 11,
      description: "Эргономичное кресло с ортопедической спинкой"
    },
    {
      id: 21,
      name: "Костюм рабочий летний (куртка+брюки)",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Спецодежда и СИЗ",
      seller: "ТД «СпецОдежда»",
      verified: true,
      price: 1850,
      unit: "за комплект",
      minOrder: "20 комплектов",
      available: "500+ комплектов",
      rating: 4.3,
      reviews: 112,
      inStock: true,
      description: "Прочный рабочий костюм из смесовой ткани"
    },
    {
      id: 22,
      name: "Каска защитная строительная с подбородочным ремнем",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Спецодежда и СИЗ",
      seller: "ООО «БезопасТрейд»",
      verified: true,
      price: 450,
      unit: "за штуку",
      minOrder: "50 штук",
      available: "1,000+ штук",
      rating: 4.6,
      reviews: 87,
      inStock: true,
      description: "Ударопрочная каска с регулируемым размером"
    },
    {
      id: 23,
      name: "Мотокоса бензиновая 2.5 кВт с набором ножей",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Садовая техника",
      seller: "АО «СадТехника»",
      verified: true,
      price: 18500,
      oldPrice: 20000,
      unit: "за штуку",
      minOrder: "5 штук",
      available: "60+ штук",
      rating: 4.7,
      reviews: 94,
      inStock: true,
      discount: 8,
      description: "Профессиональная мотокоса для больших участков"
    },
    {
      id: 24,
      name: "Газонокосилка электрическая 1800Вт",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Садовая техника",
      seller: "ТД «ГарденТех»",
      verified: true,
      price: 12800,
      unit: "за штуку",
      minOrder: "3 штуки",
      available: "40+ штук",
      rating: 4.5,
      reviews: 67,
      inStock: true,
      description: "Легкая и мощная газонокосилка с мульчированием"
    },
    {
      id: 25,
      name: "Средство для мытья посуды концентрат 5л",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Химия и моющие средства",
      seller: "ООО «ХимПродукт»",
      verified: true,
      price: 850,
      unit: "за канистру",
      minOrder: "30 канистр",
      available: "500+ канистр",
      rating: 4.4,
      reviews: 123,
      inStock: true,
      description: "Экономичное моющее средство с антибактериальным эффектом"
    },
    {
      id: 26,
      name: "Порошок стиральный автомат 15кг",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Химия и моющие средства",
      seller: "АО «БытХим»",
      verified: true,
      price: 2350,
      unit: "за мешок",
      minOrder: "20 мешков",
      available: "300+ мешков",
      rating: 4.2,
      reviews: 78,
      inStock: false,
      description: "Универсальный стиральный порошок для всех типов тканей"
    },
    {
      id: 27,
      name: "Мука пшеничная высшего сорта 25кг",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Пищевая продукция",
      seller: "ООО «АгроПродукт»",
      verified: true,
      price: 890,
      unit: "за мешок",
      minOrder: "50 мешков",
      available: "1,000+ мешков",
      rating: 4.6,
      reviews: 167,
      inStock: true,
      description: "Высококачественная пшеничная мука для хлебопекарен"
    },
    {
      id: 28,
      name: "Сахар-песок белый кристаллический 50кг",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Пищевая продукция",
      seller: "АО «СладПром»",
      verified: true,
      price: 2450,
      oldPrice: 2650,
      unit: "за мешок",
      minOrder: "40 мешков",
      available: "800+ мешков",
      rating: 4.5,
      reviews: 134,
      inStock: true,
      discount: 8,
      description: "Чистый свекловичный сахар высшего качества"
    },
    {
      id: 29,
      name: "Ткань хлопчатобумажная плательная 150см",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Текстиль и ткани",
      seller: "ТД «ТекстильТорг»",
      verified: true,
      price: 285,
      unit: "за метр",
      minOrder: "100 метров",
      available: "2,000+ метров",
      rating: 4.3,
      reviews: 89,
      inStock: true,
      description: "Натуральная хлопковая ткань для пошива одежды"
    },
    {
      id: 30,
      name: "Нитки швейные полиэстер 40/2 (катушка 5000м)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Текстиль и ткани",
      seller: "ООО «ШвейФурнитура»",
      verified: true,
      price: 195,
      unit: "за катушку",
      minOrder: "200 катушек",
      available: "5,000+ катушек",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      description: "Прочные швейные нитки для промышленного использования"
    },
    {
      id: 31,
      name: "Тонометр автоматический с манжетой",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Медицинское оборудование",
      seller: "ООО «МедТехника»",
      verified: true,
      price: 3200,
      unit: "за штуку",
      minOrder: "10 штук",
      available: "150+ штук",
      rating: 4.8,
      reviews: 92,
      inStock: true,
      description: "Точный автоматический тонометр с памятью измерений"
    },
    {
      id: 32,
      name: "Стетоскоп медицинский двухголовочный",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Медицинское оборудование",
      seller: "АО «МедПоставка»",
      verified: true,
      price: 2850,
      oldPrice: 3100,
      unit: "за штуку",
      minOrder: "15 штук",
      available: "200+ штук",
      rating: 4.6,
      reviews: 67,
      inStock: true,
      discount: 8,
      description: "Профессиональный стетоскоп с отличной акустикой"
    },
    {
      id: 33,
      name: "Мяч футбольный профессиональный размер 5",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Спортивные товары",
      seller: "ТД «СпортМир»",
      verified: true,
      price: 1250,
      unit: "за штуку",
      minOrder: "20 штук",
      available: "300+ штук",
      rating: 4.5,
      reviews: 134,
      inStock: true,
      description: "Качественный футбольный мяч из натуральной кожи"
    },
    {
      id: 34,
      name: "Гантели разборные 2x20кг с грифом",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Спортивные товары",
      seller: "ООО «ФитнесТорг»",
      verified: true,
      price: 4850,
      oldPrice: 5200,
      unit: "за комплект",
      minOrder: "5 комплектов",
      available: "80+ комплектов",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      discount: 7,
      description: "Профессиональные разборные гантели с хромированным грифом"
    },
    {
      id: 35,
      name: "Холодильник двухкамерный No Frost 350л",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Бытовая техника",
      seller: "АО «ТехноДом»",
      verified: true,
      price: 45000,
      oldPrice: 48000,
      unit: "за штуку",
      minOrder: "2 штуки",
      available: "25+ штук",
      rating: 4.6,
      reviews: 78,
      inStock: true,
      discount: 6,
      description: "Энергоэффективный холодильник с системой No Frost"
    },
    {
      id: 36,
      name: "Микроволновая печь 25л с грилем",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Бытовая техника",
      seller: "ТД «БытТехника»",
      verified: true,
      price: 8900,
      unit: "за штуку",
      minOrder: "5 штук",
      available: "60+ штук",
      rating: 4.4,
      reviews: 112,
      inStock: true,
      description: "Функциональная микроволновая печь с конвекцией"
    },
    {
      id: 37,
      name: "Конструктор детский пластиковый 500 деталей",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Игрушки и товары для детей",
      seller: "ООО «ДетМир Опт»",
      verified: true,
      price: 2450,
      unit: "за набор",
      minOrder: "20 наборов",
      available: "400+ наборов",
      rating: 4.8,
      reviews: 167,
      inStock: true,
      description: "Развивающий конструктор для детей от 6 лет"
    },
    {
      id: 38,
      name: "Кукла интерактивная с аксессуарами",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Игрушки и товары для детей",
      seller: "АО «ИгрушкиОпт»",
      verified: true,
      price: 3200,
      oldPrice: 3500,
      unit: "за штуку",
      minOrder: "15 штук",
      available: "200+ штук",
      rating: 4.5,
      reviews: 94,
      inStock: true,
      discount: 9,
      description: "Интерактивная кукла с функцией разговора и ходьбы"
    },
    {
      id: 39,
      name: "Крем для лица увлажняющий 50мл",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Косметика и парфюмерия",
      seller: "ТД «БьютиПро»",
      verified: true,
      price: 890,
      unit: "за штуку",
      minOrder: "50 штук",
      available: "1,000+ штук",
      rating: 4.3,
      reviews: 156,
      inStock: true,
      description: "Питательный крем с гиалуроновой кислотой"
    },
    {
      id: 40,
      name: "Шампунь для всех типов волос 1л",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Косметика и парфюмерия",
      seller: "ООО «КосметикОпт»",
      verified: true,
      price: 450,
      oldPrice: 520,
      unit: "за флакон",
      minOrder: "100 флаконов",
      available: "2,000+ флаконов",
      rating: 4.4,
      reviews: 234,
      inStock: true,
      discount: 13,
      description: "Профессиональный шампунь с натуральными экстрактами"
    },
    {
      id: 41,
      name: "Дрель ударная аккумуляторная 18В",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Инструменты",
      seller: "АО «ИнструментПро»",
      verified: true,
      price: 8500,
      unit: "за штуку",
      minOrder: "5 штук",
      available: "120+ штук",
      rating: 4.7,
      reviews: 145,
      inStock: true,
      description: "Профессиональная дрель с двумя аккумуляторами"
    },
    {
      id: 42,
      name: "Набор отверток 12 предметов с магнитными наконечниками",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Инструменты",
      seller: "ТД «МастерТул»",
      verified: true,
      price: 1850,
      oldPrice: 2100,
      unit: "за набор",
      minOrder: "20 наборов",
      available: "300+ наборов",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      discount: 12,
      description: "Качественный набор отверток с эргономичными ручками"
    },
    {
      id: 43,
      name: "Корм для собак сухой премиум класса 15кг",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Животные и зоотовары",
      seller: "ООО «ЗооОпт»",
      verified: true,
      price: 3200,
      unit: "за мешок",
      minOrder: "10 мешков",
      available: "200+ мешков",
      rating: 4.8,
      reviews: 178,
      inStock: true,
      description: "Сбалансированный корм для взрослых собак средних пород"
    },
    {
      id: 44,
      name: "Наполнитель для кошачьего туалета 10л",
      image: "/img/d166a943-2618-4918-b162-2f653f5ae829.jpg",
      category: "Животные и зоотовары",
      seller: "АО «ПетТрейд»",
      verified: true,
      price: 650,
      oldPrice: 750,
      unit: "за мешок",
      minOrder: "40 мешков",
      available: "500+ мешков",
      rating: 4.5,
      reviews: 123,
      inStock: true,
      discount: 13,
      description: "Бентонитовый наполнитель с контролем запаха"
    },
    {
      id: 45,
      name: "Учебник по математике 5 класс (комплект)",
      image: "/img/eb347072-5079-42a8-9320-9ff8ccc544f5.jpg",
      category: "Книги и образование",
      seller: "ТД «УчебЛит»",
      verified: true,
      price: 850,
      unit: "за комплект",
      minOrder: "50 комплектов",
      available: "1,000+ комплектов",
      rating: 4.6,
      reviews: 234,
      inStock: true,
      description: "Учебно-методический комплект по ФГОС"
    },
    {
      id: 46,
      name: "Атлас мира географический (А4 формат)",
      image: "/img/30071e99-054b-4aad-b22b-679e73394520.jpg",
      category: "Книги и образование",
      seller: "ООО «ОбразТорг»",
      verified: true,
      price: 450,
      oldPrice: 520,
      unit: "за штуку",
      minOrder: "100 штук",
      available: "2,000+ штук",
      rating: 4.4,
      reviews: 167,
      inStock: true,
      discount: 13,
      description: "Подробный географический атлас с контурными картами"
    },
    {
      id: 47,
      name: "Ноутбук 15.6\" 8ГБ/256ГБ SSD",
      image: "/img/1896fbdf-f98d-49a3-9193-25c98958adcf.jpg",
      category: "Компьютеры и IT",
      seller: "АО «КомпТех»",
      verified: true,
      price: 45000,
      oldPrice: 48000,
      unit: "за штуку",
      minOrder: "3 штуки",
      available: "50+ штук",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      discount: 6,
      description: "Производительный ноутбук для офиса и учебы"
    },
    {
      id: 48,
      name: "Монитор 24\" Full HD IPS",
      image: "/img/764d08a6-7946-4b1d-9c27-48e192211cc0.jpg",
      category: "Компьютеры и IT",
      seller: "ТД «МониторПро»",
      verified: true,
      price: 12800,
      unit: "за штуку",
      minOrder: "10 штук",
      available: "150+ штук",
      rating: 4.5,
      reviews: 156,
      inStock: true,
      description: "Профессиональный монитор с IPS-матрицей"
    }
  ];

  // Фильтрация и сортировка товаров
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      const matchesVerified = !verifiedOnly || product.verified;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesVerified && matchesStock && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return (b.reviews || 0) - (a.reviews || 0);
        case "discount":
          return (b.discount || 0) - (a.discount || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Получить уникальные категории
  const categories = [...new Set(products.map(p => p.category))];

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setVerifiedOnly(false);
    setInStockOnly(false);
    setPriceRange([0, 100000]);
    setSortBy("name");
  };

  const handleToggleFavorite = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const isFavorite = favorites.includes(product.id);
    
    if (isFavorite) {
      setFavorites(prev => prev.filter(id => id !== product.id));
    } else {
      setFavorites(prev => [...prev, product.id]);
      
      // Находим карточку товара (родительский элемент)
      const cardElement = event.currentTarget.closest('[data-product-card]') as HTMLElement;
      
      // Запускаем анимацию полета в корзину от карточки товара
      setFlyingAnimation({
        isActive: true,
        startElement: cardElement || event.currentTarget,
        productImage: product.image
      });
      
      // Добавляем товар в корзину при добавлении в избранное
      addItem({
        id: product.id.toString(),
        title: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        company: product.seller
      });
    }
  };

  const handleAnimationComplete = () => {
    setFlyingAnimation(prev => ({
      ...prev,
      isActive: false
    }));
  };

  const handleSendInquiry = (product: Product) => {
    setSelectedProduct(product);
    setIsInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setSelectedProduct(null);
    setIsInquiryModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-6 py-8">
          <CatalogHero />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Боковая панель с фильтрами */}
            <div className="lg:col-span-1">
              <CatalogFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                verifiedOnly={verifiedOnly}
                setVerifiedOnly={setVerifiedOnly}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categories={categories}
                resetFilters={resetFilters}
                totalProducts={products.length}
                filteredProducts={filteredProducts.length}
              />
            </div>

            {/* Основной контент */}
            <div className="lg:col-span-3">
              <CatalogToolbar
                filteredProductsCount={filteredProducts.length}
                totalProducts={products.length}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              <CatalogGrid
                products={filteredProducts}
                viewMode={viewMode}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSendInquiry={handleSendInquiry}
                onResetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>

      <ProductInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={handleCloseInquiry}
        product={selectedProduct}
      />

      <FlyToCartAnimation
        isActive={flyingAnimation.isActive}
        startElement={flyingAnimation.startElement}
        productImage={flyingAnimation.productImage}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
};

export default Catalog;