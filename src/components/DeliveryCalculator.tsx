import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

// Расстояния между городами (км)
const DISTANCES: Record<string, Record<string, number>> = {
  // Крупные города РФ
  "Москва":            { "Санкт-Петербург": 710, "Екатеринбург": 1780, "Новосибирск": 3360, "Казань": 820, "Краснодар": 1360, "Нижний Новгород": 400, "Самара": 1050, "Ростов-на-Дону": 1230, "Уфа": 1340, "Челябинск": 1920, "Пермь": 1390, "Воронеж": 520, "Волгоград": 1000, "Саратов": 860, "Тюмень": 2140, "Омск": 2760, "Красноярск": 4100, "Иркутск": 5200, "Хабаровск": 8150, "Владивосток": 9150, "Махачкала": 1970, "Грозный": 1830, "Нальчик": 1660, "Владикавказ": 1770, "Ставрополь": 1480, "Черкесск": 1640, "Майкоп": 1490, "Магас": 1850, "Элиста": 1320, "Пятигорск": 1570, "Минеральные Воды": 1560, "Кисловодск": 1600, "Буйнакск": 1990, "Дербент": 2050, "Хасавюрт": 1960, "Назрань": 1860 },
  "Санкт-Петербург":   { "Москва": 710, "Екатеринбург": 2440, "Новосибирск": 4000, "Казань": 1530, "Краснодар": 2070, "Нижний Новгород": 1100, "Самара": 1760, "Ростов-на-Дону": 1940, "Уфа": 2010, "Челябинск": 2630, "Воронеж": 1230, "Волгоград": 1710, "Махачкала": 2680, "Грозный": 2540, "Нальчик": 2370, "Владикавказ": 2480, "Ставрополь": 2190, "Черкесск": 2350, "Майкоп": 2200, "Магас": 2560, "Пятигорск": 2280, "Минеральные Воды": 2270, "Кисловодск": 2310 },
  "Екатеринбург":      { "Москва": 1780, "Санкт-Петербург": 2440, "Новосибирск": 1590, "Казань": 970, "Краснодар": 2600, "Нижний Новгород": 1400, "Самара": 1200, "Ростов-на-Дону": 2500, "Уфа": 530, "Челябинск": 210, "Пермь": 340, "Тюмень": 330, "Омск": 1040, "Новосибирск": 1590, "Махачкала": 3100, "Грозный": 2960, "Нальчик": 2780, "Ставрополь": 2730 },
  "Новосибирск":       { "Москва": 3360, "Санкт-Петербург": 4000, "Екатеринбург": 1590, "Казань": 2540, "Краснодар": 4300, "Нижний Новгород": 2980, "Самара": 2780, "Ростов-на-Дону": 4200, "Уфа": 2100, "Челябинск": 1810, "Омск": 650, "Красноярск": 780, "Иркутск": 1870 },
  "Казань":            { "Москва": 820, "Санкт-Петербург": 1530, "Екатеринбург": 970, "Новосибирск": 2540, "Краснодар": 1980, "Нижний Новгород": 410, "Самара": 360, "Ростов-на-Дону": 1600, "Уфа": 520, "Челябинск": 1100 },
  "Краснодар":         { "Москва": 1360, "Санкт-Петербург": 2070, "Екатеринбург": 2600, "Новосибирск": 4300, "Казань": 1980, "Нижний Новгород": 1690, "Самара": 1600, "Ростов-на-Дону": 280, "Уфа": 2300, "Челябинск": 2700, "Майкоп": 145, "Черкесск": 400, "Ставрополь": 360, "Нальчик": 430, "Владикавказ": 540, "Грозный": 660, "Махачкала": 780, "Магас": 670, "Пятигорск": 310, "Минеральные Воды": 300, "Кисловодск": 350, "Элиста": 590, "Назрань": 690, "Хасавюрт": 760, "Буйнакск": 810, "Дербент": 870 },
  "Нижний Новгород":   { "Москва": 400, "Санкт-Петербург": 1100, "Екатеринбург": 1400, "Новосибирск": 2980, "Казань": 410, "Краснодар": 1690, "Самара": 650, "Ростов-на-Дону": 1500, "Уфа": 940, "Челябинск": 1600 },
  "Самара":            { "Москва": 1050, "Санкт-Петербург": 1760, "Екатеринбург": 1200, "Новосибирск": 2780, "Казань": 360, "Краснодар": 1600, "Нижний Новгород": 650, "Ростов-на-Дону": 1200, "Уфа": 460, "Челябинск": 1000 },
  "Ростов-на-Дону":    { "Москва": 1230, "Санкт-Петербург": 1940, "Екатеринбург": 2500, "Новосибирск": 4200, "Казань": 1600, "Краснодар": 280, "Нижний Новгород": 1500, "Самара": 1200, "Уфа": 2100, "Челябинск": 2500, "Ставрополь": 380, "Нальчик": 450, "Владикавказ": 550, "Грозный": 680, "Махачкала": 810, "Майкоп": 380, "Элиста": 440, "Пятигорск": 420, "Минеральные Воды": 410, "Кисловодск": 460, "Магас": 700, "Назрань": 710, "Черкесск": 430, "Хасавюрт": 790, "Буйнакск": 840, "Дербент": 900 },
  "Уфа":               { "Москва": 1340, "Санкт-Петербург": 2010, "Екатеринбург": 530, "Новосибирск": 2100, "Казань": 520, "Краснодар": 2300, "Нижний Новгород": 940, "Самара": 460, "Ростов-на-Дону": 2100, "Челябинск": 420 },
  "Челябинск":         { "Москва": 1920, "Санкт-Петербург": 2630, "Екатеринбург": 210, "Новосибирск": 1810, "Казань": 1100, "Краснодар": 2700, "Нижний Новгород": 1600, "Самара": 1000, "Ростов-на-Дону": 2500, "Уфа": 420 },
  "Воронеж":           { "Москва": 520, "Санкт-Петербург": 1230, "Ростов-на-Дону": 600, "Краснодар": 870, "Казань": 1100, "Самара": 900, "Ставрополь": 960, "Нальчик": 1050, "Владикавказ": 1100, "Грозный": 1240, "Махачкала": 1380 },
  "Волгоград":         { "Москва": 1000, "Санкт-Петербург": 1710, "Ростов-на-Дону": 480, "Краснодар": 750, "Казань": 1050, "Ставрополь": 650, "Нальчик": 700, "Владикавказ": 800, "Грозный": 920, "Махачкала": 1050, "Элиста": 300 },
  // СКФО — Ставропольский край
  "Ставрополь":        { "Москва": 1480, "Краснодар": 360, "Ростов-на-Дону": 380, "Нальчик": 220, "Владикавказ": 270, "Грозный": 380, "Махачкала": 480, "Майкоп": 330, "Черкесск": 150, "Пятигорск": 70, "Минеральные Воды": 65, "Кисловодск": 100, "Элиста": 280, "Магас": 400, "Назрань": 410, "Хасавюрт": 450, "Буйнакск": 510, "Дербент": 570, "Волгоград": 650 },
  "Минеральные Воды":  { "Москва": 1560, "Краснодар": 300, "Ростов-на-Дону": 410, "Ставрополь": 65, "Нальчик": 115, "Владикавказ": 185, "Черкесск": 90, "Пятигорск": 30, "Кисловодск": 50, "Грозный": 280, "Махачкала": 400, "Майкоп": 270, "Элиста": 330, "Магас": 300, "Назрань": 310 },
  "Пятигорск":         { "Москва": 1570, "Краснодар": 310, "Ростов-на-Дону": 420, "Ставрополь": 70, "Нальчик": 90, "Владикавказ": 150, "Черкесск": 100, "Кисловодск": 35, "Минеральные Воды": 30, "Грозный": 270, "Махачкала": 390, "Майкоп": 280, "Магас": 280, "Назрань": 290 },
  "Кисловодск":        { "Москва": 1600, "Краснодар": 350, "Ростов-на-Дону": 460, "Ставрополь": 100, "Нальчик": 65, "Владикавказ": 130, "Черкесск": 130, "Пятигорск": 35, "Минеральные Воды": 50, "Грозный": 290, "Махачкала": 410 },
  // СКФО — КЧР
  "Черкесск":          { "Москва": 1640, "Краснодар": 400, "Ростов-на-Дону": 430, "Ставрополь": 150, "Нальчик": 200, "Владикавказ": 290, "Пятигорск": 100, "Минеральные Воды": 90, "Кисловодск": 130, "Майкоп": 260, "Грозный": 420, "Махачкала": 540 },
  // СКФО — КБР
  "Нальчик":           { "Москва": 1660, "Краснодар": 430, "Ростов-на-Дону": 450, "Ставрополь": 220, "Черкесск": 200, "Пятигорск": 90, "Минеральные Воды": 115, "Кисловодск": 65, "Владикавказ": 100, "Грозный": 200, "Махачкала": 320, "Майкоп": 350, "Элиста": 500, "Магас": 220, "Назрань": 230 },
  // СКФО — Северная Осетия
  "Владикавказ":       { "Москва": 1770, "Краснодар": 540, "Ростов-на-Дону": 550, "Ставрополь": 270, "Нальчик": 100, "Черкесск": 290, "Пятигорск": 150, "Минеральные Воды": 185, "Кисловодск": 130, "Грозный": 120, "Назрань": 45, "Магас": 50, "Махачкала": 240, "Элиста": 620 },
  // СКФО — Ингушетия
  "Магас":             { "Москва": 1850, "Краснодар": 670, "Ростов-на-Дону": 700, "Ставрополь": 400, "Нальчик": 220, "Владикавказ": 50, "Назрань": 10, "Грозный": 90, "Махачкала": 220, "Пятигорск": 280, "Минеральные Воды": 300 },
  "Назрань":           { "Москва": 1860, "Краснодар": 690, "Ростов-на-Дону": 710, "Ставрополь": 410, "Нальчик": 230, "Владикавказ": 45, "Магас": 10, "Грозный": 90, "Махачкала": 220, "Пятигорск": 290 },
  // СКФО — Чечня
  "Грозный":           { "Москва": 1830, "Краснодар": 660, "Ростов-на-Дону": 680, "Ставрополь": 380, "Нальчик": 200, "Владикавказ": 120, "Назрань": 90, "Магас": 90, "Махачкала": 130, "Пятигорск": 270, "Минеральные Воды": 280, "Хасавюрт": 100, "Буйнакск": 150, "Дербент": 210, "Элиста": 750 },
  // СКФО — Дагестан
  "Махачкала":         { "Москва": 1970, "Краснодар": 780, "Ростов-на-Дону": 810, "Ставрополь": 480, "Нальчик": 320, "Владикавказ": 240, "Грозный": 130, "Назрань": 220, "Магас": 220, "Пятигорск": 390, "Минеральные Воды": 400, "Хасавюрт": 80, "Буйнакск": 60, "Дербент": 120, "Элиста": 880, "Санкт-Петербург": 2680, "Екатеринбург": 3100 },
  "Хасавюрт":         { "Москва": 1960, "Краснодар": 760, "Ростов-на-Дону": 790, "Ставрополь": 450, "Нальчик": 290, "Владикавказ": 200, "Грозный": 100, "Махачкала": 80, "Буйнакск": 70, "Дербент": 180 },
  "Буйнакск":         { "Москва": 1990, "Краснодар": 810, "Ростов-на-Дону": 840, "Ставрополь": 510, "Нальчик": 360, "Владикавказ": 280, "Грозный": 150, "Махачкала": 60, "Хасавюрт": 70, "Дербент": 130 },
  "Дербент":          { "Москва": 2050, "Краснодар": 870, "Ростов-на-Дону": 900, "Ставрополь": 570, "Нальчик": 400, "Владикавказ": 340, "Грозный": 210, "Махачкала": 120, "Хасавюрт": 180, "Буйнакск": 130 },
  // СКФО — Адыгея
  "Майкоп":            { "Москва": 1490, "Краснодар": 145, "Ростов-на-Дону": 380, "Ставрополь": 330, "Черкесск": 260, "Нальчик": 350, "Владикавказ": 450, "Пятигорск": 280, "Минеральные Воды": 270, "Элиста": 560 },
  // ЮФО — Калмыкия
  "Элиста":            { "Москва": 1320, "Краснодар": 590, "Ростов-на-Дону": 440, "Ставрополь": 280, "Волгоград": 300, "Нальчик": 500, "Астрахань": 350, "Майкоп": 560 },
  // Другие значимые города ЮФО
  "Саратов":           { "Москва": 860, "Самара": 430, "Казань": 680, "Волгоград": 380, "Ростов-на-Дону": 850 },
  "Астрахань":         { "Москва": 1430, "Волгоград": 460, "Ростов-на-Дону": 850, "Махачкала": 460, "Элиста": 350 },
  "Пермь":             { "Москва": 1390, "Екатеринбург": 340, "Казань": 610, "Уфа": 430, "Челябинск": 530 },
  "Тюмень":            { "Москва": 2140, "Екатеринбург": 330, "Омск": 620, "Челябинск": 680, "Уфа": 1020 },
  "Омск":              { "Москва": 2760, "Новосибирск": 650, "Екатеринбург": 1040, "Тюмень": 620, "Челябинск": 1190 },
  "Красноярск":        { "Москва": 4100, "Новосибирск": 780, "Иркутск": 1070, "Омск": 1400, "Екатеринбург": 2630 },
  "Иркутск":           { "Москва": 5200, "Красноярск": 1070, "Новосибирск": 1870, "Хабаровск": 3340 },
  "Хабаровск":         { "Москва": 8150, "Владивосток": 780, "Иркутск": 3340 },
  "Владивосток":       { "Москва": 9150, "Хабаровск": 780, "Иркутск": 4100 },
};

// Симметричное получение расстояния
function getDistance(a: string, b: string): number | null {
  return DISTANCES[a]?.[b] ?? DISTANCES[b]?.[a] ?? null;
}

const CARGO_TYPES = [
  { value: "general",      label: "Генеральный груз",      coeff: 1.0 },
  { value: "metal",        label: "Металлопрокат",          coeff: 1.15 },
  { value: "construction", label: "Стройматериалы",         coeff: 1.1 },
  { value: "fragile",      label: "Хрупкий груз",           coeff: 1.4 },
  { value: "dangerous",    label: "Опасный груз",           coeff: 1.6 },
  { value: "oversized",    label: "Негабаритный груз",      coeff: 1.5 },
  { value: "chemical",     label: "Химия / удобрения",      coeff: 1.35 },
  { value: "food",         label: "Продукты питания",       coeff: 1.25 },
];

const DELIVERY_TYPES = [
  { value: "ftl",     label: "FTL (полная машина)", baseCost: 45, days: (km: number) => `${Math.ceil(km / 600)}-${Math.ceil(km / 500)} дн.` },
  { value: "ltl",     label: "LTL (сборный груз)",  baseCost: 18, days: (km: number) => `${Math.ceil(km / 400) + 1}-${Math.ceil(km / 300) + 2} дн.` },
  { value: "express", label: "Экспресс",             baseCost: 65, days: (km: number) => `${Math.ceil(km / 800)}-${Math.ceil(km / 700)} дн.` },
  { value: "railway", label: "ЖД-доставка",          baseCost: 12, days: (km: number) => `${Math.ceil(km / 700) + 1}-${Math.ceil(km / 600) + 2} дн.` },
];

const CITIES_LIST = Object.keys(DISTANCES).sort((a, b) => a.localeCompare(b, "ru"));

interface Result {
  cost: number;
  minCost: number;
  maxCost: number;
  days: string;
  distance: number;
  insurance: number;
}

const DEFAULT_CARGO = "general";
const DEFAULT_DELIVERY = "ltl";

const DeliveryCalculator = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [cargoType, setCargoType] = useState(DEFAULT_CARGO);
  const [deliveryType, setDeliveryType] = useState(DEFAULT_DELIVERY);
  const [cargoValue, setCargoValue] = useState("");
  const [withInsurance, setWithInsurance] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const reset = () => {
    setFrom("");
    setTo("");
    setWeight("");
    setVolume("");
    setCargoType(DEFAULT_CARGO);
    setDeliveryType(DEFAULT_DELIVERY);
    setCargoValue("");
    setWithInsurance(false);
    setResult(null);
    setError("");
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (!from || !to || !weight) {
      setError("Заполните все обязательные поля");
      return;
    }
    if (from === to) {
      setError("Город отправления и назначения совпадают");
      return;
    }

    const distance = getDistance(from, to);
    if (!distance) {
      setError("Маршрут между выбранными городами не поддерживается");
      return;
    }

    const kg = parseFloat(weight);
    const vol = parseFloat(volume) || kg / 300;
    const chargeableWeight = Math.max(kg, vol * 300);

    const dt = DELIVERY_TYPES.find(d => d.value === deliveryType)!;
    const ct = CARGO_TYPES.find(c => c.value === cargoType)!;

    const baseCost = dt.baseCost * chargeableWeight * (distance / 1000);
    const withCargoCoeff = baseCost * ct.coeff;

    const minCost = Math.round(withCargoCoeff * 0.9);
    const maxCost = Math.round(withCargoCoeff * 1.1);

    const insurance = withInsurance && cargoValue
      ? Math.round(parseFloat(cargoValue) * 0.003)
      : 0;

    setResult({ cost: Math.round(withCargoCoeff), minCost, maxCost, days: dt.days(distance), distance, insurance });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Calculator" size={20} />
              Калькулятор доставки
            </CardTitle>
            <CardDescription className="mt-1">
              Расчёт стоимости грузоперевозки для B2B
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <Icon name="RotateCcw" size={14} />
            Сбросить
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label>Откуда *</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger><SelectValue placeholder="Город" /></SelectTrigger>
              <SelectContent className="max-h-60">
                {CITIES_LIST.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Куда *</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger><SelectValue placeholder="Город" /></SelectTrigger>
              <SelectContent className="max-h-60">
                {CITIES_LIST.filter(c => c !== from).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="weight">Вес, кг *</Label>
            <Input id="weight" type="number" min="1" placeholder="напр. 5000" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="volume">Объём, м³</Label>
            <Input id="volume" type="number" min="0.1" step="0.1" placeholder="необязательно" value={volume} onChange={e => setVolume(e.target.value)} />
          </div>
        </div>

        <div className="space-y-1">
          <Label>Тип груза *</Label>
          <Select value={cargoType} onValueChange={setCargoType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CARGO_TYPES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Тип доставки *</Label>
          <Select value={deliveryType} onValueChange={setDeliveryType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {DELIVERY_TYPES.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Checkbox id="insurance" checked={withInsurance} onCheckedChange={v => setWithInsurance(!!v)} />
          <Label htmlFor="insurance" className="cursor-pointer">Страхование груза (0,3% от ценности)</Label>
        </div>

        {withInsurance && (
          <div className="space-y-1">
            <Label htmlFor="cargoValue">Ценность груза, ₽</Label>
            <Input id="cargoValue" type="number" min="0" placeholder="Объявленная ценность" value={cargoValue} onChange={e => setCargoValue(e.target.value)} />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <Icon name="AlertCircle" size={14} /> {error}
          </p>
        )}

        <Button onClick={calculate} className="w-full">
          <Icon name="Calculator" size={16} className="mr-2" />
          Рассчитать стоимость
        </Button>

        {result && (
          <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600">Расстояние</span>
              <span className="font-medium">{result.distance.toLocaleString()} км</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600">Срок доставки</span>
              <span className="font-medium">{result.days}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600">Стоимость перевозки</span>
              <span className="font-medium">{result.minCost.toLocaleString()} – {result.maxCost.toLocaleString()} ₽</span>
            </div>
            {result.insurance > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-600">Страховка</span>
                <span className="font-medium">{result.insurance.toLocaleString()} ₽</span>
              </div>
            )}
            <div className="border-t border-blue-300 pt-2 flex items-center justify-between">
              <span className="font-semibold text-blue-800">Итого (ориентировочно)</span>
              <span className="text-xl font-bold text-blue-900">
                {(result.minCost + result.insurance).toLocaleString()} – {(result.maxCost + result.insurance).toLocaleString()} ₽
              </span>
            </div>
            <p className="text-xs text-blue-500">* Точная стоимость уточняется у перевозчика. НДС не включён.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryCalculator;
