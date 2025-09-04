import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Icon from "@/components/ui/icon";
import { useNavigate } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  company: string;
  date: string;
  category: 'economy' | 'market' | 'business' | 'policy';
  readTime: string;
  image?: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Рост экспорта российских товаров в страны БРИКС',
    description: 'По итогам третьего квартала экспорт российской продукции в страны БРИКС вырос на 23% по сравнению с аналогичным периодом прошлого года.',
    content: 'Детальный анализ показывает устойчивые тенденции роста торговых отношений...',
    author: 'Иван Петров',
    company: 'ООО "Экспорт Плюс"',
    date: '2024-03-15',
    category: 'economy',
    readTime: '5 мин'
  },
  {
    id: '2', 
    title: 'Новые возможности для малого и среднего бизнеса',
    description: 'Правительство анонсировало программу поддержки МСП с увеличенным размером субсидий и упрощенной процедурой получения.',
    content: 'Программа включает в себя несколько направлений поддержки...',
    author: 'Мария Сидорова',
    company: 'АО "Бизнес Консалтинг"',
    date: '2024-03-14',
    category: 'policy',
    readTime: '7 мин'
  },
  {
    id: '3',
    title: 'Цифровизация торговых площадок: тренды 2024',
    description: 'Исследование показывает, что 78% B2B компаний планируют увеличить инвестиции в цифровые торговые платформы.',
    content: 'Аналитики отмечают ключевые направления развития...',
    author: 'Алексей Волков',
    company: 'ПАО "ТехИнвест"',
    date: '2024-03-13',
    category: 'business',
    readTime: '4 мин'
  },
  {
    id: '4',
    title: 'Налоговые льготы для IT-сферы продлены до 2030 года',
    description: 'Правительство РФ приняло решение о продлении льготного налогообложения для IT-компаний на период до 2030 года.',
    content: 'Решение направлено на поддержку развития отечественной IT-отрасли...',
    author: 'Елена Кузнецова',
    company: 'ПАО "ТехноСфера"',
    date: '2024-03-12',
    category: 'policy',
    readTime: '6 мин'
  },
  {
    id: '5',
    title: 'Импортозамещение в промышленности: результаты года',
    description: 'По данным Минпромторга, доля отечественных товаров в ключевых отраслях промышленности выросла на 15%.',
    content: 'Наибольший рост наблюдается в машиностроении и химической промышленности...',
    author: 'Дмитрий Соколов',
    company: 'ООО "ПромРазвитие"',
    date: '2024-03-11',
    category: 'market',
    readTime: '8 мин'
  },
  {
    id: '6',
    title: 'Зеленые технологии в российском бизнесе',
    description: 'Все больше российских компаний внедряют экологически чистые технологии и получают ESG-сертификаты.',
    content: 'Тенденция к устойчивому развитию становится ключевым фактором...',
    author: 'Анна Белова',
    company: 'ООО "ЭкоТех"',
    date: '2024-03-10',
    category: 'business',
    readTime: '5 мин'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'economy': return 'bg-blue-100 text-blue-800';
    case 'market': return 'bg-green-100 text-green-800';
    case 'business': return 'bg-purple-100 text-purple-800';
    case 'policy': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'economy': return 'Экономика';
    case 'market': return 'Рынок';
    case 'business': return 'Бизнес';
    case 'policy': return 'Политика';
    default: return category;
  }
};

const News = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'economy', label: 'Экономика' },
    { value: 'market', label: 'Рынок' },
    { value: 'business', label: 'Бизнес' },
    { value: 'policy', label: 'Политика' }
  ];

  const filteredNews = mockNews
    .filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="ml-56 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Экономические новости
                </h1>
                <p className="text-lg text-gray-600">
                  Актуальная информация о рынке, экономике и бизнесе
                </p>
              </div>
              <Button 
                size="lg" 
                className="text-base font-semibold"
                onClick={() => navigate('/news/publish')}
              >
                <Icon name="PenSquare" size={18} className="mr-2" />
                Опубликовать новость
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Поиск новостей
                </label>
                <Input
                  id="search"
                  placeholder="Поиск по названию, описанию, компании..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Категория
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  Сортировка
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Сортировать по..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="title">По названию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Найдено новостей: <strong>{filteredNews.length}</strong></span>
              {selectedCategory !== 'all' && (
                <Badge className={getCategoryColor(selectedCategory)}>
                  {categories.find(cat => cat.value === selectedCategory)?.label}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <Card key={news.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(news.category)}>
                      {getCategoryLabel(news.category)}
                    </Badge>
                    <span className="text-sm text-gray-500">{news.readTime}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <CardDescription className="text-gray-600 line-clamp-3 mb-4">
                    {news.description}
                  </CardDescription>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Icon name="Building2" size={14} className="mr-1" />
                    <span className="mr-3">{news.company}</span>
                    <Icon name="Calendar" size={14} className="mr-1" />
                    <span>{new Date(news.date).toLocaleDateString('ru-RU')}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Icon name="User" size={14} className="mr-1" />
                    <span>{news.author}</span>
                  </div>
                </CardContent>

                <div className="px-6 pb-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/news/${news.id}`)}
                  >
                    <Icon name="ArrowRight" size={16} className="mr-2" />
                    Читать полностью
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Новости не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или выбрать другую категорию
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;