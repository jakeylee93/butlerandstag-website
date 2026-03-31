'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Phone, Mail, MapPin, Home, Key, TrendingUp, Users, Award, Star, ChevronRight, ChevronLeft, Menu, X, Building2, ClipboardCheck, Camera, Ruler, BarChart3, ShieldCheck, Heart, Clock, Briefcase, Hammer, FileText } from 'lucide-react'

/* ─── Data ─── */
const OFFICES = [
  { name: 'Bow', phone: '020 8981 6611', area: 'East London' },
  { name: 'Theydon Bois', phone: '01992 676 868', area: 'Essex' },
  { name: 'Chingford', phone: '020 8523 0523', area: 'East London' },
  { name: 'Buckhurst Hill', phone: '020 8505 5555', area: 'Essex' },
]

const SERVICES = [
  { icon: Home, label: 'Residential Sales' },
  { icon: Key, label: 'Lettings' },
  { icon: Building2, label: 'New Homes' },
  { icon: TrendingUp, label: 'Property Valuations' },
  { icon: Camera, label: 'Professional Photography' },
  { icon: Ruler, label: 'Floor Plans' },
  { icon: BarChart3, label: 'Market Appraisals' },
  { icon: Users, label: 'Property Management' },
  { icon: ClipboardCheck, label: 'Tenant Referencing' },
  { icon: ShieldCheck, label: 'Compliance & Safety' },
  { icon: FileText, label: 'EPC Certificates' },
  { icon: Briefcase, label: 'Investment Advice' },
  { icon: Heart, label: 'Relocation Services' },
  { icon: Clock, label: 'Out-of-Hours Viewings' },
  { icon: Hammer, label: 'Refurbishment Advice' },
  { icon: Users, label: 'Block Management' },
]

const AREAS = [
  { name: 'Bow', avg: '£485,000', yoy: '+4.2%' },
  { name: 'Chingford', avg: '£520,000', yoy: '+3.8%' },
  { name: 'Theydon Bois', avg: '£725,000', yoy: '+5.1%' },
  { name: 'Buckhurst Hill', avg: '£680,000', yoy: '+4.5%' },
  { name: 'Chelmsford', avg: '£395,000', yoy: '+3.2%' },
  { name: 'Wanstead', avg: '£610,000', yoy: '+3.9%' },
]

const TESTIMONIALS = [
  { name: 'Sarah M.', text: 'Butler & Stag made selling our family home completely stress-free. Professional, responsive, and genuinely cared about finding the right buyer.', area: 'Chingford', stars: 5 },
  { name: 'James T.', text: 'Fantastic service from start to finish. They achieved above asking price within two weeks. Cannot recommend highly enough.', area: 'Buckhurst Hill', stars: 5 },
  { name: 'Rachel & Tom', text: 'As first-time buyers, we were nervous about the whole process. The team held our hand every step of the way. Incredible people.', area: 'Bow', stars: 5 },
  { name: 'David P.', text: 'Switched from a corporate agent to Butler & Stag — best decision we made. Sold in 10 days, above asking. Legends.', area: 'Theydon Bois', stars: 5 },
]

const PROPERTIES = [
  { price: '£525,000', beds: 3, type: 'Semi-Detached House', area: 'Chingford', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', tag: 'Just Listed' },
  { price: '£385,000', beds: 2, type: 'Victorian Terrace', area: 'Bow', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', tag: 'Price Reduced' },
  { price: '£750,000', beds: 4, type: 'Detached Family Home', area: 'Theydon Bois', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', tag: 'Featured' },
]

const STATS = [
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '', label: 'Local Offices' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 2500, suffix: '+', label: 'Properties Sold' },
]

/* ─── Animated Counter ─── */
function AnimCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) { setStarted(true) }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return (
    <div ref={ref} className="text-3xl md:text-5xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>
      {count.toLocaleString()}{suffix}
    </div>
  )
}

const NEWS_TICKER = [
  '📈 Theydon Bois: Average prices up 5.1% year-on-year — now £725,000',
  '🏠 JUST LISTED: 4 bed detached in Chigwell, £895,000 — call for viewings',
  '📊 Epping Forest district sees highest demand since 2021',
  '🔑 SOLD: 3 bed semi in Buckhurst Hill — achieved above asking price',
  '📰 Bank of England holds rates — mortgage applications up 12% this month',
  '🏡 Chigwell named one of Essex\'s most desirable postcodes for 2026',
  '📈 Loughton: New build completions drive 8% increase in local transactions',
  '🔑 JUST LET: Luxury 2 bed apartment, Theydon Bois — let within 48 hours',
]

const SERVICE_DETAILS: Record<string, string> = {
  'Residential Sales': 'From valuation to completion, we manage the entire sales process. Our local expertise and proactive approach means we achieve the best possible price for your property, with an average of 98% of asking price achieved.',
  'Lettings': 'Full lettings management including tenant finding, referencing, inventory, and ongoing property management. We handle everything so you don\'t have to — from marketing to move-in day.',
  'New Homes': 'Working with developers across East London and Essex to market and sell new build properties. We provide full sales and marketing packages tailored to each development.',
  'Property Valuations': 'Free, no-obligation market appraisals from our local experts. We use comparable sales data, current market conditions, and our in-depth local knowledge to give you an accurate valuation.',
  'Professional Photography': 'HDR photography, drone footage, and virtual tours that showcase your property at its absolute best. First impressions matter — we make sure yours is stunning.',
  'Floor Plans': 'Detailed, professionally drawn floor plans that give buyers a clear understanding of your property\'s layout and proportions. Essential for online listings.',
  'Market Appraisals': 'Comprehensive market analysis including comparable sales, local trends, and pricing strategy. We give you the data to make informed decisions about your property.',
  'Property Management': 'Full property management for landlords — from rent collection to maintenance coordination. We treat your investment as if it were our own.',
  'Tenant Referencing': 'Thorough tenant screening including credit checks, employment verification, previous landlord references, and right-to-rent checks. Peace of mind guaranteed.',
  'Compliance & Safety': 'We ensure your property meets all legal requirements — gas safety, electrical inspections, EPC ratings, and fire safety regulations. Full compliance management.',
  'EPC Certificates': 'Energy Performance Certificates arranged and managed. We work with accredited assessors to ensure your property is compliant and energy-rated.',
  'Investment Advice': 'Expert guidance on property investment, portfolio building, and yield optimisation across East London and Essex. Data-driven advice for serious investors.',
  'Relocation Services': 'Moving to the area? We help with school catchments, transport links, local amenities, and finding the perfect neighbourhood for your lifestyle.',
  'Out-of-Hours Viewings': 'We understand busy schedules. Evening and weekend viewings available as standard — we work around your life, not the other way around.',
  'Refurbishment Advice': 'Expert guidance on which improvements add the most value to your property. From quick cosmetic fixes to full renovation projects — we know what buyers want.',
  'Block Management': 'Comprehensive block management services for freeholders and resident management companies. Maintenance, budgets, insurance, and compliance — all handled.',
}

/* ─── Main ─── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy')
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [serviceModal, setServiceModal] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ═══ NEWS TICKER ═══ */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-navy border-b border-white/10 overflow-hidden" style={{ height: 32 }}>
        <div className="flex items-center h-full animate-ticker whitespace-nowrap">
          {[...NEWS_TICKER, ...NEWS_TICKER].map((item, i) => (
            <span key={i} className="inline-block px-8 text-xs font-medium text-white/60">
              {item}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .animate-ticker { animation: tickerScroll 40s linear infinite; }
        `}</style>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-navy/98 shadow-2xl' : 'bg-navy/90'} backdrop-blur-xl border-b border-white/5`} style={{ top: 32 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Butler <span className="text-pink text-3xl">&</span> Stag
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Buy', 'Rent', 'Sell', 'Services', 'Areas', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white text-sm font-medium transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="tel:02089816611" className="bg-pink hover:bg-pink/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-pink/25 hover:scale-105">
              <Phone size={14} /> Call Us
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-navy/98 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-1">
            {['Buy', 'Rent', 'Sell', 'Services', 'Areas', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-base py-3 px-3 transition-all" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══ HERO — Video Background ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ marginTop: 32 }}>
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
            poster="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
          >
            <source src="https://videos.pexels.com/video-files/7578550/7578550-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy" />
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink/5 rounded-full blur-3xl" />
        
        {/* Geometric shapes */}
        <div className="absolute top-32 right-20 w-20 h-20 border border-pink/20 rounded-2xl rotate-12 hidden md:block" />
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-white/10 rounded-full hidden md:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center pt-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <span className="text-pink font-semibold text-xs tracking-widest uppercase">Independent Estate Agents Since 2012</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[0.9]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Find Your<br />
            Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink to-pink/60">Home</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Local knowledge. Personal service.<br className="hidden md:block" /> Exceptional results.
          </p>

          {/* Glass search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-1 mb-4 justify-center">
              {(['buy', 'rent'] as const).map(t => (
                <button key={t} onClick={() => setSearchType(t)} className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${searchType === t ? 'bg-pink text-white shadow-lg shadow-pink/25' : 'bg-white/10 text-white/50 hover:bg-white/15 backdrop-blur-sm'}`}>
                  {t === 'buy' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>
            <div className="flex bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/20">
              <input type="text" placeholder="Search by location, postcode, or area..." className="flex-1 px-6 py-4.5 text-gray-800 text-base outline-none bg-transparent placeholder:text-gray-400" />
              <button className="bg-gradient-to-r from-pink to-pink/80 hover:from-pink/90 hover:to-pink/70 text-white px-8 flex items-center gap-2 font-semibold transition-all m-1.5 rounded-xl">
                <Search size={18} /> <span className="hidden md:inline">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══ PROPERTY CARDS — Overlapping hero ═══ */}
      <section className="relative -mt-16 z-10 pb-12" id="buy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-5">
            {PROPERTIES.map((p, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ring-1 ring-black/5">
                <div className="relative h-56 overflow-hidden">
                  <img src={p.img} alt={p.type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-3 left-3 bg-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{p.tag}</div>
                  {/* Price overlay */}
                  <div className="absolute bottom-3 left-4">
                    <div className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{p.price}</div>
                  </div>
                  {/* Heart */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40">
                    <Heart size={14} className="text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-gray-800 font-semibold">{p.beds} bed {p.type}</div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1"><MapPin size={13} /> {p.area}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 text-pink font-semibold hover:gap-3 transition-all bg-pink/5 hover:bg-pink/10 px-6 py-3 rounded-full">
              View All Properties <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ Pink gradient divider ═══ */}
      <div className="h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent" />

      {/* ═══ STATS — Animated counters ═══ */}
      <section className="bg-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #0c1d36 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <AnimCounter target={s.value} suffix={s.suffix} />
              <div className="text-gray-400 text-sm mt-2 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent" />

      {/* ═══ WHY WE'RE DIFFERENT ═══ */}
      <section className="bg-gradient-to-b from-white to-cream py-16 md:py-20 relative overflow-hidden" id="sell">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-14">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-pink/10 text-pink text-xs font-bold tracking-wider uppercase">Why Choose Us</div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>We&apos;re Not Like the Others</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Truly Independent', desc: 'No corporate targets, no pressure selling. We work for you, not shareholders. Every decision is made with your best interests at heart.' },
              { icon: Users, title: 'Born & Raised Local', desc: 'We know every street, every school, every shortcut. Our team grew up here — East London and Essex are in our blood.' },
              { icon: Award, title: 'Award-Winning Results', desc: '98% client satisfaction, hundreds of 5-star reviews, and consistently achieving above asking price. The numbers speak.' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink to-pink/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-14 h-14 bg-gradient-to-br from-pink/20 to-pink/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="text-pink" size={24} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-navy py-16 md:py-20 relative overflow-hidden" id="services">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute top-10 left-10 w-32 h-32 border border-pink/10 rounded-3xl rotate-45" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/5 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-pink/20 text-pink text-xs font-bold tracking-wider uppercase">What We Offer</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Our Services</h2>
            <p className="text-white/40 mt-3">Everything you need under one roof</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map((s, i) => (
              <div key={i} onClick={() => setServiceModal(s.label)} className="group flex items-center gap-2.5 bg-white/5 hover:bg-pink/20 border border-white/10 hover:border-pink/30 rounded-full px-5 py-3 text-sm font-medium text-white/70 hover:text-white transition-all duration-300 cursor-pointer backdrop-blur-sm">
                <s.icon size={16} className="text-pink group-hover:scale-110 transition-transform" />
                {s.label}
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-pink" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AREA GUIDES ═══ */}
      <section className="bg-cream py-16 md:py-20 relative" id="areas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-pink/10 text-pink text-xs font-bold tracking-wider uppercase">Local Expertise</div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>Area Guides</h2>
            <p className="text-gray-400 mt-3">Average prices and market trends across our patch</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AREAS.map(a => (
              <div key={a.name} className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer border border-gray-100 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink to-pink/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-navy font-bold text-sm uppercase tracking-wider">{a.name}</div>
                <div className="text-3xl font-bold text-navy mt-2" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>{a.avg}</div>
                <div className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full mt-3">
                  <TrendingUp size={12} /> {a.yoy} YoY
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent" />

      {/* ═══ TESTIMONIALS — Carousel ═══ */}
      <section className="bg-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-60 h-60 bg-pink/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-pink/10 text-pink text-xs font-bold tracking-wider uppercase">Testimonials</div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>What Our Clients Say</h2>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm text-center min-h-[240px] flex flex-col items-center justify-center transition-all duration-500">
              <div className="flex gap-1 mb-5 justify-center">
                {Array.from({ length: TESTIMONIALS[testimonialIdx].stars }).map((_, j) => (
                  <Star key={j} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl italic">
                &ldquo;{TESTIMONIALS[testimonialIdx].text}&rdquo;
              </p>
              <div className="text-navy font-bold text-base">{TESTIMONIALS[testimonialIdx].name}</div>
              <div className="text-gray-400 text-sm">{TESTIMONIALS[testimonialIdx].area}</div>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink/10 flex items-center justify-center transition-colors">
                <ChevronLeft size={18} className="text-gray-500" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === testimonialIdx ? 'bg-pink w-6' : 'bg-gray-200 hover:bg-gray-300'}`} />
                ))}
              </div>
              <button onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink/10 flex items-center justify-center transition-colors">
                <ChevronRight size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUATION CTA ═══ */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582407947092-5d0e80207f64?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-pink/20 backdrop-blur-sm border border-pink/20">
            <span className="text-pink font-semibold text-xs tracking-widest uppercase">Free Valuation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Thinking of Selling?
          </h2>
          <p className="text-white/50 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
            Get a free, no-obligation valuation from our local experts. We&apos;ll tell you exactly what your property is worth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink to-pink/80 hover:from-pink/90 hover:to-pink/70 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink/25 hover:shadow-xl hover:shadow-pink/30 hover:scale-105">
              <Home size={18} /> Book Free Valuation
            </button>
            <a href="tel:02089816611" className="bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/20">
              <Phone size={18} /> Call 020 8981 6611
            </a>
          </div>
        </div>
      </section>

      {/* ═══ OFFICES ═══ */}
      <section className="bg-white py-16 md:py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-pink/10 text-pink text-xs font-bold tracking-wider uppercase">Visit Us</div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>Our Offices</h2>
            <p className="text-gray-400 mt-3">Pop in for a chat — the kettle&apos;s always on</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {OFFICES.map(o => (
              <div key={o.name} className="group bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink to-pink/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-14 h-14 bg-gradient-to-br from-navy/10 to-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="text-pink" size={22} />
                </div>
                <div className="text-navy font-bold text-lg">{o.name}</div>
                <div className="text-gray-400 text-xs mb-4 uppercase tracking-wider">{o.area}</div>
                <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-pink font-semibold text-sm hover:underline bg-pink/5 px-4 py-2 rounded-full">
                  <Phone size={13} /> {o.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ACCREDITATIONS ═══ */}
      <section className="bg-cream py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-gray-400 text-xs font-medium">
          {['ARLA Propertymark', 'NAEA Propertymark', 'The Property Ombudsman', 'ICO Registered', 'Client Money Protection'].map(badge => (
            <div key={badge} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100">
              <ShieldCheck size={14} className="text-pink/60" />
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-navy pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="text-white text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Butler <span className="text-pink text-2xl">&</span> Stag
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Independent estate agents est. 2012. Founded by Neil Leahy & Michael Woolley — two mates from Chingford who believed estate agency could be done better.
              </p>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-4">Quick Links</div>
              <div className="space-y-2.5">
                {['Properties for Sale', 'Properties to Rent', 'Valuations', 'Our Story'].map(link => (
                  <a key={link} href="#" className="block text-white/40 hover:text-pink text-sm transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-4">Services</div>
              <div className="space-y-2.5">
                {['Sales', 'Lettings', 'Property Management', 'New Homes'].map(link => (
                  <a key={link} href="#" className="block text-white/40 hover:text-pink text-sm transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-4">Get in Touch</div>
              <div className="space-y-3 text-sm">
                <a href="mailto:info@butlerandstag.uk" className="flex items-center gap-2.5 text-white/40 hover:text-pink transition-colors">
                  <Mail size={14} /> info@butlerandstag.uk
                </a>
                <a href="tel:02089816611" className="flex items-center gap-2.5 text-white/40 hover:text-pink transition-colors">
                  <Phone size={14} /> 020 8981 6611
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-white/25 text-xs">© {new Date().getFullYear()} Butler & Stag. All rights reserved.</div>
            <div className="text-white/25 text-xs">Built by <a href="https://anyos.co.uk" className="text-pink/40 hover:text-pink transition-colors">anyOS</a></div>
          </div>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/10 p-3 flex gap-2">
        <a href="tel:02089816611" className="flex-1 bg-pink text-white py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm">
          <Phone size={16} /> Call Now
        </a>
        <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm border border-white/10">
          <Home size={16} /> Free Valuation
        </button>
      </div>

      {/* ═══ SERVICE MODAL ═══ */}
      {serviceModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setServiceModal(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setServiceModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink/10 rounded-xl flex items-center justify-center">
                {(() => {
                  const svc = SERVICES.find(s => s.label === serviceModal)
                  return svc ? <svc.icon className="text-pink" size={22} /> : null
                })()}
              </div>
              <h3 className="text-xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>{serviceModal}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{SERVICE_DETAILS[serviceModal] || 'Contact us to learn more about this service.'}</p>
            <div className="mt-6 flex gap-3">
              <a href="tel:02089816611" className="flex-1 bg-pink hover:bg-pink/90 text-white py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm transition-colors">
                <Phone size={14} /> Call to Discuss
              </a>
              <a href="mailto:info@butlerandstag.uk" className="flex-1 bg-gray-100 hover:bg-gray-200 text-navy py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm transition-colors">
                <Mail size={14} /> Email Us
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
