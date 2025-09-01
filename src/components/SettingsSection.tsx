import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const SettingsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Icon name="Settings" size={14} className="mr-1" />
            Персональные настройки
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Настройки платформы
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Настройте работу платформы под ваши потребности и предпочтения
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Раздел настроек работает!</h3>
          <p className="text-gray-600">
            Этот раздел настроек успешно загружается. Теперь можно добавить функциональность.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SettingsSection;