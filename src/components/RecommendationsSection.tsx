import Icon from '@/components/ui/icon';

const RECS = [
  {
    category: 'Сезонный уход',
    icon: 'Sun',
    color: '#F0C040',
    items: [
      'Весна: тщательная мойка от дорожных реагентов, обработка порогов антикором.',
      'Лето: воск раз в 6 недель, регулярная мойка от пыльцы и тополиного пуха.',
      'Осень: нанесение долговременной защиты перед зимним сезоном.',
      'Зима: бесконтактная мойка только при +3° и выше, сушка в тёпло.',
    ],
  },
  {
    category: 'Защита ЛКП',
    icon: 'Shield',
    color: '#60A5FA',
    items: [
      'Никогда не мойте автомобиль на солнце — химия оставляет пятна на горячем ЛКП.',
      'pH-нейтральный шампунь не смывает ранее нанесённый воск.',
      'Микрофибра при мойке — только чистая. Сдвоенное ведро обязательно.',
      'После кислотного очистителя дисков обязательно смывать обильно водой.',
    ],
  },
  {
    category: 'Оборудование',
    icon: 'Wrench',
    color: '#A78BFA',
    items: [
      'Пенопушка на давлении 100–120 бар даёт густую пену.',
      'Мойте резиновые уплотнители специальным ухажером — продлите их жизнь.',
      'Скребок для стёкол — только с новым лезвием и обильной смазкой.',
    ],
  },
];

export default function RecommendationsSection() {
  return (
    <div className="animate-fade-in">
      <div className="section-title mb-2">Рекомендации</div>
      <div className="label-text mb-5">Советы по уходу за автомобилем на основе вашей истории</div>

      <div className="space-y-4">
        {RECS.map((rec) => (
          <div key={rec.category} className="card-base p-5">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${rec.color}20`, border: `1px solid ${rec.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={rec.icon as Parameters<typeof Icon>[0]['name']} size={16} style={{ color: rec.color }} />
              </div>
              <div className="font-semibold text-white">{rec.category}</div>
            </div>
            <div className="space-y-3">
              {rec.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: rec.color, flexShrink: 0, marginTop: 6 }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tip of the day */}
      <div className="mt-4 p-5 rounded-3xl" style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Zap" size={14} style={{ color: 'var(--gold)' }} />
          <span className="label-text" style={{ color: 'var(--gold)' }}>Совет дня</span>
        </div>
        <div className="text-sm font-medium text-white">При использовании глиняного бруска всегда смачивайте поверхность специальной смазкой. Никогда не используйте сухой брусок — это необратимо повредит ЛКП.</div>
      </div>
    </div>
  );
}
