import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Counter from '@/components/Counter';
import TypewriterTitle from '@/components/TypewriterTitle';

/* ── Фото ─────────────────────────────────────────────────── */
const HERO_IMG      = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/6e053162-b54e-4d95-a71e-60052e88c5f9.jpg';
const WORKSHOP_IMG  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/cc2960b8-4c86-468d-95a0-4fb33661fa84.jpg';
const TOWER_IMG     = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/5a4c1504-1877-4717-a041-82866e751b28.jpg';

const PHOTO_TOWER1  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/47343363-24d7-475e-962a-41da54ed5e02.jpg';
const PHOTO_TOWER2  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/439d5c2c-e5a9-44de-a9e5-37d649e8ed33.jpeg';
const PHOTO_3D      = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/a1248209-9311-49e5-8bcd-efb0f65ec31f.jpeg';
const PHOTO_DRAWING = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/dddffcc0-81ea-411f-84da-ede3bea531c5.jpg';
const PHOTO_SCHEME  = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/bucket/7c1f8042-8df6-4515-b55c-a84e43399739.jpg';

const HERO_VIDEO = 'https://cdn.coverr.co/videos/coverr-welding-metal-1573/1080p.mp4';

/* ── Unsplash для услуг (свободные фото) ─────────────────── */
const SVC_DESIGN = 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=640&q=80';
const SVC_CUT    = 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=640&q=80';
const SVC_PLASMA = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=640&q=80';
const SVC_LASER  = 'https://images.unsplash.com/photo-1581093196277-9f6e9b964b3a?w=640&q=80';
const SVC_MECH   = 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=640&q=80';
const SVC_WELD   = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80';
const SVC_PAINT  = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=640&q=80';
const SVC_QC     = 'https://images.unsplash.com/photo-1581092921461-7031e3f1aadd?w=640&q=80';

/* ── Навигация ───────────────────────────────────────────── */
const NAV = [
  { label: 'Продукция', id: 'products' },
  { label: 'Услуги',    id: 'services' },
  { label: 'Цикл',      id: 'cycle'    },
  { label: 'О нас',     id: 'about'    },
  { label: 'Контакты',  id: 'contacts' },
];

const STATS = [
  { end: 220,  suffix: '+', unit: '',   label: 'тонн в месяц'  },
  { end: 2600, suffix: '',  unit: 'м²', label: 'площадь цехов' },
  { end: 60,   suffix: '+', unit: '',   label: 'единиц техники' },
  { end: 2000, suffix: '+', unit: '',   label: 'изделий в год'  },
];

const CYCLE = [
  { n: '01', title: 'Консультация',               icon: 'MessagesSquare' },
  { n: '02', title: 'Коммерческое предложение',   icon: 'FileText'       },
  { n: '03', title: 'Проектирование КМ / КМД',    icon: 'PencilRuler'    },
  { n: '04', title: 'Раскрой и плазменная резка', icon: 'Scissors'       },
  { n: '05', title: 'Лазерная очистка металла',   icon: 'Sparkles'       },
  { n: '06', title: 'Сварка и мехобработка',      icon: 'Flame'          },
  { n: '07', title: 'Контроль качества',          icon: 'ShieldCheck'    },
  { n: '08', title: 'Отгрузка и логистика',       icon: 'Truck'          },
];

const PRODUCTS = [
  { title: 'Башни и опоры связи',         desc: 'Решётчатые башни, трубчатые опоры любой высоты',        img: PHOTO_TOWER1,  tag: 'Основной продукт' },
  { title: 'Антенно-мачтовые сооружения', desc: 'Мачты и АМС для телекоммуникационных операторов',       img: PHOTO_TOWER2,  tag: 'Телеком'          },
  { title: 'Проектирование КМ/КМД',       desc: '3D-проектирование в TEKLA, чертежи под любую задачу',   img: PHOTO_3D,      tag: 'Инжиниринг'       },
  { title: 'Фланцевые соединения',        desc: 'Закладные детали фундамента, анкерные корзины',         img: PHOTO_SCHEME,  tag: 'Детали'           },
  { title: 'Надстройки на СК-26',         desc: 'Модульные надстройки на типовые опоры операторов связи', img: PHOTO_DRAWING, tag: 'Надстройки'       },
  { title: 'Эстакады и модули',           desc: 'БВЗ, блок-контейнеры, технологические эстакады',        img: WORKSHOP_IMG,  tag: 'Конструкции'      },
];

const SERVICES = [
  { label: 'Проектирование',          detail: 'КМ, КМД, 3D-модели в TEKLA. Полная конструкторская документация.',            img: SVC_DESIGN },
  { label: 'Раскрой металла',         detail: 'Точный раскрой листового и профильного металла. Минимум отходов.',              img: SVC_CUT    },
  { label: 'Плазменная резка с ЧПУ',  detail: 'Высокоточная резка толщиной до 60 мм. Программируемые ЧПУ-станки.',            img: SVC_PLASMA },
  { label: 'Лазерная очистка',        detail: 'Бесконтактное удаление окалины и ржавчины. Идеальная адгезия перед покраской.', img: SVC_LASER  },
  { label: 'Мехобработка',            detail: 'Фрезеровка, сверловка, расточка. Допуски по ГОСТ.',                            img: SVC_MECH   },
  { label: 'Сварка',                  detail: 'MIG/MAG, SAW, FCAW. Сертифицированные сварщики, НК-контроль швов.',            img: SVC_WELD   },
  { label: 'Покраска и защита',       detail: 'Горячее цинкование, порошковая покраска, ЛКМ. Срок службы до 25 лет.',         img: SVC_PAINT  },
  { label: 'Контроль качества',       detail: 'УЗ-дефектоскопия, визуальный и измерительный контроль. Протоколы испытаний.',  img: SVC_QC     },
];

const TEAM = [
  { name: 'Трофимов Е.П.',   role: 'Генеральный директор',  quote: 'Мы отвечаем за каждую тонну металла своим именем.',  initials: 'ТЕ', color: '#E8590C' },
  { name: 'Кужамбетов М.О.', role: 'Директор производства', quote: 'Полный цикл — это контроль на каждом этапе.',        initials: 'КМ', color: '#00B89A' },
  { name: 'Баимов А.С.',     role: 'Инженер по развитию',   quote: 'Технологии будущего внедряем уже сегодня.',          initials: 'БА', color: '#C9A84C' },
  { name: 'Хаметов М.',      role: 'Коммерческий директор', quote: 'Работаем без посредников — честно и напрямую.',      initials: 'ХМ', color: '#E8590C' },
];

const CONTROL = [
  { title: 'Входной',           desc: 'Проверка сертификатов металла и материалов',         icon: 'PackageCheck' },
  { title: 'Производственный',  desc: 'Контроль параметров на каждой операции',             icon: 'Cog'         },
  { title: 'Готовой продукции', desc: 'Проверка геометрии и сварных швов',                 icon: 'BadgeCheck'  },
  { title: 'Хранения',          desc: 'Условия складирования изделий',                     icon: 'Warehouse'   },
  { title: 'Отгрузки',          desc: 'Комплектность и сопроводительная документация',     icon: 'Truck'       },
];

const TRANSPORT = [
  { title: 'Автокран 32 т', desc: 'Монтаж тяжёлых конструкций на объектах',  icon: 'Crane'   },
  { title: 'КМУ с буровым', desc: 'Установка опор и бурение скважин',         icon: 'Drill'   },
  { title: 'Тягачи',         desc: 'Перевозка крупногабаритных конструкций',  icon: 'Truck'   },
  { title: 'Грузовики',      desc: 'Доставка готовых изделий на объект',      icon: 'Package' },
];

const CLIENTS = ['Антарес','ПБК','МИГ','Квант-Телеком','Медиа-Ас','Стальтех','Связьразвитие'];

const GALLERY = [
  { src: PHOTO_TOWER1,  tall: true  },
  { src: PHOTO_TOWER2,  tall: false },
  { src: PHOTO_3D,      tall: false },
  { src: TOWER_IMG,     tall: true  },
  { src: PHOTO_DRAWING, tall: false },
  { src: PHOTO_SCHEME,  tall: false },
];

/* ── Компоненты ──────────────────────────────────────────── */
const Section = ({
  id, children, className = '', style,
}: { id?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <section id={id} style={style} className={`relative py-28 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="block h-px w-8 bg-teal shrink-0" />
    <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-teal">{children}</span>
  </div>
);

function useFadeRef() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(36px)';
    el.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'none'; }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════════════════════════ */
const Index = () => {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [flipped,    setFlipped]    = useState<number | null>(null);
  const [activeSvc,  setActiveSvc]  = useState(0);
  const [activeCtrl, setActiveCtrl] = useState(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const rStats    = useFadeRef();
  const rAbout    = useFadeRef();
  const rCycleH   = useFadeRef();
  const rCycleG   = useFadeRef();
  const rProdH    = useFadeRef();
  const rSvcH     = useFadeRef();
  const rTeamH    = useFadeRef();
  const rCtrlH    = useFadeRef();
  const rTransH   = useFadeRef();
  const rVideoH   = useFadeRef();
  const rCliH     = useFadeRef();
  const rGalH     = useFadeRef();
  const rContacts = useFadeRef();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ══ HEADER ══ */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="group flex items-baseline gap-0.5">
            <span className="font-display text-[1.4rem] font-black tracking-tight text-white">МК</span>
            <span className="font-display text-[1.4rem] font-black tracking-tight ml-1.5"
              style={{ color: 'hsl(22,90%,60%)', textShadow: '0 0 28px hsla(22,90%,52%,0.75)' }}>
              СЭК
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="hover-underline font-body text-[13px] font-medium text-white/55 hover:text-white transition-colors duration-200">
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button onClick={() => scrollTo('contacts')}
              className="hidden md:inline-flex items-center gap-2 copper-gradient text-white font-display font-bold text-[13px] uppercase tracking-wider px-5 h-9 rounded-full pulse-btn border-0 shadow-lg">
              <Icon name="PhoneCall" size={14} /> Связаться
            </Button>
            <button className="md:hidden text-white/70 hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-strong border-t border-white/[0.07] px-6 py-5 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="font-body text-sm text-left text-white/60 hover:text-teal transition-colors">{n.label}</button>
            ))}
            <Button onClick={() => scrollTo('contacts')} className="copper-gradient text-white font-display font-bold uppercase rounded-full border-0">Связаться</Button>
          </div>
        )}
      </header>

      {/* ══ HERO ══ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline poster={HERO_IMG} className="w-full h-full object-cover opacity-38">
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <img src={HERO_IMG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-18 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/48 via-background/58 to-background" />
          <div className="absolute inset-0 tech-grid opacity-30" />
          <div className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] aurora pointer-events-none opacity-22" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-teal mb-8 animate-fade-in">
            Производство полного цикла&nbsp;•&nbsp;Оренбург
          </p>
          <h1 className="font-display font-black leading-none mb-8 animate-scale-in"
            style={{ fontSize: 'clamp(4.5rem, 15vw, 10rem)', letterSpacing: '-0.035em' }}>
            <TypewriterTitle text="МК СЭК" />
          </h1>
          <p className="font-display font-semibold text-white/88 mb-1 animate-fade-in"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>
            Мы производим&nbsp;<span className="shimmer-text">металлоконструкции</span>.
          </p>
          <p className="font-display font-semibold text-white/88 mb-14 animate-fade-in"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>
            Мы строим&nbsp;<span className="shimmer-text">опоры и башни</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button onClick={() => scrollTo('contacts')} size="lg"
              className="copper-gold-gradient text-white font-display font-bold text-[15px] uppercase tracking-widest px-10 py-6 rounded-full glow-copper border-0 hover:scale-[1.04] transition-transform duration-300">
              <Icon name="Send" size={18} className="mr-2" />Запросить проект
            </Button>
            <Button onClick={() => scrollTo('products')} variant="outline" size="lg"
              className="border-white/20 text-white/80 hover:text-white hover:border-white/40 bg-white/5 backdrop-blur font-display font-semibold text-[15px] px-10 py-6 rounded-full transition-all duration-300">
              Каталог продукции
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="scroll-indicator relative h-12 w-px bg-white/20" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">scroll</span>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="relative py-20 px-6 border-y border-white/[0.07] section-alt">
        <div className="max-w-7xl mx-auto">
          <div ref={rStats} className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
            {STATS.map((s) => <Counter key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <Section id="about">
        <div ref={rAbout} className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Tag>О компании</Tag>
            <h2 className="font-display font-black text-white leading-tight mb-7"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              ООО «МК СЭК» —<br />
              <span className="text-gradient-copper">производство</span><br />
              полного цикла
            </h2>
            <p className="text-white/60 text-[17px] leading-relaxed mb-6 font-body">
              Проектируем, изготавливаем и монтируем металлоконструкции и опоры связи по всей России.
              Собственные цеха площадью 2&nbsp;600&nbsp;м², современное оборудование и команда инженеров.
            </p>
            <p className="text-teal font-semibold text-[17px] font-body">Без посредников. С гарантией качества.</p>
            <div className="flex gap-6 mt-10">
              {[['14+', 'лет опыта'], ['500+', 'объектов'], ['40+', 'регионов']].map(([val, lbl], i) => (
                <div key={lbl} className="text-center flex-1">
                  {i > 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-px bg-white/[0.08]" />}
                  <div className="font-display font-black text-3xl text-gradient-copper">{val}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-1">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden service-img">
            <img src={WORKSHOP_IMG} alt="Производственный цех МК СЭК" className="w-full h-[460px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-teal mb-1">МК СЭК</p>
                <p className="font-display font-bold text-white text-lg">Оренбург, ул. Донгузская, 68</p>
              </div>
              <div className="w-12 h-12 rounded-2xl copper-gradient flex items-center justify-center glow-copper">
                <Icon name="Building2" size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ══ CYCLE ══ */}
      <Section id="cycle" className="border-y border-white/[0.07] section-alt">
        <div ref={rCycleH}>
          <Tag>От идеи до объекта</Tag>
          <h2 className="font-display font-black text-white mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Полный цикл производства</h2>
        </div>
        <div ref={rCycleG} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CYCLE.map((step, i) => (
            <div key={step.n}
              className="card-edge card-shine glass-light rounded-2xl p-6 flex flex-col gap-3 cursor-default group border border-white/[0.07]"
              style={{ transitionDelay: `${i * 55}ms` }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[11px] text-copper/60">{step.n}</span>
              </div>
              <Icon name={step.icon} size={26} className="text-teal group-hover:text-copper transition-colors duration-300" />
              <h3 className="font-display font-semibold text-white text-[13px] leading-snug">{step.title}</h3>
              <div className="mt-auto pt-2 w-6 h-px bg-teal/40 group-hover:w-full group-hover:bg-copper/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </Section>

      {/* ══ PRODUCTS ══ */}
      <Section id="products">
        <div ref={rProdH}>
          <Tag>Продукция</Tag>
          <h2 className="font-display font-black text-white mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Каталог изделий</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <div key={p.title}
              className="card-edge group relative rounded-3xl overflow-hidden cursor-default border border-white/[0.07]"
              style={{ background: 'hsla(214,40%,13%,1)', transitionDelay: `${i * 60}ms` }}>
              <div className="h-52 overflow-hidden relative">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1929] via-[#0d1929]/10 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-teal bg-teal/10 rounded-full px-3 py-1 mb-3 border border-teal/20">{p.tag}</span>
                <h3 className="font-display font-bold text-white text-[17px] mb-2 leading-snug">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5 font-body">{p.desc}</p>
                <button className="font-mono text-xs uppercase tracking-widest text-copper flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Подробнее <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ SERVICES ══ */}
      <Section id="services" className="border-y border-white/[0.07] section-alt">
        <div ref={rSvcH}>
          <Tag>Услуги</Tag>
          <h2 className="font-display font-black text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Технологическая цепочка</h2>
          <p className="text-white/50 mb-14 max-w-2xl text-[16px] font-body">
            Акцент на <span className="text-teal font-medium">плазменной резке с ЧПУ</span> и <span className="text-teal font-medium">лазерной очистке металла</span> — бесконтактно, экологично, идеальная адгезия.
          </p>
        </div>
        <div className="grid md:grid-cols-[260px_1fr] gap-5">
          <div className="flex flex-col gap-2">
            {SERVICES.map((s, i) => (
              <button key={s.label} onMouseEnter={() => setActiveSvc(i)}
                className={`text-left px-4 py-3.5 rounded-xl font-display font-semibold text-[13px] transition-all duration-250 ${activeSvc === i ? 'copper-gradient text-white shadow-lg glow-copper' : 'glass-light text-white/55 hover:text-white/85 border border-white/[0.06]'}`}>
                <span className="font-mono text-[10px] mr-2 opacity-60">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            ))}
          </div>
          <div className="glass-light gradient-ring rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[320px] border border-white/[0.08]">
            <div className="md:w-2/5 h-52 md:h-auto overflow-hidden relative">
              <img src={SERVICES[activeSvc].img} alt={SERVICES[activeSvc].label}
                key={activeSvc}
                className="w-full h-full object-cover"
                style={{ animation: 'scale-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsla(214,40%,15%,0.5)]" />
            </div>
            <div className="p-9 flex flex-col justify-center flex-1">
              <div className="font-mono text-[11px] uppercase tracking-widest text-teal mb-4">
                {String(activeSvc + 1).padStart(2, '0')} / 08
              </div>
              <h3 className="font-display font-black text-white text-3xl mb-4">{SERVICES[activeSvc].label}</h3>
              <p className="text-white/60 text-[16px] leading-relaxed font-body">{SERVICES[activeSvc].detail}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ══ TEAM ══ */}
      <Section id="team">
        <div ref={rTeamH}>
          <Tag>Руководство</Tag>
          <h2 className="font-display font-black text-white mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Команда</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m, i) => (
            <div key={m.name}
              onMouseEnter={() => setFlipped(i)} onMouseLeave={() => setFlipped(null)}
              className="relative h-72 [perspective:1200px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
                style={{ transform: flipped === i ? 'rotateY(180deg)' : '' }}>
                <div className="absolute inset-0 glass-light rounded-3xl overflow-hidden flex flex-col [backface-visibility:hidden] border border-white/[0.08]">
                  <div className="flex-1 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${m.color}22, ${m.color}08)` }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center font-display font-black text-2xl text-white shadow-xl"
                      style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`, boxShadow: `0 8px 32px ${m.color}55` }}>
                      {m.initials}
                    </div>
                  </div>
                  <div className="p-5 border-t border-white/[0.07]">
                    <p className="font-display font-bold text-white text-[15px] leading-tight">{m.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-teal mt-1">{m.role}</p>
                  </div>
                </div>
                <div className="absolute inset-0 glass-light rounded-3xl p-7 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] border border-white/[0.08]"
                  style={{ boxShadow: `0 0 40px ${m.color}33` }}>
                  <Icon name="Quote" size={28} className="mb-4 opacity-60" style={{ color: m.color } as React.CSSProperties} />
                  <p className="text-white/90 font-body italic text-[14px] leading-relaxed">«{m.quote}»</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-teal/80 mt-4">{m.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ TECH CONTROL ══ */}
      <Section id="control" className="border-y border-white/[0.07] section-alt">
        <div ref={rCtrlH}>
          <Tag>Технический контроль</Tag>
          <h2 className="font-display font-black text-white mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Качество на каждом этапе</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {CONTROL.map((c, i) => (
            <div key={c.title} onMouseEnter={() => setActiveCtrl(i)}
              className={`card-edge glass-light rounded-2xl p-6 cursor-default transition-all duration-350 border ${activeCtrl === i ? 'border-teal/40 glow-teal scale-[1.04]' : 'border-white/[0.07]'}`}>
              <div className="font-mono text-[10px] text-copper mb-3">0{i + 1}</div>
              <Icon name={c.icon} size={26}
                className={`mb-4 transition-colors duration-300 ${activeCtrl === i ? 'text-copper' : 'text-teal'}`} />
              <h3 className="font-display font-bold text-white text-[14px] mb-2">{c.title}</h3>
              <p className="text-white/45 text-xs leading-relaxed font-body">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ TRANSPORT ══ */}
      <Section id="transport">
        <div ref={rTransH}>
          <Tag>Транспортный отдел</Tag>
          <h2 className="font-display font-black text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Своя техника</h2>
          <p className="text-white/50 mb-16 max-w-2xl text-[16px] font-body">
            Допуски Ростехнадзора. Многолетний опыт работы с крупнейшими операторами связи и промышленными предприятиями. Доставка по всей России.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRANSPORT.map((t, i) => (
            <div key={t.title}
              className="card-edge card-shine glass-light rounded-2xl p-8 group cursor-default border border-white/[0.07]"
              style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="w-14 h-14 rounded-2xl copper-gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-350">
                <Icon name={t.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-[17px] mb-2">{t.title}</h3>
              <p className="text-white/50 text-sm font-body">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ VIDEO ══ */}
      <Section id="video" className="border-y border-white/[0.07] section-alt">
        <div ref={rVideoH}>
          <Tag>Видео о производстве</Tag>
          <h2 className="font-display font-black text-white mb-10"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Полный цикл —<br />
            <span className="text-gradient-copper">от чертежа до объекта</span>
          </h2>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl">
          <div className="aspect-video">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/ScMzIvxBSi4"
              title="МК СЭК — производство металлоконструкций"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
        </div>
        <p className="mt-8 text-white/50 text-[16px] max-w-2xl leading-relaxed font-body">
          Посмотрите, как мы создаём металлоконструкции для телекоммуникаций и промышленности по всей России.
          <span className="text-teal font-medium"> Без посредников. С гарантией качества.</span>
        </p>
      </Section>

      {/* ══ CLIENTS ══ */}
      <Section className="!py-20">
        <div ref={rCliH}>
          <Tag>Клиенты и проекты</Tag>
          <h2 className="font-display font-black text-white mb-10"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>Нам доверяют</h2>
        </div>
        <div className="marquee-wrap overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}>
          <div className="marquee-track flex gap-4 w-max">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i}
                className="glass-light rounded-2xl px-8 py-5 font-display font-semibold text-lg text-white/50 hover:text-white whitespace-nowrap transition-all duration-300 cursor-default border border-white/[0.07] hover:border-copper/30 hover:text-white">
                {c}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ GALLERY ══ */}
      <Section id="gallery" className="border-y border-white/[0.07] section-alt">
        <div ref={rGalH}>
          <Tag>Фотогалерея</Tag>
          <h2 className="font-display font-black text-white mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Производство в деталях</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY.map((g, i) => (
            <div key={i}
              className="relative rounded-2xl overflow-hidden break-inside-avoid group cursor-zoom-in border border-white/[0.06]">
              <img src={g.src} alt={`Производство МК СЭК — ${i + 1}`}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.07] ${g.tall ? 'h-80' : 'h-56'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                <span className="font-mono text-[10px] uppercase tracking-widest text-teal">МК СЭК</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ CONTACTS ══ */}
      <Section id="contacts">
        <div ref={rContacts} className="grid lg:grid-cols-2 gap-16">
          <div>
            <Tag>Контакты</Tag>
            <a href="tel:88001015600"
              className="font-display font-black shimmer-text block mb-7 whitespace-nowrap leading-tight hover:opacity-90 transition-opacity"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
              8 (800) 101-56-00
            </a>
            <div className="space-y-4 text-[16px] mb-8">
              <a href="mailto:mkske@mkske.ru"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors duration-250 group font-body">
                <span className="w-11 h-11 rounded-xl glass-light flex items-center justify-center shrink-0 border border-white/[0.07] group-hover:border-teal/40 transition-colors">
                  <Icon name="Mail" size={18} className="text-teal" />
                </span>
                mkske@mkske.ru
              </a>
              <div className="flex items-center gap-4 text-white/60 font-body">
                <span className="w-11 h-11 rounded-xl glass-light flex items-center justify-center shrink-0 border border-white/[0.07]">
                  <Icon name="MapPin" size={18} className="text-teal" />
                </span>
                Оренбург, ул. Донгузская, 68
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="https://t.me/mkske" target="_blank" rel="noreferrer">
                <Button variant="outline"
                  className="border-white/15 text-white/70 hover:text-white hover:border-teal/50 hover:bg-teal/8 rounded-full gap-2 transition-all duration-250 font-body">
                  <Icon name="Send" size={16} className="text-teal" /> Telegram
                </Button>
              </a>
              <a href="https://max.ru" target="_blank" rel="noreferrer">
                <Button variant="outline"
                  className="border-white/15 text-white/70 hover:text-white hover:border-copper/50 hover:bg-copper/8 rounded-full gap-2 transition-all duration-250 font-body">
                  <Icon name="MessageSquare" size={16} className="text-copper" /> MAX
                </Button>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'ShieldCheck',      text: 'Гарантия качества' },
                { icon: 'Clock',            text: 'Быстрые сроки'     },
                { icon: 'BadgeDollarSign',  text: 'Честная цена'      },
                { icon: 'Truck',            text: 'Доставка по РФ'    },
              ].map((f) => (
                <div key={f.text} className="glass-light rounded-xl px-4 py-3 flex items-center gap-3 border border-white/[0.07]">
                  <Icon name={f.icon} size={16} className="text-teal shrink-0" />
                  <span className="text-white/65 text-sm font-body">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="glass-strong rounded-3xl p-8 space-y-4 border border-white/[0.08]"
            onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-display font-bold text-white text-2xl mb-1">Запросить проект</h3>
            <p className="text-white/40 text-sm mb-4 font-body">Ответим в течение 1 рабочего дня</p>
            {[['Ваше имя', 'text'], ['Телефон', 'tel'], ['Компания', 'text']].map(([ph, type]) => (
              <input key={ph} placeholder={ph} type={type}
                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 font-body outline-none focus:ring-1 ring-copper/60 focus:border-copper/40 transition-all duration-200" />
            ))}
            <textarea placeholder="Опишите задачу" rows={4}
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 font-body outline-none focus:ring-1 ring-copper/60 focus:border-copper/40 transition-all duration-200 resize-none" />
            <label className="flex items-center gap-3 text-sm text-white/40 cursor-pointer hover:text-white/70 transition-colors duration-200 group font-body">
              <span className="w-11 h-11 rounded-xl glass-light flex items-center justify-center shrink-0 border border-white/[0.07] group-hover:border-teal/40 transition-colors">
                <Icon name="Paperclip" size={16} className="text-teal" />
              </span>
              Прикрепить чертежи (PDF, DWG, DXF)
              <input type="file" accept=".pdf,.dwg,.dxf" className="hidden" />
            </label>
            <Button type="submit"
              className="w-full copper-gold-gradient text-white font-display font-bold text-[15px] uppercase tracking-widest py-6 rounded-full border-0 hover:scale-[1.02] transition-transform duration-300 glow-copper">
              Отправить заявку
            </Button>
          </form>
        </div>
      </Section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/[0.07] py-14 px-6"
        style={{ background: 'linear-gradient(180deg, hsla(214,40%,11%,0.95), hsl(216,45%,7%))' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="font-display font-black text-2xl mb-4 tracking-tight">
              <span className="text-white">МК</span>
              <span style={{ color: 'hsl(22,90%,60%)', textShadow: '0 0 20px hsla(22,90%,52%,0.5)' }}>&nbsp;СЭК</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed font-body max-w-[220px]">
              Производство металлоконструкций<br />полного цикла. Оренбург.
            </p>
          </div>
          <div className="flex flex-wrap gap-14 text-sm">
            <div className="space-y-2.5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Навигация</p>
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  className="block text-white/45 hover:text-teal transition-colors duration-200 font-body hover-underline">{n.label}</button>
              ))}
            </div>
            <div className="space-y-2.5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Контакты</p>
              <p className="text-white/45 font-body">8 (800) 101-56-00</p>
              <p className="text-white/45 font-body">mkske@mkske.ru</p>
              <p className="text-white/45 font-body">ул. Донгузская, 68</p>
            </div>
            <div className="space-y-2.5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Реквизиты</p>
              <p className="text-white/45 font-body">ООО «МК СЭК»</p>
              <p className="text-white/45 font-body">г. Оренбург</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/25">© 2026 ООО «МК СЭК»</span>
          <span className="font-mono text-[11px] uppercase tracking-widest"
            style={{ color: 'hsl(22,90%,52%)', opacity: 0.7 }}>Сделано в России</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
