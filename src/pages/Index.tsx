import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Counter from '@/components/Counter';
import TypewriterTitle from '@/components/TypewriterTitle';

// ── Изображения ──────────────────────────────────────────────────────────────
const HERO_IMG      = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/6e053162-b54e-4d95-a71e-60052e88c5f9.jpg';
const WELDER_IMG    = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/502ceed7-e66e-4af8-8712-6863b8553b3a.jpg';
const WORKSHOP_IMG  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/cc2960b8-4c86-468d-95a0-4fb33661fa84.jpg';
const TOWER_IMG     = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/5a4c1504-1877-4717-a041-82866e751b28.jpg';

// Реальные фото клиента
const PHOTO_TOWER1  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/47343363-24d7-475e-962a-41da54ed5e02.jpg';
const PHOTO_TOWER2  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/439d5c2c-e5a9-44de-a9e5-37d649e8ed33.jpeg';
const PHOTO_3D      = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/a1248209-9311-49e5-8bcd-efb0f65ec31f.jpeg';
const PHOTO_DRAWING = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/dddffcc0-81ea-411f-84da-ede3bea531c5.jpg';
const PHOTO_SCHEME  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/7c1f8042-8df6-4515-b55c-a84e43399739.jpg';

const HERO_VIDEO = 'https://cdn.coverr.co/videos/coverr-welding-metal-1573/1080p.mp4';

// ── Навигация ─────────────────────────────────────────────────────────────────
const NAV = [
  { label: 'Продукция',   id: 'products'  },
  { label: 'Услуги',      id: 'services'  },
  { label: 'Цикл',        id: 'cycle'     },
  { label: 'О нас',       id: 'about'     },
  { label: 'Контакты',    id: 'contacts'  },
];

// ── Статистика ────────────────────────────────────────────────────────────────
const STATS = [
  { end: 220,  suffix: '+',  unit: '',   label: 'тонн в месяц'    },
  { end: 2600, suffix: '',   unit: 'м²', label: 'площадь цехов'   },
  { end: 60,   suffix: '+',  unit: '',   label: 'единиц техники'   },
  { end: 2000, suffix: '+',  unit: '',   label: 'изделий в год'    },
];

// ── Цикл производства ─────────────────────────────────────────────────────────
const CYCLE = [
  { n: '01', title: 'Консультация',                  icon: 'MessagesSquare' },
  { n: '02', title: 'Коммерческое предложение',      icon: 'FileText'       },
  { n: '03', title: 'Проектирование (КМ, КМД)',      icon: 'PencilRuler'    },
  { n: '04', title: 'Раскрой и плазменная резка',    icon: 'Scissors'       },
  { n: '05', title: 'Лазерная очистка металла',      icon: 'Sparkles'       },
  { n: '06', title: 'Сварка и мехобработка',         icon: 'Flame'          },
  { n: '07', title: 'Контроль качества и сборка',    icon: 'ShieldCheck'    },
  { n: '08', title: 'Отгрузка и логистика',          icon: 'Truck'          },
];

// ── Каталог продукции (с фото) ───────────────────────────────────────────────
const PRODUCTS = [
  {
    title: 'Башни и опоры связи',
    desc: 'Решётчатые башни, трубчатые опоры любой высоты и нагрузки',
    img: PHOTO_TOWER1,
    tag: 'Основной продукт',
  },
  {
    title: 'Антенно-мачтовые сооружения',
    desc: 'Башни связи, мачты и антенно-мачтовые конструкции для телекома',
    img: PHOTO_TOWER2,
    tag: 'Телеком',
  },
  {
    title: 'Проектирование КМ/КМД',
    desc: '3D-проектирование в TEKLA, чертежи КМ и КМД под любую задачу',
    img: PHOTO_3D,
    tag: 'Инжиниринг',
  },
  {
    title: 'Фланцевые соединения',
    desc: 'Закладные детали фундамента, анкерные корзины, ЗДФ, АК',
    img: PHOTO_SCHEME,
    tag: 'Детали',
  },
  {
    title: 'Надстройки на СК-26',
    desc: 'Модульные надстройки на типовые опоры под операторов связи',
    img: PHOTO_DRAWING,
    tag: 'Надстройки',
  },
  {
    title: 'Эстакады и модули',
    desc: 'БВЗ, блок-контейнеры, технологические эстакады под ключ',
    img: WORKSHOP_IMG,
    tag: 'Конструкции',
  },
];

// ── Услуги ────────────────────────────────────────────────────────────────────
const SERVICES = [
  { label: 'Проектирование',           detail: 'КМ, КМД, 3D-модели в TEKLA'                   },
  { label: 'Раскрой металла',          detail: 'Точный раскрой листового и профильного'        },
  { label: 'Плазменная резка с ЧПУ',  detail: 'Высокоточная резка до 60 мм'                   },
  { label: 'Лазерная очистка',        detail: 'Бесконтактно, экологично, идеальная адгезия'   },
  { label: 'Мехобработка',            detail: 'Фрезеровка, сверловка, расточка'               },
  { label: 'Сварка',                  detail: 'MIG/MAG, SAW, сертифицированные сварщики'      },
  { label: 'Покраска',                detail: 'Горячее цинкование, порошок, ЛКМ'              },
  { label: 'Контроль качества',       detail: 'УЗ-дефектоскопия, визуальный, измерительный'  },
];

// ── Команда ───────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: 'Трофимов Е.П.',
    role: 'Генеральный директор',
    quote: 'Мы отвечаем за каждую тонну металла своим именем.',
    img: 'https://ui-avatars.com/api/?name=Трофимов+Е&background=E8590C&color=fff&size=200&bold=true&font-size=0.38',
  },
  {
    name: 'Кужамбетов М.О.',
    role: 'Директор производства',
    quote: 'Полный цикл — это контроль на каждом этапе.',
    img: 'https://ui-avatars.com/api/?name=Кужамбетов+М&background=162333&color=00E5B5&size=200&bold=true&font-size=0.35',
  },
  {
    name: 'Баимов А.С.',
    role: 'Инженер по развитию',
    quote: 'Технологии будущего внедряем уже сегодня.',
    img: 'https://ui-avatars.com/api/?name=Баимов+А&background=0F1E2E&color=C9A84C&size=200&bold=true&font-size=0.38',
  },
  {
    name: 'Хаметов М.',
    role: 'Коммерческий директор',
    quote: 'Работаем без посредников — честно и напрямую.',
    img: 'https://ui-avatars.com/api/?name=Хаметов+М&background=E8590C&color=fff&size=200&bold=true&font-size=0.38',
  },
];

// ── Технический контроль ──────────────────────────────────────────────────────
const CONTROL = [
  { title: 'Входной',             desc: 'Проверка качества поступающего металла и материалов', icon: 'PackageCheck' },
  { title: 'Производственный',    desc: 'Контроль на каждом этапе изготовления',               icon: 'Cog'          },
  { title: 'Готовой продукции',   desc: 'Финальная проверка геометрии и сварных швов',         icon: 'BadgeCheck'   },
  { title: 'Хранения',            desc: 'Контроль условий складирования изделий',              icon: 'Warehouse'    },
  { title: 'Отгрузки',           desc: 'Проверка комплектности и документации',               icon: 'Truck'        },
];

// ── Транспорт ─────────────────────────────────────────────────────────────────
const TRANSPORT = [
  { title: 'Автокран 32 т',   desc: 'Монтаж тяжёлых конструкций',    icon: 'Crane'  },
  { title: 'КМУ с буровым',   desc: 'Установка опор и бурение',       icon: 'Drill'  },
  { title: 'Тягачи',           desc: 'Перевозка негабарита по РФ',     icon: 'Truck'  },
  { title: 'Грузовики',        desc: 'Доставка изделий на объект',     icon: 'Package'},
];

// ── Клиенты ───────────────────────────────────────────────────────────────────
const CLIENTS = ['Антарес','ПБК','МИГ','Квант-Телеком','Медиа-Ас','Стальтех','Связьразвитие'];

// ── Галерея (реальные фото клиента) ──────────────────────────────────────────
const GALLERY = [
  { src: PHOTO_TOWER1,  tall: true  },
  { src: PHOTO_TOWER2,  tall: false },
  { src: PHOTO_3D,      tall: false },
  { src: WELDER_IMG,    tall: true  },
  { src: PHOTO_DRAWING, tall: false },
  { src: PHOTO_SCHEME,  tall: false },
];

// ── Вспомогательные компоненты ────────────────────────────────────────────────
const Section = ({ id, children, className = '', style }: { id?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <section id={id} style={style} className={`relative py-28 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="block h-px w-8 bg-teal shrink-0" />
    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal">{children}</span>
  </div>
);

// ── Главная страница ──────────────────────────────────────────────────────────
const Index = () => {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [flipped,       setFlipped]       = useState<number | null>(null);
  const [activeService, setActiveService] = useState(0);
  const [activeCtrl,    setActiveCtrl]    = useState(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const f0  = useRef<HTMLDivElement>(null);
  const f1  = useRef<HTMLDivElement>(null);
  const f2  = useRef<HTMLDivElement>(null);
  const f3  = useRef<HTMLDivElement>(null);
  const f4  = useRef<HTMLDivElement>(null);
  const f5  = useRef<HTMLDivElement>(null);
  const f6  = useRef<HTMLDivElement>(null);
  const f7  = useRef<HTMLDivElement>(null);
  const f8  = useRef<HTMLDivElement>(null);
  const f9  = useRef<HTMLDivElement>(null);
  const f10 = useRef<HTMLDivElement>(null);
  const f11 = useRef<HTMLDivElement>(null);
  const f12 = useRef<HTMLDivElement>(null);
  const f13 = useRef<HTMLDivElement>(null);
  const fadeRefs = [f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13];

  useEffect(() => {
    fadeRefs.forEach((ref) => {
      const el = ref.current; if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'none'; }
      }, { threshold: 0.12 });
      obs.observe(el);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-copper/30">

      {/* ════════════════════════ HEADER ════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <button onClick={() => scrollTo('hero')} className="group flex items-center gap-1">
            <span className="font-display text-[1.35rem] font-black tracking-tight text-white group-hover:text-white/90 transition-colors">МК</span>
            <span className="font-display text-[1.35rem] font-black tracking-tight text-copper" style={{ textShadow: '0 0 24px hsla(22,91%,48%,0.8)' }}>&nbsp;СЭК</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="font-body text-[13px] font-medium text-white/55 hover:text-white transition-colors tracking-wide">
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button onClick={() => scrollTo('contacts')}
              className="hidden md:inline-flex items-center gap-2 copper-gradient text-white font-display font-bold text-[13px] uppercase tracking-wider px-5 h-9 rounded-full pulse-btn border-0">
              <Icon name="PhoneCall" size={15} />
              Связаться
            </Button>
            <button className="md:hidden text-white/80 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-strong border-t border-white/[0.06] px-6 py-5 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="font-body text-sm text-left text-white/60 hover:text-teal transition-colors">
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('contacts')} className="copper-gradient text-white font-display font-bold uppercase rounded-full border-0">
              Связаться
            </Button>
          </div>
        )}
      </header>

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 overflow-hidden">
          <video autoPlay loop muted playsInline poster={HERO_IMG}
            className="w-full h-full object-cover opacity-40">
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <img src={HERO_IMG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/65 to-background" />
          <div className="absolute inset-0 tech-grid opacity-40" />
          {/* aurora glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] aurora pointer-events-none opacity-30" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-teal mb-7 animate-fade-in">
            Производство полного цикла&nbsp;•&nbsp;Оренбург
          </p>
          <h1 className="font-display font-black mb-7 leading-none" style={{ fontSize: 'clamp(4rem, 14vw, 9rem)', letterSpacing: '-0.03em' }}>
            <TypewriterTitle text="МК СЭК" />
          </h1>
          <p className="font-display font-semibold text-white/85 mb-1" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}>
            Мы производим&nbsp;<span className="text-gradient-copper">металлоконструкции</span>.
          </p>
          <p className="font-display font-semibold text-white/85 mb-12" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}>
            Мы строим&nbsp;<span className="text-gradient-copper">опоры</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollTo('contacts')} size="lg"
              className="copper-gold-gradient text-white font-display font-bold text-[15px] uppercase tracking-widest px-10 py-6 rounded-full glow-copper border-0 hover:scale-105 transition-transform">
              <Icon name="Send" size={18} className="mr-2" />
              Запросить проект
            </Button>
            <Button onClick={() => scrollTo('products')} variant="outline" size="lg"
              className="border-white/20 text-white/80 hover:text-white hover:border-white/40 bg-white/5 backdrop-blur font-display font-semibold text-[15px] px-10 py-6 rounded-full">
              Каталог продукции
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="scroll-indicator relative h-12 w-px bg-white/20" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">scroll</span>
        </div>
      </section>

      {/* ════════════════════════ STATS ════════════════════════ */}
      <Section className="!py-20 border-y border-white/[0.06]" style={{ background: 'linear-gradient(180deg, hsla(211,51%,10%,0.6), hsla(211,51%,8%,0.8))' }}>
        <div ref={fadeRefs[0]} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 divide-x-0 md:divide-x divide-white/[0.07]">
          {STATS.map((s) => (
            <Counter key={s.label} end={s.end} suffix={s.suffix} unit={s.unit} label={s.label} />
          ))}
        </div>
      </Section>

      {/* ════════════════════════ ABOUT ════════════════════════ */}
      <Section id="about">
        <div ref={fadeRefs[1]} className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <Tag>О компании</Tag>
            <h2 className="font-display font-black text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
              ООО «МК СЭК» —<br />
              <span className="text-copper">производство</span><br />
              полного цикла
            </h2>
            <p className="text-white/60 text-[17px] leading-relaxed mb-6">
              Проектируем, изготавливаем и монтируем металлоконструкции для связи по всей России.
              Собственные цеха площадью 2&nbsp;600&nbsp;м², современное оборудование и команда инженеров.
            </p>
            <p className="text-teal font-semibold text-lg">Без посредников. С гарантией качества.</p>
          </div>
          <div className="relative rounded-3xl overflow-hidden">
            <img src={WORKSHOP_IMG} alt="Цех МК СЭК" className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-teal">Производство, Оренбург</span>
              <span className="font-display font-black text-copper text-5xl opacity-30">МК</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════════ CYCLE ════════════════════════ */}
      <Section id="cycle" className="border-y border-white/[0.06]" style={{ background: 'linear-gradient(180deg, hsla(211,51%,8%,0.7) 0%, hsla(213,54%,6%,0.5) 100%)' }}>
        <div ref={fadeRefs[2]}>
          <Tag>От идеи до объекта</Tag>
          <h2 className="font-display font-black text-white mb-14" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Полный цикл производства
          </h2>
        </div>
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <div ref={fadeRefs[3]} className="relative rounded-3xl overflow-hidden h-[540px]">
            <img src={WELDER_IMG} alt="Сварщик МК СЭК" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="font-display font-bold text-white text-2xl mb-1">Мастерство</p>
              <p className="font-mono text-xs uppercase tracking-widest text-teal">в каждом шве</p>
            </div>
          </div>
          <div ref={fadeRefs[4]} className="grid sm:grid-cols-2 gap-3">
            {CYCLE.map((step) => (
              <div key={step.n}
                className="card-edge card-shine glass gradient-ring rounded-2xl p-5 flex items-start gap-4 cursor-default">
                <div className="font-mono text-lg font-bold text-copper/50 shrink-0 mt-0.5">{step.n}</div>
                <div>
                  <Icon name={step.icon} size={20} className="text-teal mb-2" />
                  <h3 className="font-display font-semibold text-[13px] text-white leading-snug">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════ PRODUCTS ════════════════════════ */}
      <Section id="products">
        <div ref={fadeRefs[5]}>
          <Tag>Продукция</Tag>
          <h2 className="font-display font-black text-white mb-14" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Каталог изделий
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <div key={p.title} className="card-edge group relative rounded-3xl overflow-hidden cursor-default" style={{ background: '#0F1E2E' }}>
              <div className="h-52 overflow-hidden">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E] via-[#0F1E2E]/30 to-transparent" />
              </div>
              <div className="p-6 relative z-10">
                <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-teal bg-teal/10 rounded-full px-3 py-1 mb-3">{p.tag}</span>
                <h3 className="font-display font-bold text-white text-[17px] mb-2 leading-snug">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{p.desc}</p>
                <button className="font-mono text-xs uppercase tracking-widest text-copper flex items-center gap-2 group-hover:gap-3 transition-all">
                  Подробнее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <Section id="services" className="border-y border-white/[0.06]" style={{ background: 'linear-gradient(180deg, hsla(211,51%,8%,0.7), hsla(213,54%,6%,0.5))' }}>
        <div ref={fadeRefs[6]}>
          <Tag>Услуги</Tag>
          <h2 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Технологическая цепочка
          </h2>
          <p className="text-white/50 mb-12 max-w-2xl text-[16px]">
            Акцент на&nbsp;<span className="text-teal">плазменной резке с ЧПУ</span> и&nbsp;<span className="text-teal">лазерной очистке металла</span> — бесконтактно, экологично, идеальная адгезия.
          </p>
        </div>
        <div className="grid md:grid-cols-[280px_1fr] gap-4">
          <div className="flex flex-col gap-2">
            {SERVICES.map((s, i) => (
              <button key={s.label} onMouseEnter={() => setActiveService(i)}
                className={`text-left px-5 py-4 rounded-xl font-display font-semibold text-[14px] transition-all ${activeService === i ? 'copper-gradient text-white shadow-lg' : 'glass text-white/55 hover:text-white/80'}`}>
                <span className="font-mono text-[11px] text-copper/60 mr-2">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            ))}
          </div>
          <div className="glass gradient-ring rounded-2xl p-10 flex flex-col justify-center min-h-[260px]">
            <div className="font-mono text-[11px] uppercase tracking-widest text-teal mb-4">
              {String(activeService + 1).padStart(2, '0')} / 08
            </div>
            <h3 className="font-display font-black text-white text-3xl mb-4">{SERVICES[activeService].label}</h3>
            <p className="text-white/60 text-lg leading-relaxed">{SERVICES[activeService].detail}</p>
          </div>
        </div>
      </Section>

      {/* ════════════════════════ TEAM ════════════════════════ */}
      <Section id="team">
        <div ref={fadeRefs[7]}>
          <Tag>Руководство</Tag>
          <h2 className="font-display font-black text-white mb-14" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Команда
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m, i) => (
            <div key={m.name} onMouseEnter={() => setFlipped(i)} onMouseLeave={() => setFlipped(null)}
              className="relative h-72 [perspective:1000px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
                style={{ transform: flipped === i ? 'rotateY(180deg)' : '' }}>
                {/* Лицо */}
                <div className="absolute inset-0 glass rounded-3xl overflow-hidden flex flex-col [backface-visibility:hidden]">
                  <div className="h-44 bg-gradient-to-br from-[#0F1E2E] to-[#162333] overflow-hidden flex items-center justify-center">
                    <img src={m.img} alt={m.name}
                      className="w-32 h-32 rounded-full object-cover border-2 border-copper/40 shadow-lg" />
                  </div>
                  <div className="p-5 flex flex-col">
                    <p className="font-display font-bold text-white text-[15px] leading-tight">{m.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-teal mt-1">{m.role}</p>
                  </div>
                </div>
                {/* Цитата */}
                <div className="absolute inset-0 glass rounded-3xl p-7 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] glow-teal">
                  <Icon name="Quote" size={30} className="text-copper mb-4 opacity-70" />
                  <p className="text-white/90 font-body italic text-[15px] leading-relaxed">«{m.quote}»</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-teal mt-4">{m.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ TECH CONTROL ════════════════════════ */}
      <Section id="control" className="border-y border-white/[0.06]" style={{ background: 'linear-gradient(180deg, hsla(211,51%,8%,0.7), hsla(213,54%,6%,0.5))' }}>
        <div ref={fadeRefs[8]}>
          <Tag>Технический контроль</Tag>
          <h2 className="font-display font-black text-white mb-14" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Качество на каждом этапе
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {CONTROL.map((c, i) => (
            <div key={c.title} onMouseEnter={() => setActiveCtrl(i)}
              className={`card-edge glass rounded-2xl p-6 cursor-default transition-all duration-300 ${activeCtrl === i ? 'glow-teal scale-[1.03]' : ''}`}>
              <div className="font-mono text-[10px] text-copper mb-3">0{i + 1}</div>
              <Icon name={c.icon} size={26} className="text-teal mb-4" />
              <h3 className="font-display font-bold text-white text-[14px] mb-2">{c.title}</h3>
              <p className="text-white/45 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ TRANSPORT ════════════════════════ */}
      <Section id="transport">
        <div ref={fadeRefs[9]}>
          <Tag>Транспортный отдел</Tag>
          <h2 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Своя техника
          </h2>
          <p className="text-white/50 mb-14 max-w-2xl text-[16px]">
            Допуски Ростехнадзора. Работаем с&nbsp;<span className="text-gold font-semibold">ГАЗПРОМ</span>&nbsp;и&nbsp;<span className="text-gold font-semibold">РОСНЕФТЬ</span>. Доставка по всей России.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRANSPORT.map((t) => (
            <div key={t.title} className="card-edge card-shine glass rounded-2xl p-8 group cursor-default">
              <div className="w-14 h-14 rounded-2xl copper-gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name={t.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-[17px] mb-2">{t.title}</h3>
              <p className="text-white/50 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ VIDEO ════════════════════════ */}
      <Section id="video" className="border-y border-white/[0.06]" style={{ background: 'linear-gradient(180deg, hsla(211,51%,8%,0.7), hsla(213,54%,6%,0.5))' }}>
        <div ref={fadeRefs[10]}>
          <Tag>Видео о производстве</Tag>
          <h2 className="font-display font-black text-white mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Как мы создаём опоры
          </h2>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl">
          <div className="aspect-video">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/ScMzIvxBSi4"
              title="Видео о производстве МК СЭК"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
        </div>
        <p className="mt-8 text-white/50 text-[16px] max-w-2xl leading-relaxed">
          От идеи до объекта — полный цикл производства на одной площадке.
          Посмотрите, как мы создаём опоры для связи по всей России.
          <span className="text-teal font-medium"> Без посредников. С гарантией качества.</span>
        </p>
      </Section>

      {/* ════════════════════════ CLIENTS marquee ════════════════════════ */}
      <Section className="!py-20">
        <div ref={fadeRefs[11]}>
          <Tag>Клиенты и проекты</Tag>
          <h2 className="font-display font-black text-white mb-10" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>
            Нам доверяют
          </h2>
        </div>
        <div className="marquee-wrap overflow-hidden relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
          <div className="marquee-track flex gap-4 w-max">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="glass rounded-2xl px-8 py-5 font-display font-semibold text-lg text-white/50 hover:text-white/90 whitespace-nowrap transition-colors cursor-default">
                {c}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════ GALLERY ════════════════════════ */}
      <Section id="gallery" className="border-y border-white/[0.06]" style={{ background: 'linear-gradient(180deg, hsla(211,51%,8%,0.7), hsla(213,54%,6%,0.5))' }}>
        <div ref={fadeRefs[12]}>
          <Tag>Фотогалерея</Tag>
          <h2 className="font-display font-black text-white mb-14" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
            Производство в деталях
          </h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY.map((g, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden break-inside-avoid group cursor-zoom-in">
              <img src={g.src} alt={`Производство МК СЭК — фото ${i + 1}`}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${g.tall ? 'h-80' : 'h-56'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════ CONTACTS ════════════════════════ */}
      <Section id="contacts">
        <div ref={fadeRefs[13]} className="grid lg:grid-cols-2 gap-14">
          <div>
            <Tag>Контакты</Tag>
            <a href="tel:88001015600"
              className="font-display font-black text-gradient-copper block mb-6 whitespace-nowrap leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              8 (800) 101-56-00
            </a>
            <div className="space-y-4 text-[16px] mb-8">
              <a href="mailto:mkske@mkske.ru" className="flex items-center gap-4 text-white/60 hover:text-white transition-colors">
                <span className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <Icon name="Mail" size={18} className="text-teal" />
                </span>
                mkske@mkske.ru
              </a>
              <div className="flex items-center gap-4 text-white/60">
                <span className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={18} className="text-teal" />
                </span>
                Оренбург, ул. Донгузская, 68
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://t.me/mkske" target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white/15 text-white/70 hover:text-white hover:border-teal/60 hover:bg-teal/10 rounded-full gap-2">
                  <Icon name="Send" size={16} className="text-teal" /> Telegram
                </Button>
              </a>
              <a href="https://max.ru" target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white/15 text-white/70 hover:text-white hover:border-copper/60 hover:bg-copper/10 rounded-full gap-2">
                  <Icon name="MessageSquare" size={16} className="text-copper" /> MAX
                </Button>
              </a>
            </div>
          </div>

          <form className="glass-strong rounded-3xl p-8 space-y-4 border border-white/[0.07]" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-display font-bold text-white text-2xl mb-1">Запросить проект</h3>
            <p className="text-white/40 text-sm mb-4">Ответим в течение 1 рабочего дня</p>
            <input placeholder="Ваше имя"
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-copper/60 focus:border-copper/40 transition" />
            <input placeholder="Телефон"
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-copper/60 focus:border-copper/40 transition" />
            <textarea placeholder="Опишите задачу" rows={4}
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:ring-1 ring-copper/60 focus:border-copper/40 transition resize-none" />
            <label className="flex items-center gap-3 text-sm text-white/40 cursor-pointer hover:text-white/70 transition-colors group">
              <span className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0 group-hover:border-teal/40 transition">
                <Icon name="Paperclip" size={16} className="text-teal" />
              </span>
              Прикрепить чертежи (PDF, DWG)
              <input type="file" accept=".pdf,.dwg,.dxf" className="hidden" />
            </label>
            <Button type="submit"
              className="w-full copper-gold-gradient text-white font-display font-bold text-[15px] uppercase tracking-widest py-6 rounded-full border-0 hover:scale-[1.02] transition-transform glow-copper">
              Отправить заявку
            </Button>
          </form>
        </div>
      </Section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="border-t border-white/[0.06] py-14 px-6" style={{ background: 'linear-gradient(180deg, hsla(211,51%,8%,0.8), hsla(213,54%,5%,1))' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="font-display font-black text-2xl mb-3 tracking-tight">
              <span className="text-white">МК</span>
              <span className="text-copper" style={{ textShadow: '0 0 16px hsla(22,91%,48%,0.5)' }}>&nbsp;СЭК</span>
            </div>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed">
              Производство металлоконструкций<br />полного цикла. Оренбург.
            </p>
          </div>
          <div className="flex flex-wrap gap-12 text-sm">
            <div className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Навигация</p>
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  className="block text-white/45 hover:text-teal transition-colors font-body">
                  {n.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Контакты</p>
              <p className="text-white/45">8 (800) 101-56-00</p>
              <p className="text-white/45">mkske@mkske.ru</p>
              <p className="text-white/45">ул. Донгузская, 68</p>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Реквизиты</p>
              <p className="text-white/45">ООО «МК СЭК»</p>
              <p className="text-white/45">ИНН: —</p>
              <p className="text-white/45">ОГРН: —</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/25">© 2026 ООО «МК СЭК»</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-copper/60">Сделано в России</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;