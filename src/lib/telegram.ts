export async function sendTelegram(token: string, chatId: string, text: string): Promise<boolean> {
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendTelegramPhoto(token: string, chatId: string, photoBase64: string, caption: string): Promise<boolean> {
  if (!token || !chatId) return false;
  try {
    const blob = await fetch(photoBase64).then(r => r.blob());
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('photo', blob, 'photo.jpg');
    form.append('caption', caption);
    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: 'POST', body: form });
    return res.ok;
  } catch {
    return false;
  }
}

export function buildWashReport(params: {
  date: string;
  time: string;
  duration: string;
  chemicals: string[];
  lowChemicals: { name: string; remains: number }[];
  rating: number;
}): string {
  const stars = '⭐'.repeat(params.rating);
  const chemList = params.chemicals.length ? params.chemicals.map(c => `  • ${c}`).join('\n') : '  нет';
  const lowList = params.lowChemicals.length
    ? '\n\n⚠️ <b>Заканчивается:</b>\n' + params.lowChemicals.map(c => `  • ${c.name} — ${c.remains} мл`).join('\n')
    : '';
  return `✅ <b>Мойка завершена</b>\n📅 ${params.date} в ${params.time}\n⏱ Длительность: ${params.duration}\n${stars}\n\n🧴 <b>Химия:</b>\n${chemList}${lowList}`;
}

export function buildLowChemAlert(name: string, remains: number, volume: number): string {
  const pct = Math.round((remains / volume) * 100);
  return `⚠️ <b>Химия заканчивается</b>\n🧴 ${name}\n📦 Остаток: ${remains} мл (${pct}%)\n\n💡 Пора заказать пополнение!`;
}

export function buildWeatherReport(temp: number, city: string, description: string, recommendation: string): string {
  return `🚗 <b>DetailPro — утренняя сводка</b>\n📍 ${city}\n🌡 ${temp}°C, ${description}\n\n💡 <b>Рекомендация:</b> ${recommendation}`;
}
