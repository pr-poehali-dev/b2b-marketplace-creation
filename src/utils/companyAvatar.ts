const PALETTE = [
  'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-orange-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-amber-500', 'bg-fuchsia-500',
];

export function avatarColor(name: string): string {
  const key = name || '?';
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = key.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function initials(name: string): string {
  const clean = (name || '')
    .replace(/[«»"'()]/g, '')
    .replace(/\b(ООО|АО|ЗАО|ПАО|ИП|ОАО)\b/gi, '')
    .trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
