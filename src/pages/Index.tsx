import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Counter from '@/components/Counter';
import TypewriterTitle from '@/components/TypewriterTitle';

const HERO_IMG = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/6e053162-b54e-4d95-a71e-60052e88c5f9.jpg';
const WELDER_IMG = 'https://cdn.poehali.dev/projects/64deaa31-29b3-49d1-86a6-bf14986240dd/files/502ceed7-e66e-4af8-8712-6863b8553b3a.jpg';

const NAV = [
  { label: 'Продукция', id: 'products' },
  { label: 'Услуги', id: 'services' },
  { label: 'Цикл', id: 'cycle' },
  { label: 'О нас', id: 'about' },
  { label: 'Контакты', id: 'contacts' },
];

const STATS = [
  { end: 220, suffix: '+', label: 'тонн в месяц' },
  { end: 2600, suffix: ' м²', label: 'площадь цехов' },
  { end: 60, suffix: '+', label: 'единиц техники' },
  { end: 2000, suffix: '+', label: 'изделий в год' },
];

const CYCLE = [
  { n: '01', title: 'Консультация', icon: 'MessagesSquare' },
  { n: '02', title: 'Коммерческое предложение', icon: 'FileText' },
  { n: '03', title: 'Проектирование', icon: 'PencilRuler' },
  { n: '04', title: 'Раскрой и плазменная резка', icon: 'Scissors' },
  { n: '05', title: 'Лазерная очистка', icon: 'Sparkles' },
  { n: '06', title: 'Сварка и мехобработка', icon: 'Flame' },
  { n: '07', title: 'Контроль и сборка', icon: 'ShieldCheck' },
  { n: '08', title: 'Отгрузка и логистика', icon: 'Truck' },
];

const PRODUCTS = [
  { title: 'Опоры', desc: 'Опоры связи любой высоты и нагрузки', icon: 'RadioTower' },
  { title: 'Башни', desc: 'Башни связи и антенно-мачтовые сооружения', icon: 'Antenna' },
  { title: 'Надстройки на СК-26', desc: 'Модульные надстройки на типовые опоры', icon: 'Building2' },
  { title: 'БВЗ и модули', desc: 'Блок-контейнеры и быстровозводимые здания', icon: 'Container' },
  { title: 'ЗДФ, АК', desc: 'Закладные детали фундамента, анкерные корзины', icon: 'Anchor' },
  { title: 'Эстакады', desc: 'Технологические эстакады и металлоконструкции', icon: 'Layers' },
];

const SERVICES = [
  'Проектирование', 'Раскрой', 'Плазменная резка с ЧПУ', 'Лазерная очистка',
  'Мехобработка', 'Сварка', 'Покраска', 'Контроль качества',
];

const TEAM = [
  { name: 'Трофимов Е.П.', role: 'Генеральный директор', quote: 'Мы отвечаем за каждую тонну металла своим именем.' },
  { name: 'Кужамбетов М.О.', role: 'Директор производства', quote: 'Полный цикл — это контроль на каждом этапе.' },
  { name: 'Баимов А.С.', role: 'Инженер по развитию', quote: 'Технологии будущего внедряем уже сегодня.' },
  { name: 'Хаметов М.', role: 'Коммерческий директор', quote: 'Работаем без посредников — честно и напрямую.' },
];

const CLIENTS = ['Антарес', 'ПБК', 'МИГ', 'Квант-Телеком', 'Медиа-Ас', 'Стальтех', 'Связьразвитие'];

const Section = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`relative py-24 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="h-px w-10 bg-teal" />
    <span className="font-mono text-xs uppercase tracking-[0.3em] text-teal">{children}</span>
  </div>
);

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flipped, setFlipped] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-display text-2xl font-bold tracking-wider">
            <span className="text-foreground">МК</span>
            <span className="text-copper" style={{ textShadow: '0 0 16px hsla(22,91%,48%,0.6)' }}> СКЭ</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-teal transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button onClick={() => scrollTo('contacts')}
              className="hidden md:inline-flex copper-gradient text-primary-foreground font-display uppercase tracking-wider pulse-btn border-0">
              Связаться
            </Button>
            <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden glass border-t border-border px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="font-mono text-sm uppercase tracking-widest text-left text-muted-foreground hover:text-teal">
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('contacts')} className="copper-gradient text-primary-foreground font-display uppercase">
              Связаться
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Сварка металлоконструкций" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          <div className="absolute inset-0 tech-grid opacity-60" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-teal mb-6 animate-fade-in">
            Производство полного цикла • Оренбург
          </p>
          <h1 className="font-display text-6xl md:text-9xl font-bold tracking-wider mb-6">
            <TypewriterTitle text="МК СКЭ" />
          </h1>
          <p className="font-display text-xl md:text-3xl uppercase tracking-wide text-foreground/90 mb-2">
            Мы производим <span className="text-gradient-copper relative inline-block">металлоконструкции</span>.
          </p>
          <p className="font-display text-xl md:text-3xl uppercase tracking-wide text-foreground/90 mb-10">
            Мы строим <span className="text-gradient-copper">опоры</span>.
          </p>
          <Button onClick={() => scrollTo('contacts')} size="lg"
            className="copper-gold-gradient text-primary-foreground font-display text-lg uppercase tracking-widest px-10 py-6 glow-copper border-0 hover:scale-105 transition-transform">
            <Icon name="Send" size={20} className="mr-2" />
            Запросить проект
          </Button>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="scroll-indicator relative h-12 w-px bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">scroll</span>
        </div>
      </section>

      {/* STATS */}
      <Section className="border-y border-border bg-card/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s) => <Counter key={s.label} {...s} />)}
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about">
        <div className="max-w-4xl">
          <Label>О компании</Label>
          <p className="font-display text-3xl md:text-5xl leading-tight uppercase tracking-wide">
            ООО «МК СКЭ» — <span className="text-copper">производство полного цикла</span> в Оренбурге.
          </p>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Проектируем, изготавливаем и монтируем металлоконструкции для связи по всей России.
            Собственные цеха, современное оборудование и команда инженеров. <span className="text-teal font-medium">Без посредников.</span>
          </p>
        </div>
      </Section>

      {/* CYCLE — главная фишка */}
      <Section id="cycle" className="bg-card/30 border-y border-border">
        <Label>От идеи до объекта</Label>
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-12">Полный цикл производства</h2>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div className="relative rounded-lg overflow-hidden card-shine">
            <img src={WELDER_IMG} alt="Сварщик за работой" className="w-full h-full object-cover min-h-[400px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-xs uppercase tracking-widest text-teal">Мастерство в каждом шве</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {CYCLE.map((step) => (
              <div key={step.n}
                className="card-edge card-shine glass rounded-lg p-5 flex items-start gap-4 cursor-default">
                <div className="font-display text-2xl font-bold text-copper/40">{step.n}</div>
                <div>
                  <Icon name={step.icon} size={22} className="text-teal mb-2" />
                  <h3 className="font-display uppercase tracking-wide text-base">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section id="products">
        <Label>Продукция</Label>
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-12">Каталог изделий</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.title} className="card-edge card-shine glass rounded-lg p-8 group cursor-default">
              <div className="w-14 h-14 rounded-lg copper-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon name={p.icon} size={26} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wide mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
              <button className="font-mono text-xs uppercase tracking-widest text-teal flex items-center gap-2 hover:gap-3 transition-all">
                Подробнее <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="bg-card/30 border-y border-border">
        <Label>Услуги</Label>
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-4">Технологическая цепочка</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Акцент на <span className="text-teal">плазменной резке с ЧПУ</span> и <span className="text-teal">лазерной очистке металла</span> — бесконтактно и экологично.
        </p>
        <div className="flex flex-wrap gap-4">
          {SERVICES.map((s, i) => (
            <div key={s} className="card-edge glass rounded-full px-6 py-3 flex items-center gap-3 cursor-default">
              <span className="font-mono text-xs text-copper">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display uppercase tracking-wide text-sm">{s}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section id="team">
        <Label>Руководство</Label>
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-12">Команда</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m, i) => (
            <div key={m.name} onMouseEnter={() => setFlipped(i)} onMouseLeave={() => setFlipped(null)}
              className="relative h-64 [perspective:1000px] cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
                style={{ transform: flipped === i ? 'rotateY(180deg)' : '' }}>
                <div className="absolute inset-0 glass rounded-lg p-6 flex flex-col justify-end [backface-visibility:hidden]">
                  <div className="w-16 h-16 rounded-full copper-gradient flex items-center justify-center mb-4">
                    <Icon name="User" size={28} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wide">{m.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-teal mt-1">{m.role}</p>
                </div>
                <div className="absolute inset-0 glass rounded-lg p-6 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)] glow-teal">
                  <Icon name="Quote" size={28} className="text-copper mb-4" />
                  <p className="text-foreground/90 italic">«{m.quote}»</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CLIENTS */}
      <Section className="bg-card/30 border-y border-border">
        <Label>Клиенты и проекты</Label>
        <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4">Нам доверяют</h2>
        <p className="text-muted-foreground mb-10">Допуски Ростехнадзора. Работаем с <span className="text-gold">ГАЗПРОМ</span> и <span className="text-gold">РОСНЕФТЬ</span>.</p>
        <div className="flex flex-wrap gap-4">
          {CLIENTS.map((c) => (
            <div key={c} className="glass rounded-lg px-6 py-4 font-display text-xl uppercase tracking-wide text-muted-foreground hover:text-foreground hover:border-teal transition-colors">
              {c}
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Label>Контакты</Label>
            <a href="tel:88001015600" className="font-display text-4xl md:text-6xl font-bold text-gradient-copper block mb-8">
              8 (800) 101-56-00
            </a>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-4"><Icon name="Mail" size={22} className="text-teal" /> mkske@mkske.ru</div>
              <div className="flex items-center gap-4"><Icon name="MapPin" size={22} className="text-teal" /> Оренбург, ул. Донгузская, 68</div>
            </div>
            <div className="flex gap-4 mt-8">
              <Button variant="outline" className="border-teal/40 text-foreground hover:bg-teal/10">
                <Icon name="MessageCircle" size={18} className="mr-2 text-teal" /> WhatsApp
              </Button>
              <Button variant="outline" className="border-teal/40 text-foreground hover:bg-teal/10">
                <Icon name="Send" size={18} className="mr-2 text-teal" /> Telegram
              </Button>
            </div>
          </div>
          <form className="glass rounded-lg p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-display text-2xl uppercase tracking-wide mb-2">Запросить проект</h3>
            <input placeholder="Ваше имя" className="w-full bg-input rounded px-4 py-3 outline-none focus:ring-1 ring-copper" />
            <input placeholder="Телефон" className="w-full bg-input rounded px-4 py-3 outline-none focus:ring-1 ring-copper" />
            <textarea placeholder="Опишите задачу" rows={4} className="w-full bg-input rounded px-4 py-3 outline-none focus:ring-1 ring-copper resize-none" />
            <Button className="w-full copper-gold-gradient text-primary-foreground font-display uppercase tracking-widest py-6 border-0 hover:scale-[1.02] transition-transform">
              Отправить заявку
            </Button>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-display text-2xl font-bold tracking-wider mb-3">
              <span className="text-foreground">МК</span><span className="text-copper"> СКЭ</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">Производство металлоконструкций полного цикла. Оренбург.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-2">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="block text-muted-foreground hover:text-teal transition-colors">{n.label}</button>
              ))}
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p>8 (800) 101-56-00</p>
              <p>mkske@mkske.ru</p>
              <p>ул. Донгузская, 68</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>© 2026 ООО «МК СКЭ»</span>
          <span className="text-copper">Сделано в России</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
