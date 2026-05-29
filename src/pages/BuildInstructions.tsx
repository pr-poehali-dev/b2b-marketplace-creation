import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://businessmarket.poehali.dev";

type Tab = "capacitor" | "twa" | "publish";

const CopyBlock = ({ code, label }: { code: string; label?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group">
      {label && <div className="text-xs text-gray-400 mb-1">{label}</div>}
      <div className="bg-gray-900 text-green-400 rounded-lg px-4 py-3 font-mono text-sm overflow-x-auto pr-12">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
      <button
        onClick={copy}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded px-2 py-1 text-xs transition-colors flex items-center gap-1"
      >
        <Icon name={copied ? "Check" : "Copy"} size={12} />
        {copied ? "Скопировано" : "Копировать"}
      </button>
    </div>
  );
};

const Step = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
      {num}
    </div>
    <div className="flex-1 space-y-3">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <div className="text-sm text-gray-600 space-y-2">{children}</div>
    </div>
  </div>
);

const BuildInstructions = () => {
  const [tab, setTab] = useState<Tab>("capacitor");

  const tabs: { id: Tab; label: string; icon: string; badge?: string }[] = [
    { id: "capacitor", label: "Capacitor (APK)", icon: "Package", badge: "Рекомендуется" },
    { id: "twa", label: "TWA (Google Play)", icon: "Store" },
    { id: "publish", label: "Публикация в Play", icon: "Upload" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="ml-56 transition-all duration-300">

        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-14 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/30 rounded-xl flex items-center justify-center">
                <Icon name="BookOpen" size={22} className="text-emerald-400" />
              </div>
              <Badge className="bg-white/20 text-white border-0">Техническая инструкция</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Как собрать APK для Android
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Пошаговое руководство по упаковке сайта в мобильное приложение. Займёт 1–2 часа, нужен компьютер с Windows, Mac или Linux.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Icon name="Clock" size={14} />1–2 часа</span>
              <span className="flex items-center gap-1.5"><Icon name="DollarSign" size={14} />Бесплатно</span>
              <span className="flex items-center gap-1.5"><Icon name="Monitor" size={14} />Нужен компьютер</span>
              <span className="flex items-center gap-1.5"><Icon name="Wifi" size={14} />Нужен интернет</span>
            </div>
          </div>
        </section>

        {/* Вкладки */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6">
          <div className="max-w-4xl mx-auto flex gap-1 py-3">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon name={t.icon as "Package"} size={15} />
                {t.label}
                {t.badge && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.id ? "bg-white/20" : "bg-emerald-100 text-emerald-700"}`}>
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

          {/* ===== CAPACITOR ===== */}
          {tab === "capacitor" && (
            <>
              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="p-5 flex gap-3">
                  <Icon name="Info" size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-emerald-800">
                    <strong>Что такое Capacitor?</strong> — это инструмент от Ionic, который оборачивает твой сайт в нативное Android-приложение. Итог — файл <code className="bg-emerald-200 px-1 rounded">.apk</code>, который можно скачать прямо с сайта или опубликовать в Google Play.
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Download" size={18} className="text-primary" />
                  Шаг 1. Установи необходимые программы
                </h3>
                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <p><strong>Node.js</strong> (если не установлен):</p>
                    <CopyBlock code="https://nodejs.org — скачай LTS версию и установи" label="Ссылка для скачивания" />
                  </div>
                  <div className="space-y-2">
                    <p><strong>Android Studio</strong>:</p>
                    <CopyBlock code="https://developer.android.com/studio — скачай и установи" label="Ссылка для скачивания" />
                    <p className="text-xs text-gray-500">При установке отметь галочку «Android SDK» и «Android Virtual Device»</p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Java JDK 17</strong>:</p>
                    <CopyBlock code="https://adoptium.net — скачай Temurin JDK 17" label="Ссылка для скачивания" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Download" size={18} className="text-primary" />
                  Шаг 2. Скачай код проекта
                </h3>
                <div className="space-y-3 pl-6">
                  <p className="text-sm text-gray-600">Открой <strong>Скачать → Скачать код</strong> на сайте poehali.dev и распакуй архив в удобную папку. Затем открой терминал (командную строку) в этой папке:</p>
                  <CopyBlock code={`# Перейди в папку проекта
cd путь/до/папки/проекта

# Установи зависимости
npm install`} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Package" size={18} className="text-primary" />
                  Шаг 3. Добавь Capacitor в проект
                </h3>
                <div className="space-y-3 pl-6">
                  <CopyBlock code={`# Установи Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Инициализируй Capacitor
npx cap init "Business Market" "dev.businessmarket.app" --web-dir=dist`} />
                  <p className="text-xs text-gray-500">Если спросит — нажми Enter и согласись с настройками по умолчанию</p>
                </div>

                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Settings" size={18} className="text-primary" />
                  Шаг 4. Настрой capacitor.config.ts
                </h3>
                <div className="space-y-3 pl-6">
                  <p className="text-sm text-gray-600">Открой файл <code className="bg-gray-100 px-1 rounded">capacitor.config.ts</code> в папке проекта и замени содержимое на:</p>
                  <CopyBlock code={`import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.businessmarket.app',
  appName: 'Business Market',
  webDir: 'dist',
  server: {
    url: '${SITE_URL}',
    cleartext: true
  }
};

export default config;`} label="capacitor.config.ts" />
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex gap-2">
                    <Icon name="AlertTriangle" size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Параметр <code>server.url</code> указывает приложению загружать контент с твоего живого сайта — это значит всегда актуальная версия без переборки APK при обновлениях.</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Hammer" size={18} className="text-primary" />
                  Шаг 5. Собери проект и добавь Android
                </h3>
                <div className="space-y-3 pl-6">
                  <CopyBlock code={`# Собери фронтенд
npm run build

# Добавь Android платформу
npx cap add android

# Синхронизируй
npx cap sync android`} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Smartphone" size={18} className="text-primary" />
                  Шаг 6. Собери APK в Android Studio
                </h3>
                <div className="space-y-3 pl-6">
                  <CopyBlock code="npx cap open android" label="Открыть в Android Studio" />
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>В Android Studio выполни:</p>
                    <ol className="list-decimal list-inside space-y-1.5 pl-2">
                      <li>Подожди пока проект проиндексируется (внизу прогресс-бар)</li>
                      <li>В меню: <strong>Build → Build Bundle(s) / APK(s) → Build APK(s)</strong></li>
                      <li>Подожди сборку (2–5 минут)</li>
                      <li>Нажми <strong>«locate»</strong> в уведомлении — откроется папка с APK</li>
                    </ol>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600 flex gap-2">
                    <Icon name="FolderOpen" size={14} className="flex-shrink-0 mt-0.5" />
                    <span>APK будет по пути: <code className="bg-gray-200 px-1 rounded">android/app/build/outputs/apk/debug/app-debug.apk</code></span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="Upload" size={18} className="text-primary" />
                  Шаг 7. Загрузи APK на сайт
                </h3>
                <div className="space-y-3 pl-6">
                  <p className="text-sm text-gray-600">Переименуй файл в <code className="bg-gray-100 px-1 rounded">app-release.apk</code> и положи его в папку <code className="bg-gray-100 px-1 rounded">public/</code> своего проекта. Кнопка скачивания на странице <a href="/download" className="text-primary underline">/download</a> сразу начнёт его отдавать.</p>
                </div>
              </div>
            </>
          )}

          {/* ===== TWA ===== */}
          {tab === "twa" && (
            <>
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-5 flex gap-3">
                  <Icon name="Info" size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>TWA (Trusted Web Activity)</strong> — специальный способ опубликовать PWA-сайт в Google Play без написания нативного кода. Приложение открывает твой сайт через Chrome, но выглядит как полноценное приложение (без адресной строки).
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Step num="1" title="Установи Bubblewrap CLI">
                  <CopyBlock code="npm install -g @bubblewrap/cli" />
                  <p>Bubblewrap — официальный инструмент Google для создания TWA.</p>
                </Step>

                <Step num="2" title="Инициализируй проект">
                  <CopyBlock code={`mkdir business-market-twa
cd business-market-twa
bubblewrap init --manifest=${SITE_URL}/manifest.json`} />
                  <p>Инструмент автоматически прочитает manifest.json с твоего сайта и заполнит настройки.</p>
                </Step>

                <Step num="3" title="Заполни параметры при инициализации">
                  <div className="bg-gray-900 text-green-400 rounded-lg px-4 py-3 font-mono text-xs space-y-1">
                    <div><span className="text-gray-500">Application ID:</span> dev.businessmarket.app</div>
                    <div><span className="text-gray-500">App name:</span> Business Market</div>
                    <div><span className="text-gray-500">Start URL:</span> {SITE_URL}/</div>
                    <div><span className="text-gray-500">Display mode:</span> standalone</div>
                    <div><span className="text-gray-500">Status bar color:</span> #1a6b3c</div>
                  </div>
                  <p>Остальные параметры — нажимай Enter (значения по умолчанию).</p>
                </Step>

                <Step num="4" title="Собери APK / AAB">
                  <CopyBlock code="bubblewrap build" />
                  <p>Итог — файлы <code className="bg-gray-100 px-1 rounded">app-release-signed.apk</code> и <code className="bg-gray-100 px-1 rounded">app-release-bundle.aab</code> (для Google Play нужен .aab).</p>
                </Step>

                <Step num="5" title="Добавь Digital Asset Links">
                  <p>Google Play требует подтвердить, что сайт и приложение принадлежат одному владельцу. Положи файл по адресу:</p>
                  <CopyBlock code="public/.well-known/assetlinks.json" label="Путь в проекте" />
                  <p>Содержимое файла Bubblewrap сгенерирует автоматически — оно появится в папке проекта после сборки.</p>
                </Step>
              </div>
            </>
          )}

          {/* ===== ПУБЛИКАЦИЯ ===== */}
          {tab === "publish" && (
            <>
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-5 flex gap-3">
                  <Icon name="AlertTriangle" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    Для публикации в Google Play нужен аккаунт разработчика. Регистрация — <strong>$25 один раз</strong>. Модерация первой версии занимает до 7 дней.
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Step num="1" title="Создай аккаунт разработчика Google">
                  <CopyBlock code="https://play.google.com/console" label="Ссылка" />
                  <p>Войди через Google-аккаунт → «Создать аккаунт разработчика» → заплати $25 → заполни профиль.</p>
                </Step>

                <Step num="2" title="Создай новое приложение">
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>В Google Play Console нажми <strong>«Создать приложение»</strong></li>
                    <li>Название: <strong>Business Market</strong></li>
                    <li>Язык: Русский</li>
                    <li>Тип: Приложение</li>
                    <li>Бесплатное / платное: на твоё усмотрение</li>
                  </ol>
                </Step>

                <Step num="3" title="Заполни страницу в магазине">
                  <div className="space-y-1">
                    <p><strong>Краткое описание</strong> (до 80 символов):</p>
                    <CopyBlock code="B2B платформа для оптовых закупок и торговли между компаниями" />
                    <p className="mt-2"><strong>Полное описание</strong> (до 4000 символов):</p>
                    <CopyBlock code={`Business Market — корпоративная платформа для B2B закупок.

Возможности:
• Каталог товаров от верифицированных поставщиков
• Быстрое оформление заказов
• Калькулятор стоимости доставки
• Аналитика закупок
• Чат с поставщиками
• Управление корзиной и заказами

Для кого:
• Покупатели — ищите поставщиков, сравнивайте цены, оформляйте заказы
• Поставщики — размещайте товары, получайте заявки, управляйте каталогом`} />
                  </div>
                </Step>

                <Step num="4" title="Загрузи скриншоты и иконку">
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Иконка приложения:</strong> 512×512 px, PNG, без прозрачности</p>
                    <p><strong>Графика (Feature graphic):</strong> 1024×500 px</p>
                    <p><strong>Скриншоты телефона:</strong> минимум 2, рекомендуется 4–8 штук</p>
                  </div>
                  <div className="bg-gray-50 border rounded-lg p-3 text-xs text-gray-500 flex gap-2">
                    <Icon name="Lightbulb" size={14} className="flex-shrink-0 mt-0.5 text-yellow-500" />
                    Скриншоты можно сделать через Chrome DevTools (F12 → значок телефона) или на реальном устройстве.
                  </div>
                </Step>

                <Step num="5" title="Загрузи AAB файл">
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Перейди в <strong>Выпуски → Внутреннее тестирование → Создать выпуск</strong></li>
                    <li>Загрузи файл <code className="bg-gray-100 px-1 rounded">app-release-bundle.aab</code></li>
                    <li>Укажи версию: 1.0.0 (код версии: 1)</li>
                    <li>Нажми «Сохранить» и «Отправить на проверку»</li>
                  </ol>
                </Step>

                <Step num="6" title="Дождись модерации">
                  <p>Первая проверка: <strong>до 7 рабочих дней</strong>. Последующие обновления — 1–3 часа.</p>
                  <p>Google пришлёт письмо на почту когда приложение будет опубликовано.</p>
                </Step>
              </div>
            </>
          )}

          {/* Нужна помощь */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="MessageCircle" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Нужна помощь?</h4>
                <p className="text-sm text-gray-600 mb-3">Если что-то пошло не так — напиши нам, поможем разобраться.</p>
                <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white gap-2" asChild>
                  <a href="mailto:bmbusinessmarket@yandex.ru">
                    <Icon name="Mail" size={14} />
                    bmbusinessmarket@yandex.ru
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BuildInstructions;
