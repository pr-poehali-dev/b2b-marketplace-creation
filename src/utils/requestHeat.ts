export interface RequestLike {
  created_at: string | null;
  responses_count: number;
  matched_suppliers: number;
}

export interface HeatResult {
  score: number;            // 0..100
  level: 'hot' | 'warm' | 'cool';
  label: string;
  hint: string;             // подсказка для поставщика
}

const HOURS = 1000 * 60 * 60;

/**
 * «Индекс горячести» заявки — фишка биржи.
 * Чем свежее заявка и чем меньше на неё откликов, тем она «горячее»
 * для поставщика: меньше конкуренция и выше шанс получить заказ.
 */
export function getRequestHeat(req: RequestLike): HeatResult {
  const now = Date.now();
  const created = req.created_at ? new Date(req.created_at).getTime() : now;
  const ageHours = Math.max(0, (now - created) / HOURS);

  // Свежесть: 100 при 0ч, ~0 после 72ч
  const freshness = Math.max(0, 100 - (ageHours / 72) * 100);

  // Конкуренция: чем больше откликов, тем ниже балл
  const competition = Math.max(0, 100 - req.responses_count * 20);

  const score = Math.round(freshness * 0.6 + competition * 0.4);

  if (score >= 70) {
    return {
      score,
      level: 'hot',
      label: 'Горячая',
      hint: req.responses_count === 0
        ? 'Ещё нет откликов — вы можете быть первым!'
        : 'Свежая заявка, мало откликов — успейте предложить цену',
    };
  }
  if (score >= 40) {
    return {
      score,
      level: 'warm',
      label: 'Активная',
      hint: 'Заявка собирает предложения — есть шанс выиграть',
    };
  }
  return {
    score,
    level: 'cool',
    label: 'Остывает',
    hint: 'Заявка уже не новая, но отклик всё ещё возможен',
  };
}

export function timeAgo(iso: string | null): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'только что';
  if (m < 60) return `${m} мин назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ч назад`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'вчера';
  return `${d} дн назад`;
}
