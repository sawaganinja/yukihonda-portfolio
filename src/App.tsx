import { useEffect, useState } from 'react'
import './index.css'

/* ── Types ───────────────────────────────── */
type Filter = 'all' | 'wet-plate' | 'portrait' | 'film-digital'

interface WorkItem {
  id: number
  title: string
  category: Filter
  bg?: string      // placeholder gradient
  src?: string     // actual image path
  height: string   // aspect simulation
  labelEn: string
}

/* ── Works data ── */
const WORKS: WorkItem[] = [
  { id:101, title:'まどにうつす', category:'wet-plate', src:'/images/works/ohara-landscape.jpg', height:'380px', labelEn:'8×10 Wet Plate (2022)' },
  { id:102, title:'Boy on Tatami', category:'portrait', src:'/images/works/boy-portrait.jpg', height:'420px', labelEn:'Portrait' },
  { id:103, title:'Skateboard', category:'wet-plate', src:'/images/works/skateboard.jpg', height:'380px', labelEn:'Wet Plate' },
  { id:2, title:'Portrait of an Artist', category:'wet-plate', src:'/images/works/work4.jpg', height:'420px', labelEn:'Wet Plate' },
  { id:3, title:'Forest Portrait', category:'film-digital', src:'/images/works/work13.jpg', height:'400px', labelEn:'Film / Digital' },
  { id:4, title:'Kyoto Street', category:'wet-plate', src:'/images/works/work1.jpg', height:'380px', labelEn:'8×10 Wet Plate (2025)' },
  { id:201, title:'Family Record', category:'film-digital', src:'/images/works/family-silhouette.jpg', height:'360px', labelEn:'Film / Digital' },
  { id:5, title:'Boy in a Field', category:'portrait', src:'/images/works/work11.jpg', height:'380px', labelEn:'Portrait' },
  { id:6, title:'Landscape Study', category:'wet-plate', src:'/images/works/work2.jpg', height:'380px', labelEn:'8×10 Wet Plate (2025)' },
  { id:202, title:'Family Record', category:'film-digital', src:'/images/works/family-onbu.jpg', height:'380px', labelEn:'Film / Digital' },
  { id:11, title:'Portrait of a Boy', category:'portrait', src:'/images/works/work6.jpg', height:'400px', labelEn:'8×10 Wet Plate (2025)' },
  { id:8, title:'Canal and Bridge', category:'wet-plate', src:'/images/works/work7.jpg', height:'360px', labelEn:'8×10 Wet Plate (2025)' },
  { id:9, title:'Modernity', category:'wet-plate', src:'/images/works/work3.jpg', height:'380px', labelEn:'8×10 Wet Plate (2025)' },
  { id:203, title:'Family Record', category:'film-digital', src:'/images/works/family-baby.jpg', height:'380px', labelEn:'Film / Digital' },
  { id:10, title:'In the Field', category:'film-digital', src:'/images/works/work15.jpg', height:'360px', labelEn:'Film / Digital' },

  { id:12, title:'Garden Elements', category:'wet-plate', src:'/images/works/work5.jpg', height:'380px', labelEn:'8×10 Wet Plate (2025)' },
  { id:13, title:'Workspace', category:'wet-plate', src:'/images/works/work8.jpg', height:'380px', labelEn:'8×10 Wet Plate (2025)' },
  { id:204, title:'Family Record', category:'film-digital', src:'/images/works/family-water.jpg', height:'380px', labelEn:'Film / Digital' },
  { id:14, title:'Portrait of a Girl', category:'wet-plate', src:'/images/works/work9.jpg', height:'420px', labelEn:'8×10 Wet Plate (2025)' },
  { id:205, title:'Family Record', category:'film-digital', src:'/images/works/family-look.jpg', height:'380px', labelEn:'Film / Digital' },
  { id:15, title:'Village Road', category:'wet-plate', src:'/images/works/work10.jpg', height:'380px', labelEn:'8×10 Wet Plate (2025)' },
  { id:206, title:'Family Record', category:'film-digital', src:'/images/works/family-picnic.jpg', height:'460px', labelEn:'Film / Digital' },
]

// const FILTERS: { key: Filter; label: string }[] = [
//   { key: 'all',          label: 'All Works' },
//   { key: 'wet-plate',    label: 'Wet Plate' },
//   { key: 'portrait',     label: 'Portrait' },
//   { key: 'film-digital', label: 'Film / Digital' },
// ]

/* ── Theme hook ──────────────────────────── */
function useTheme() {
  const [theme, setTheme] = useState<'dark'|'light'>('light')
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return { theme, toggle }
}

/* ── Nav ─────────────────────────────────── */
function Nav({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const close = () => setOpen(false)
  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#top" className="nav__logo" onClick={close}>
            <img src="/logo.png" alt="蟹と狼.art ロゴ" style={{ height: '32px', width: 'auto' }} />
            <span className="nav__logo-text" style={{ display: 'none' }}>蟹と狼<span>.art</span></span>
          </a>
          <div className="nav__right">
            <div className="nav__links">
              <a href="#services">Services</a>
              <a href="#works">Works</a>
              <a href="#projects">Projects</a>
              <a href="#about">About</a>
              <a href="#contact" className="nav__contact-btn">Contact</a>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="テーマ切替">
              {theme === 'dark' ? '☀' : '☽'}
            </button>
            <button className="nav__hamburger" aria-label="メニュー" aria-expanded={open}
              onClick={() => setOpen(v => !v)}>
              <span style={open ? { transform:'rotate(45deg) translate(4px,4px)' } : {}} />
              <span style={open ? { opacity:0 } : {}} />
              <span style={open ? { transform:'rotate(-45deg) translate(4px,-4px)' } : {}} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`nav__mobile${open ? ' open' : ''}`}>
        <a href="#services"  onClick={close}>Services</a>
        <a href="#works"     onClick={close}>Works</a>
        <a href="#projects"  onClick={close}>Projects</a>
        <a href="#about"     onClick={close}>About</a>
        <a href="#contact"   onClick={close}>Contact</a>
        <button className="theme-toggle" onClick={() => { toggleTheme(); close() }}>
          {theme === 'dark' ? '☀ Light' : '☽ Dark'}
        </button>
      </div>
    </>
  )
}

/* ── Hero ────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__bg-img" />
      <div className="hero__overlay" />
      <div className="hero__grid" />
      <div className="hero__content">
        <p className="hero__eyebrow">寫眞家 / Photographer</p>
        <h1 className="hero__title">Yuuki<br /><em>Honda</em></h1>
      </div>
      <div className="hero__scroll" aria-hidden="true">Scroll</div>
    </section>
  )
}

/* ── Services ────────────────────────────── */
function Services({ onViewWork }: { onViewWork: (f: Filter) => void }) {
  const goto = (f: Filter) => {
    onViewWork(f)
    setTimeout(() => {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <section id="services" className="services section-pad">
      <div className="container">
        <p className="section-label">Services / 撮影依頼</p>
        <h2 style={{ fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:300 }}>
          Portraits through<br />
          <em style={{ fontStyle:'italic', color:'var(--rust-red)' }}>chemistry &amp; light</em>
        </h2>

        <div className="services__grid">
          {/* Wide: Executive Portrait */}
          <div className="service-card service-card--wide">
            <div>
              <div className="service-card__num">01</div>
              <h3 className="service-card__title">Executive Portrait</h3>
              <p className="service-card__sub">起業家・経営者向けポートレート</p>
              <p className="service-card__desc">
                デジタル・湿板を問わず、事前の深い対話（ディレクション）を通じて対象者の「哲学・生き様」を引き出す高単価なポートレート撮影。
              </p>
              <div className="service-card__tags">
                <span className="service-tag">Executive</span>
                <span className="service-tag">Direction</span>
                <span className="service-tag">Wet-plate / Digital</span>
              </div>
              <button className="view-work-link" onClick={() => goto('portrait')}>
                View Portrait Work →
              </button>
            </div>
            <div className="service-card__right">
              <div className="menu-box">
                <p className="menu-box__label">Executive メニュー</p>
                {[
                  { name:'Standard Session', note:'デジタルデータ納品', price:'¥70,000〜' },
                  { name:'Wet Plate Session', note:'湿板写真による一点制作', price:'¥90,000〜' },
                  { name:'Pixelplate', note:'デジタル＆アナログのハイブリッド', badge:true, price:'¥50,000〜' },
                ].map(item => (
                  <div className="menu-row" key={item.name}>
                    <div>
                      <p className="menu-row__name">
                        {item.name}
                        {item.badge && <span className="badge-new">NEW</span>}
                      </p>
                      <p className="menu-row__note">{item.note}</p>
                    </div>
                    <p className="menu-row__price">{item.price}</p>
                  </div>
                ))}
                <p className="menu-note">
                  ※ 日程、料金の詳細などはフォームよりご連絡ください。<br />
                  撮影会・出張等も承ります。
                </p>
              </div>
            </div>
          </div>

          {/* Premium Anniversary */}
          <div className="service-card">
            <div className="service-card__num">02</div>
            <h3 className="service-card__title">Premium Anniversary</h3>
            <p className="service-card__sub" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>家族・記念ロケーション撮影</span>
              <span style={{ color: 'var(--rust-red)' }}>¥60,000〜</span>
            </p>
            <p className="service-card__desc">
              ご希望のロケーション（お寺や神社など）での記念撮影。（七五三、成人式、ウェディングなど）<br />
              デジタルまたは湿板写真で撮影。
            </p>
            <div className="service-card__tags">
              <span className="service-tag">Family / Anniversary</span>
              <span className="service-tag">Location</span>
            </div>
            <button className="view-work-link" onClick={() => goto('all')}>
              View Work →
            </button>
          </div>

          {/* Events → SNS */}
          <div className="service-card" style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div className="service-card__num">03</div>
            <h3 className="service-card__title" style={{ marginBottom: '0.2rem' }}>Special Event</h3>
            <p className="service-card__sub" style={{ color: 'var(--rust-red)', marginBottom: '1.5rem' }}>撮影会・ポップアップ</p>
            <p className="service-card__desc" style={{ marginBottom:'1.5rem' }}>
              不定期開催の撮影会・ポップアップイベントの情報は Instagram にてご案内します。
            </p>
            <a href="https://www.instagram.com/honda_yuuki_photo/" target="_blank" rel="noopener noreferrer"
              style={{
                display:'inline-block', fontSize:'.7rem', letterSpacing:'.12em',
                textTransform:'uppercase', border:'1px solid var(--border-hov)',
                padding:'.5rem 1.1rem', borderRadius:'2px', color:'var(--text-dim)', transition:'color .2s,border-color .2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color='var(--text)'; (e.currentTarget as HTMLAnchorElement).style.borderColor='var(--rust-red)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color='var(--text-dim)'; (e.currentTarget as HTMLAnchorElement).style.borderColor='var(--border-hov)' }}
            >Follow on Instagram →</a>
          </div>

          {/* Wet Plate Support */}
          <div className="service-card service-card--wide">
            <div>
              <div className="service-card__num">04</div>
              <h3 className="service-card__title">Wet Plate Support</h3>
              <p className="service-card__sub">湿板写真の導入・制作コンサルティング</p>
              <p className="service-card__desc">
                国内外の写真家、アーティスト、研究機関向けに、湿板写真を用いたプロジェクトの立ち上げをトータルで伴走・サポートします。撮影や調合の技術指導、独自の表現を追求するための暗室設計や機材選定のアドバイスなど、それぞれのビジョンに合わせた安全な運用をサポートします。<br /><br />
                写真館の新たなメニューとして湿板写真の導入を検討されている方も、お気軽にお問い合わせください。
              </p>
              <div className="service-card__tags">
                <span className="service-tag">B2B</span>
                <span className="service-tag">Support</span>
              </div>
            </div>
            <div className="service-card__right">
              <div className="menu-box">
                <p className="menu-box__label">サポート メニュー</p>
                {[
                  { name:'初回オンラインセッション', note:'初回1時間の相談を含むセッションを行います。お問い合わせはメールでご連絡ください。', price:'¥5,000' },
                  { name:'プロジェクトサポート', note:'要相談', price:'初回オンラインセッション後にお見積もり' },
                ].map(item => (
                  <div className="menu-row" key={item.name}>
                    <div>
                      <p className="menu-row__name">{item.name}</p>
                      <p className="menu-row__note">{item.note}</p>
                    </div>
                    <p className="menu-row__price">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Works ───────────────────────────────── */
function Works({ activeFilter }: {
  activeFilter: Filter
  setActiveFilter?: (f: Filter) => void
}) {
  const [lightbox, setLightbox] = useState<WorkItem | null>(null)

  // Close lightbox on ESC
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const filtered = activeFilter === 'all'
    ? WORKS
    : WORKS.filter(w => w.category === activeFilter)

  return (
    <section id="works" className="works section-pad">
      <div className="container">
        <p className="section-label">Works / 作品</p>
        <h2 style={{ fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:300, marginBottom:'2.5rem' }}>
          Personal Works
        </h2>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="works__empty">このカテゴリーの作品は近日公開予定です。</p>
        ) : (
          <div className="works__grid">
            {filtered.map(work => (
              <div className="works__item" key={work.id} onClick={() => setLightbox(work)}
                role="button" tabIndex={0} aria-label={work.title}
                onKeyDown={e => e.key === 'Enter' && setLightbox(work)}>
                <div className="works__item-inner">
                  {/* Placeholder div — replace with <img src={work.src} /> when ready */}
                  <div
                    className="works__item-img"
                    style={{ background: work.src ? `url(${work.src}) center/cover no-repeat` : work.bg, height: work.height }}
                  />
                </div>
                <div className="works__item-overlay">
                  <p className="works__item-label">{work.labelEn}</p>
                  <p className="works__item-title">{work.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox__close" onClick={() => setLightbox(null)}>
              Close ✕
            </button>
            {lightbox.src ? (
              <img src={lightbox.src} alt={lightbox.title} style={{ width: '100%', height: '60vh', objectFit: 'contain', borderRadius: '2px', display: 'block', margin: '0 auto' }} />
            ) : (
              <div className="lightbox__ph"
                style={{ background: lightbox.bg, height: '60vh', borderRadius:'2px' }}>
                <span style={{ opacity:.15, fontFamily:'var(--font-serif)', fontSize:'1.2rem' }}>
                  {lightbox.title}
                </span>
              </div>
            )}
            <div className="lightbox__meta">
              <p className="lightbox__meta-label">{lightbox.labelEn}</p>
              <p className="lightbox__meta-title">{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ── Projects ────────────────────────────── */
function ProjectCard({ num, label, title, desc, cls, comingSoon, imgSrc }: {
  num:string; label:string; title:string; desc:string; cls?:string; comingSoon?:boolean; imgSrc?:string
}) {
  return (
    <article className="project-card">
      <div className={`project-card__img ${cls || ''}`} style={imgSrc ? { backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        {!imgSrc && (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
            style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',opacity:.07 }}>
            <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1"/>
            <circle cx="16" cy="24" r="10" stroke="currentColor" strokeWidth="1"/>
            <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="1"/>
          </svg>
        )}
      </div>
      <div className="project-card__overlay">
        <p className="project-card__label">{label}</p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{desc}</p>
      </div>
      {comingSoon && (
        <div style={{ position:'absolute', inset:0, background:'rgba(22, 22, 20, 0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10, backdropFilter:'blur(3px)' }}>
          <span style={{ color:'#fff', border:'1px solid rgba(255,255,255,0.3)', padding:'0.75rem 2rem', letterSpacing:'0.25em', textTransform:'uppercase', fontSize:'0.85rem', fontWeight:400, backgroundColor:'rgba(160, 60, 51, 0.85)' }}>Coming Soon</span>
        </div>
      )}
      <span style={{ position:'absolute',top:'1.2rem',left:'1.2rem',fontSize:'.6rem',color:'rgba(240,237,232,.15)',letterSpacing:'.1em' }}>{num}</span>
    </article>
  )
}

function Projects() {
  return (
    <section id="projects" className="projects section-pad">
      <div className="container">
        <div className="projects__header">
          <div>
            <p className="section-label">Projects / 制作・研究</p>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:300 }}>Ongoing Work</h2>
          </div>
          <p>アート・プロダクト——<br />現在進行中のプロジェクト群。</p>
        </div>
        <div className="projects__grid">
          <ProjectCard num="P.01" label="Product / プロダクト" title="Pixelplate" cls="img-ph-1"
            desc="正方形の湿板写真。起業家・経営者のアイデンティティをガラスと金属に焼き付ける、唯一無二のハイエンド商材。" comingSoon />
          <ProjectCard num="P.02" label="Series / シリーズ" title="The Wolf Series"
            desc="「狼」の不在と気配を追いかけるアートワーク。見えざる物語と深い沈黙を写し出すコア作品群。（2023年〜）" imgSrc="/images/wolf/wolf2.jpg" />
          <ProjectCard num="P.03" label="Collaboration / 共同制作" title="Artist Collaboration Series" cls="img-ph-2"
            desc="現代美術作家・小枝繁昭氏のライフワークプロジェクト、108人のポートレートシリーズの一部を湿板写真でご一緒します。表現者同士の対話を通じ、対象の圧倒的な「気配」を湿板写真としてガラスに共同で定着させる試み。（2026年〜）" />
          <ProjectCard num="P.04" label="Archive / アーカイブ" title="まどにうつす"
            desc="取り壊しが決まった地元の古い公民館。かつてそこにあった日常の記憶を、建物の窓ガラスそのものへ湿板写真として定着させ、物質として後世に残すドキュメンタリー・プロジェクト。（2022年）" imgSrc="/images/projects/madoniutsusu.jpg" />
        </div>
      </div>
    </section>
  )
}

/* ── About ───────────────────────────────── */
function About() {
  return (
    <section id="about" className="about section-pad">
      <div className="container">
        <div className="about__inner">
          <div className="about__portrait" style={{ position: 'relative' }}>
            <img src="/images/profile.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              Photo by <a href="https://lightandplace.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Takahiro Wada</a>
            </div>
          </div>
          <div className="about__text">
            <p className="section-label">About / プロフィール</p>
            <img src="/logo.png" alt="蟹と狼.art" className="about__logo" style={{ width: '100px', marginBottom: '1rem' }} />
            <p className="about__title-line" style={{ marginBottom: '.5rem', color: 'var(--rust-red)', letterSpacing: '.1em', fontSize: '.9rem' }}>寫眞家 / Photographer</p>
            <h2 className="about__name">本田 <em style={{ fontStyle:'italic' }}>優生</em></h2>
            <p className="about__bio">
              京都大原を拠点に活動する写真家。デジタル、フィルム、湿板写真を中心に、人・物・記憶の記録を探求する。
              アナログ化学写真の不確かさと、そこに宿る時間の質感に魅力を感じている一方で、ハイテクにも興味があり、ハイブリッドな表現を探求している。
            </p>
            <p className="about__bio">
              経営者・アーティスト向けのポートレート撮影からファミリーフォト、独自のアート作品制作まで、
              写真の可能性を多角的に展開中。プロフォトグラファー歴18年。湿板写真歴8年。
            </p>
            <div className="about__brand">
              <h3 className="about__brand-title">蟹と狼<span style={{ color:'var(--rust-red)' }}>.art</span></h3>
              <p className="about__brand-desc">
                写真家・本田優生が主宰するアトリエの屋号。<br />
                「蟹」は日常の温かみや確かな存在、そこにあるものを発見し記録する喜びを。「狼」はすでに失われた気配や、写真が一枚も残っていないミステリーへの眼差しを意味する。<br />
                身近な記憶を刻むポートレートから、見えざる「不在」を写し出すアートワークまで、二つの視点を交差させながら独自の表現を生み出す場。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact ─────────────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true) }
  return (
    <section id="contact" className="contact section-pad">
      <div className="container">
        <div className="contact__inner">
          <div>
            <p className="section-label">Contact / お問い合わせ</p>
            <h2 className="contact__heading">
              Let's work<br /><em style={{ fontStyle:'italic', color:'var(--rust-red)' }}>together.</em>
            </h2>
            <p className="contact__sub">
              撮影依頼・プロジェクトのご相談など、お気軽にご連絡ください。
              内容を確認の上、2〜3営業日以内にご返信いたします。
            </p>
            <p className="contact__sns-note">
              撮影会・ポップアップの最新情報は各SNSにてご案内しています。
            </p>
          </div>
          <div>
            {sent ? (
              <div className="sent-box">
                <p>Thank you.</p>
                <p>メッセージを受け取りました。<br />近日中にご返信いたします。</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="f-name">お名前 / Name</label>
                  <input id="f-name" type="text" placeholder="Taro Yamada" required />
                </div>
                <div className="form-field">
                  <label htmlFor="f-email">メールアドレス / Email</label>
                  <input id="f-email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="form-field">
                  <label htmlFor="f-type">お問い合わせ種別 / Type</label>
                  <select id="f-type" required defaultValue="">
                    <option value="" disabled>選択してください</option>
                    <option>Standard Session（デジタルポートレート）</option>
                    <option>Wet Plate Session（湿板ポートレート）</option>
                    <option>Pixelplate（デジタル＆アナログ）</option>
                    <option>Premium Anniversary（記念撮影）</option>
                    <option>その他（ご質問・プロジェクト相談等）</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="f-msg">メッセージ / Message</label>
                  <textarea id="f-msg" rows={5}
                    placeholder="ご依頼内容、ご希望の日程、その他ご質問などをご記入ください。" required />
                </div>
                <button type="submit" className="btn-submit">Send Message →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#top" className="footer__logo">
          <img src="/logo.png" alt="" aria-hidden="true" style={{ height: '40px' }} />
          <span className="footer__logo-text" style={{ display: 'none' }}>蟹と狼<span>.art</span></span>
        </a>
        <p className="footer__copy">© 2026 Yuuki Honda. All rights reserved.</p>
        <nav className="footer__social" aria-label="SNSリンク">
          <a href="https://www.instagram.com/honda_yuuki_photo/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://x.com/honyu1983" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          <a href="mailto:contact@yuuki-honda.com">Mail</a>
        </nav>
      </div>
    </footer>
  )
}

/* ── App ─────────────────────────────────── */
export default function App() {
  const { theme, toggle } = useTheme()
  const [worksFilter, setWorksFilter] = useState<Filter>('all')

  return (
    <>
      <Nav theme={theme} toggleTheme={toggle} />
      <main>
        <Hero />
        <Services onViewWork={setWorksFilter} />
        <Works activeFilter={worksFilter} setActiveFilter={setWorksFilter} />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
