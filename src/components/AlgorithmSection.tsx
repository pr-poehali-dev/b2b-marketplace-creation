import Icon from '@/components/ui/icon';

const STEPS = [
  { emoji: '🫧', title: 'Нанесение активной пены', desc: 'Равномерно нанести пену на кузов снизу вверх, выдержать 3–5 минут.', chemical: 'Активная пена Koch', time: '10 мин' },
  { emoji: '💧', title: 'Смыв загрязнений', desc: 'Смыть пену с пятном водой под давлением. Не давать пене засохнуть.', chemical: null, time: '5 мин' },
  { emoji: '⚙️', title: 'Очистка дисков', desc: 'Нанести кислотный очиститель на диски и суппорта. Выдержать 2 минуты, почистить щёткой.', chemical: 'Очиститель дисков', time: '15 мин' },
  { emoji: '🧴', title: 'Контактная мойка кузова', desc: 'Мыть кузов сверху вниз. Использовать технику двух вёдер. Менять воду при загрязнении.', chemical: 'Шампунь pH-нейтральный', time: '25 мин' },
  { emoji: '🔄', title: 'Финальное ополаскивание', desc: 'Обильно смыть весь шампунь холодной водой под давлением.', chemical: null, time: '5 мин' },
  { emoji: '🌬️', title: 'Сушка кузова', desc: 'Использовать микрофибровые полотенца. Начинать с крыши. Не давать каплям высыхать на ЛКП.', chemical: null, time: '15 мин' },
  { emoji: '✨', title: 'Нанесение защитного состава', desc: 'Нанести воск-спрей на чистую сухую поверхность. Распределить микрофиброй.', chemical: 'Воск-спрей Meguiar\'s', time: '20 мин' },
  { emoji: '🪟', title: 'Очистка стёкол', desc: 'Обработать все стёкла снаружи. При необходимости — изнутри.', chemical: 'Стекольный очиститель', time: '10 мин' },
  { emoji: '🔧', title: 'Уход за пластиком и резинками', desc: 'Нанести реставратор пластика на все наружные элементы. Убрать излишки.', chemical: 'Пластиковый реставратор', time: '10 мин' },
];

export default function AlgorithmSection() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="section-title">Алгоритм мойки</div>
      </div>
      <div className="label-text mb-5">Оптимальная последовательность этапов для безопасного ухода за ЛКП</div>

      <div className="space-y-3">
        {STEPS.map((step, i) => (
          <div key={i} className="step-item" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="step-number">{i + 1}</div>
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{step.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm mb-1">{step.title}</div>
                  <div className="text-xs mb-2" style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {step.chemical && (
                      <span className="chip">
                        <Icon name="FlaskConical" size={10} style={{ color: 'var(--gold)' }} />
                        {step.chemical}
                      </span>
                    )}
                    <span className="chip">
                      <Icon name="Clock" size={10} style={{ color: 'var(--text-tertiary)' }} />
                      {step.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total time */}
      <div className="card-base p-4 mt-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">Общее время</div>
          <div className="label-text mt-0.5">При идеальных условиях</div>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)', fontFamily: 'Montserrat' }}>~2ч 35мин</div>
      </div>
    </div>
  );
}
