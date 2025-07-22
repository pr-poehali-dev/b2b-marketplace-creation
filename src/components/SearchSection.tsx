import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const SearchSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
            Найдите то, что нужно вашему бизнесу
          </h2>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Поиск товаров, категорий, поставщиков..." 
                  className="text-base h-12"
                />
              </div>
              <Button size="lg" className="px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Поиск
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-gray-600">Популярные запросы:</span>
              {["Металлопрокат", "Стройматериалы", "Продукты питания", "Упаковка"].map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;