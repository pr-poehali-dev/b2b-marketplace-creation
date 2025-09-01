import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProfileCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: "ООО «ТехИнновации»",
    description: "Разрабатываем и внедряем инновационные IT-решения для бизнеса",
    phone: "+7 (495) 123-45-67",
    email: "info@techinnovations.ru",
    website: "https://techinnovations.ru",
    address: "г. Москва, ул. Инновационная, д. 42",
    inn: "7722123456",
    ogrn: "1027722123456",
    director: "Иванов Иван Иванович",
    founded: "2015",
    employees: "50-100",
    sphere: "IT и разработка ПО"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Здесь будет сохранение данных
    console.log("Сохранено:", companyData);
  };

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-56 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          {/* Заголовок */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Карточка компании</h1>
                <p className="text-gray-600">Управляйте информацией о вашей компании</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Верифицирована
                </Badge>
                
                {isEditing ? (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Отменить
                    </Button>
                    <Button onClick={handleSave}>
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Основная информация */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Building2" size={20} className="mr-2" />
                    Основная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Название компании *</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={companyData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="sphere">Сфера деятельности</Label>
                      {isEditing ? (
                        <Input
                          id="sphere"
                          value={companyData.sphere}
                          onChange={(e) => handleInputChange('sphere', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.sphere}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        rows={3}
                        value={companyData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{companyData.description}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="founded">Год основания</Label>
                      {isEditing ? (
                        <Input
                          id="founded"
                          value={companyData.founded}
                          onChange={(e) => handleInputChange('founded', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.founded}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="employees">Количество сотрудников</Label>
                      {isEditing ? (
                        <Input
                          id="employees"
                          value={companyData.employees}
                          onChange={(e) => handleInputChange('employees', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.employees}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="director">Руководитель</Label>
                    {isEditing ? (
                      <Input
                        id="director"
                        value={companyData.director}
                        onChange={(e) => handleInputChange('director', e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{companyData.director}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Контактная информация */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Контактная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={companyData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={companyData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Веб-сайт</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    ) : (
                      <a 
                        href={companyData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-1 text-sm text-blue-600 hover:text-blue-800 block"
                      >
                        {companyData.website}
                      </a>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Адрес</Label>
                    {isEditing ? (
                      <Textarea
                        id="address"
                        rows={2}
                        value={companyData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{companyData.address}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Юридическая информация */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="FileText" size={20} className="mr-2" />
                    Юридическая информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inn">ИНН</Label>
                      {isEditing ? (
                        <Input
                          id="inn"
                          value={companyData.inn}
                          onChange={(e) => handleInputChange('inn', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.inn}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="ogrn">ОГРН</Label>
                      {isEditing ? (
                        <Input
                          id="ogrn"
                          value={companyData.ogrn}
                          onChange={(e) => handleInputChange('ogrn', e.target.value)}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{companyData.ogrn}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Боковая панель */}
            <div className="space-y-6">
              {/* Статистика */}
              <Card>
                <CardHeader>
                  <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Просмотры профиля</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Заказы</span>
                    <span className="font-semibold">43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Рейтинг</span>
                    <div className="flex items-center">
                      <Icon name="Star" size={14} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Действия */}
              <Card>
                <CardHeader>
                  <CardTitle>Действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Share" size={16} className="mr-2" />
                    Поделиться профилем
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать визитку
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Предпросмотр
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default ProfileCompany;