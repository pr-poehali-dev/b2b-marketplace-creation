import { suppliersData } from '@/data/suppliersData';

export interface MatchedSupplier {
  id: number;
  name: string;
  email: string;
  category: string;
  region: string;
  reason: string;
  score: number;
}

const normalize = (s: string) =>
  (s || '').toLowerCase().replace(/ё/g, 'е').trim();

const tokenize = (s: string) =>
  normalize(s)
    .split(/[^a-zа-я0-9]+/i)
    .filter((w) => w.length >= 4);

/**
 * Подбирает поставщиков под заявку покупателя.
 * Логика: точное совпадение категории — максимум баллов; далее совпадение
 * по специализациям и ключевым словам из названия/описания заявки.
 */
export function matchSuppliers(params: {
  category: string;
  title: string;
  description: string;
  region?: string;
}): MatchedSupplier[] {
  const cat = normalize(params.category);
  const queryTokens = new Set([
    ...tokenize(params.title),
    ...tokenize(params.description),
  ]);

  const results: MatchedSupplier[] = [];

  for (const sup of suppliersData) {
    let score = 0;
    const reasons: string[] = [];

    const supCat = normalize(sup.category);

    // 1. Точное совпадение категории
    if (supCat === cat && cat) {
      score += 100;
      reasons.push('точное совпадение категории');
    } else if (cat && (supCat.includes(cat) || cat.includes(supCat))) {
      // Схожая категория (частичное вхождение)
      score += 50;
      reasons.push('схожая категория');
    }

    // 2. Совпадение по специализациям
    const specs: string[] = (sup as any).specializations || [];
    for (const spec of specs) {
      const specTokens = tokenize(spec);
      const hit = specTokens.some((t) => queryTokens.has(t));
      if (hit || queryTokens.has(normalize(spec))) {
        score += 25;
        reasons.push(`специализация «${spec}»`);
      }
    }

    // 3. Ключевые слова из названия/описания против названия поставщика
    const supNameTokens = tokenize(sup.name);
    for (const t of supNameTokens) {
      if (queryTokens.has(t)) {
        score += 10;
        reasons.push('совпадение по ключевым словам');
        break;
      }
    }

    if (score > 0) {
      results.push({
        id: sup.id,
        name: sup.name,
        email: (sup as any).email || '',
        category: sup.category,
        region: sup.region,
        reason: Array.from(new Set(reasons)).slice(0, 2).join(', '),
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
