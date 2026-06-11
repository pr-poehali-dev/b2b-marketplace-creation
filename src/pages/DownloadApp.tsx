import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from '@/components/layout/PageLayout';
import { useNavigate } from "react-router-dom";

const APK_URL = "/app-release.apk";

const steps = [
  {
    num: "1",
    title: "Скачайте APK",
    desc: "Нажмите кнопку ниже — файл загрузится на ваш телефон.",
    icon: "Download",
  },
  {
    num: "2",
    title: "Разрешите установку",
    desc: 'Откройте файл. Android спросит разрешение — нажмите «Настройки» → включите «Установка из неизвестных источников» для браузера.',
    icon: "ShieldCheck",
  },
  {
    num: "3",
    title: "Установите приложение",
    desc: 'Вернитесь к файлу и нажмите «Установить». Через несколько секунд приложение появится на рабочем столе.',
    icon: "Smartphone",
  },
  {
    num: "4",
    title: "Войдите в аккаунт",
    desc: "Откройте приложение, войдите в свой аккаунт — все данные и заказы уже там.",
    icon: "LogIn",
  },
];

const features = [
  { icon: "Package", label: "Каталог товаров", desc: "Все товары и поставщики под рукой" },
  { icon: "ShoppingCart", label: "Быстрые заказы", desc: "Оформляйте заказы в пару касаний" },
  { icon: "Bell", label: "Уведомления", desc: "Следите за статусом заявок" },
  { icon: "Calculator", label: "Калькулятор доставки", desc: "Рассчитайте стоимость прямо в приложении" },
  { icon: "MessageSquare", label: "Чат с поставщиком", desc: "Общайтесь без лишних звонков" },
  { icon: "BarChart2", label: "Аналитика", desc: "Ваши закупки в цифрах" },
];

const DownloadApp = () => {
  const [downloaded, setDownloaded] = useState(false);
  const navigate = useNavigate();

  const handleDownload = () => {
    setDownloaded(true);
    const link = document.createElement("a");
    link.href = APK_URL;
    link.download = "BusinessMarket.apk";
    link.click();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageLayout>

        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/80 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <Badge className="bg-white/20 text-white border-0 text-sm px-3 py-1">
                <Icon name="Smartphone" size={14} className="mr-1 inline" />
                Android приложение
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Business Market<br />
                <span className="text-emerald-400">в вашем кармане</span>
              </h1>
              <p className="text-lg text-gray-300">
                Управляйте закупками, смотрите каталог и общайтесь с поставщиками прямо со смартфона. Без браузера, без лишних шагов.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={handleDownload}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base px-8 gap-2"
                >
                  <Icon name="Download" size={20} />
                  Скачать APK
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/build-instructions')}
                  className="border-white/30 text-white hover:bg-white/10 gap-2"
                >
                  <Icon name="BookOpen" size={18} />
                  Инструкция по сборке
                </Button>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon name="Info" size={14} />
                  Только для Android
                </div>
              </div>
              {downloaded && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium animate-fade-in">
                  <Icon name="CheckCircle" size={16} />
                  Файл загружается — следуйте инструкции ниже
                </div>
              )}
              <div className="flex gap-6 text-sm text-gray-400 pt-2">
                <span className="flex items-center gap-1"><Icon name="Shield" size={14} /> Безопасно</span>
                <span className="flex items-center gap-1"><Icon name="Zap" size={14} /> Бесплатно</span>
                <span className="flex items-center gap-1"><Icon name="RefreshCw" size={14} /> Обновляется</span>
              </div>
            </div>

            {/* Мок телефона */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="w-40 h-72 sm:w-48 sm:h-80 bg-gray-700 rounded-3xl border-4 border-gray-600 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="bg-gray-800 h-6 flex items-center justify-center">
                  <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
                </div>
                <div className="flex-1 bg-gradient-to-b from-primary/30 to-emerald-900/50 flex flex-col items-center justify-center gap-3 p-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="Building" size={32} className="text-white" />
                  </div>
                  <div className="text-white text-xs font-bold text-center">Business Market</div>
                  <div className="w-full space-y-2 mt-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="bg-white/10 rounded-lg h-8 w-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Возможности */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Что умеет приложение</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((f) => (
                <Card key={f.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon as "Package"} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{f.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Инструкция установки */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Как установить</h2>
            <p className="text-gray-500 text-center mb-10">4 простых шага — займёт меньше минуты</p>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon name={step.icon as "Download"} size={22} className="text-white" />
                  </div>
                  <div className="pt-1">
                    <div className="font-semibold text-gray-900">
                      <span className="text-primary mr-1">Шаг {step.num}.</span>
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
              <Icon name="AlertTriangle" size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <div className="font-semibold mb-1">Предупреждение Android</div>
                При установке Android может показать «Неизвестный источник» — это стандартная защита для файлов вне Google Play. Наш APK безопасен. Разрешите установку один раз и потом можно снова включить защиту.
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-primary text-white text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Готовы скачать?</h2>
            <p className="text-white/80">Бесплатно. Без регистрации в магазине. Просто скачайте и установите.</p>
            <Button
              size="lg"
              onClick={handleDownload}
              className="bg-white text-primary hover:bg-gray-100 font-bold text-base px-10 gap-2"
            >
              <Icon name="Download" size={20} />
              Скачать APK для Android
            </Button>
          </div>
        </section>

        <Footer />
      </PageLayout>
    </div>
  );
};

export default DownloadApp;