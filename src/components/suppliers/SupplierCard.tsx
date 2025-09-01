import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface SupplierCardProps {
  supplier: any;
  onViewDetails: (supplier: any) => void;
}

const SupplierCard = ({ supplier, onViewDetails }: SupplierCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <img 
            src={supplier.logo} 
            alt={supplier.name}
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
                  {supplier.verified && (
                    <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Верифицирован
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {supplier.region}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Tag" size={14} className="mr-1" />
                    {supplier.category}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {supplier.experience} лет опыта
                  </span>
                  <span className="flex items-center">
                    <Icon name="Users" size={14} className="mr-1" />
                    {supplier.employeesCount} сотрудников
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 mb-2">
                  <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                  <span className="font-semibold">{supplier.rating}</span>
                  <span className="text-sm text-gray-500">({supplier.reviewsCount})</span>
                </div>
                <p className="text-sm text-gray-600">{supplier.products} товаров</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{supplier.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Специализация:</h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.specializations.slice(0, 3).map((spec: string) => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Минимальный заказ:</h4>
                <p className="text-sm text-gray-600">
                  {supplier.minOrder.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Сертификаты:</h4>
                <div className="flex flex-wrap gap-1">
                  {supplier.certifications.slice(0, 2).map((cert: string) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Icon name="Phone" size={14} className="mr-1" />
                  {supplier.phone}
                </span>
                <span className="flex items-center">
                  <Icon name="Mail" size={14} className="mr-1" />
                  {supplier.email}
                </span>
                <span className="flex items-center">
                  <Icon name="Warehouse" size={14} className="mr-1" />
                  {supplier.warehouse}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
                <Button 
                  size="sm"
                  onClick={() => onViewDetails(supplier)}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierCard;