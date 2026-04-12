import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

const CITIES: Record<string, Record<string, number>> = {
  "Москва": { "Санкт-Петербург": 710, "Екатеринбург": 1780, "Новосибирск": 3360, "Казань": 820, "Краснодар": 1360, "Нижний Новгород": 400, "Самара": 1050, "Ростов-на-Дону": 1230, "Уфа": 1340, "Челябинск": 1920 },
  "Санкт-Петербург": { "Москва": 710, "Екатеринбург": 2440, "Новосибирск": 4000, "Казань": 1530, "Краснодар": 2070, "Нижний Новгород": 1100, "Самара": 1760, "Ростов-на-Дону": 1940, "Уфа": 2010, "Челябинск": 2630 },
  "Екатеринбург": { "Москва": 1780, "Санкт-Петербург": 2440, "Новосибирск": 1590, "Казань": 970, "Краснодар": 2600, "Нижний Новгород": 1400, "Самара": 1200, "Ростов-на-Дону": 2500, "Уфа": 530, "Челябинск": 210 },
  "Новосибирск": { "Москва": 3360, "Санкт-Петербург": 4000, "Екатеринбург": 1590, "Казань": 2540, "Краснодар": 4300, "Нижний Новгород": 2980, "Самара": 2780, "Ростов-на-Дону": 4200, "Уфа": 2100, "Челябинск": 1810 },
  "Казань": { "Москва": 820, "Санкт-Петербург": 1530, "Екатеринбург": 970, "Новосибирск": 2540, "Краснодар": 1980, "Нижний Новгород": 410, "Самара": 360, "Ростов-на-Дону": 1600, "Уфа": 520, "Челябинск": 1100 },
  "Краснодар": { "Москва": 1360, "Санкт-Петербург": 2070, "Екатеринбург": 2600, "Новосибирск": 4300, "Казань": 1980, "Нижний Новгород": 1690, "Самара": 1600, "Ростов-на-Дону": 280, "Уфа": 2300, "Челябинск": 2700 },
  "Нижний Новгород": { "Москва": 400, "Санкт-Петербург": 1100, "Екатеринбург": 1400, "Новосибирск": 2980, "Казань": 410, "Краснодар": 1690, "Самара": 650, "Ростов-на-Дону": 1500, "Уфа": 940, "Челябинск": 1600 },
  "Самара": { "Москва": 1050, "Санкт-Петербург": 1760, "Екатеринбург": 1200, "Новосибирск": 2780, "Казань": 360, "Краснодар": 1600, "Нижний Новгород": 650, "Ростов-на-Дону": 1200, "Уфа": 460, "Челябинск": 1000 },
  "Ростов-на-Дону": { "Москва": 1230, "Санкт-Петербург": 1940, "Екатеринбург": 2500, "Новосибирск": 4200, "Казань": 1600, "Краснодар": 280, "Нижний Новгород": 1500, "Самара": 1200, "Уфа": 2100, "Челябинск": 2500 },
  "Уфа": { "Москва": 1340, "Санкт-Петербург": 2010, "Екатеринбург": 530, "Новосибирск": 2100, "Казань": 520, "Краснодар": 2300, "Нижний Новгород": 940, "Самара": 460, "Ростов-на-Дону": 2100, "Челябинск": 420 },
  "Челябинск": { "Москва": 1920, "Санкт-Петербург": 2630, "Екатеринбург": 210, "Новосибирск": 1810, "Казань": 1100, "Краснодар": 2700, "Нижний Новгород": 1600, "Самара": 1000, "Ростов-на-Дону": 2500, "Уфа": 420 },
};

const CARGO_TYPES = [
  { value: "general", label: "Генеральный груз", coeff: 1.0 },
  { value: "metal", label: "Металлопрокат", coeff: 1.15 },
  { value: "construction", label: "Стройматериалы", coeff: 1.1 },
  { value: "fragile", label: "Хрупкий груз", coeff: 1.4 },
  { value: "dangerous", label: "Опасный груз", coeff: 1.6 },
  { value: "oversized", label: "Негабаритный груз", coeff: 1.5 },
  { value: "chemical", label: "Химия / удобрения", coeff: 1.35 },
  { value: "food", label: "Продукты питания", coeff: 1.25 },
];

const DELIVERY_TYPES = [
  { value: "ftl", label: "FTL (полная машина)", baseCost: 45, days: (km: number) => `${Math.ceil(km / 600)}-${Math.ceil(km / 500)} дн.` },
  { value: "ltl", label: "LTL (сборный груз)", baseCost: 18, days: (km: number) => `${Math.ceil(km / 400) + 1}-${Math.ceil(km / 300) + 2} дн.` },
  { value: "express", label: "Экспресс", baseCost: 65, days: (km: number) => `${Math.ceil(km / 800)}-${Math.ceil(km / 700)} дн.` },
  { value: "railway", label: "ЖД-доставка", baseCost: 12, days: (km: number) => `${Math.ceil(km / 700) + 1}-${Math.ceil(km / 600) + 2} дн.` },
];

const CITIES_LIST = Object.keys(CITIES);

interface Result {
  cost: number;
  minCost: number;
  maxCost: number;
  days: string;
  distance: number;
  insurance: number;
  total: number;
}

const DeliveryCalculator = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [cargoType, setCargoType] = useState("general");
  const [deliveryType, setDeliveryType] = useState("ltl");
  const [cargoValue, setCargoValue] = useState("");
  const [withInsurance, setWithInsurance] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    if (!from || !to || !weight || !deliveryType || !cargoType) {
      setError("Заполните все обязательные поля");
      return;
    }
    if (from === to) {
      setError("Город отправления и назначения совпадают");
      return;
    }

    const distance = CITIES[from]?.[to] ?? CITIES[to]?.[from];
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
    const cost = Math.round(withCargoCoeff);

    const insuranceRate = 0.003;
    const insurance = withInsurance && cargoValue
      ? Math.round(parseFloat(cargoValue) * insuranceRate)
      : 0;

    setResult({
      cost,
      minCost,
      maxCost,
      days: dt.days(distance),
      distance,
      insurance,
      total: cost + insurance,
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Calculator" size={20} />
          Калькулятор доставки
        </CardTitle>
        <CardDescription>
          Расчёт стоимости грузоперевозки для B2B
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label>Откуда *</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger><SelectValue placeholder="Город" /></SelectTrigger>
              <SelectContent>
                {CITIES_LIST.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Куда *</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger><SelectValue placeholder="Город" /></SelectTrigger>
              <SelectContent>
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
          <Checkbox
            id="insurance"
            checked={withInsurance}
            onCheckedChange={v => setWithInsurance(!!v)}
          />
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
              <span className="text-xl font-bold text-blue-900">{(result.minCost + result.insurance).toLocaleString()} – {(result.maxCost + result.insurance).toLocaleString()} ₽</span>
            </div>
            <p className="text-xs text-blue-500">* Точная стоимость уточняется у перевозчика. НДС не включён.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryCalculator;
