import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const LogoShowcase = () => {
  const navigate = useNavigate();

  const logos = [
    {
      id: 1,
      title: "Вариант 1: Минималистичный",
      description: "Чистый геометрический дизайн с бизнес-символами",
      src: "/img/3c6225a0-ffae-46df-84b3-37b833e80bee.jpg"
    },
    {
      id: 2,
      title: "Вариант 2: Корпоративный", 
      description: "Элегантный стиль с эмблемой и профессиональным видом",
      src: "/img/81fc0ed8-6b11-402d-9048-0116ba26a8e4.jpg"
    },
    {
      id: 3,
      title: "Вариант 3: Технологичный",
      description: "Современный дизайн с градиентами и tech-эстетикой",
      src: "/img/4455f9ea-1266-4bb2-b0ca-3f7ddfc86aee.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Логотипы Business Market
            </h1>
            <p className="text-muted-foreground mt-2">
              Три варианта дизайна в зеленой цветовой гамме
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {logos.map((logo) => (
            <div key={logo.id} className="bg-card rounded-lg p-6 shadow-lg border">
              <div className="bg-white rounded-lg p-8 mb-4 flex items-center justify-center min-h-[300px]">
                <img
                  src={logo.src}
                  alt={logo.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {logo.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {logo.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-accent rounded-lg p-6">
          <h2 className="text-xl font-semibold text-accent-foreground mb-4">
            Особенности дизайна
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-accent-foreground">
            <div>
              <h3 className="font-medium mb-2">Цветовая схема:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Зеленая гамма в стиле Сбербанка</li>
                <li>Основной цвет: #22c55e</li>
                <li>Профессиональные оттенки</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Применение:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Масштабируются без потери качества</li>
                <li>Подходят для веба и печати</li>
                <li>Универсальны для разных носителей</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;