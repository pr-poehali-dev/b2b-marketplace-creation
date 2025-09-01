import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface SupplierAnalyticsProps {
  suppliers: any[];
  regions: string[];
}

const SupplierAnalytics = ({ suppliers, regions }: SupplierAnalyticsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Распределение по регионам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regions.map(region => {
              const regionSuppliers = suppliers.filter(s => s.region === region);
              const percentage = (regionSuppliers.length / suppliers.length * 100).toFixed(1);
              
              return (
                <div key={region} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{region}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 min-w-[40px]">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Рейтинговая статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map(rating => {
              const ratingSuppliers = suppliers.filter(s => Math.floor(s.rating) === rating);
              const percentage = (ratingSuppliers.length / suppliers.length * 100).toFixed(1);
              
              return (
                <div key={rating} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{rating}</span>
                    <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 min-w-[40px]">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierAnalytics;