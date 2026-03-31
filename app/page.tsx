'use client'

import { useState } from 'react'
import { Search, Phone, Mail, MapPin, Home, Key, TrendingUp, Users, Award, Star, ChevronRight, Menu, X, Building2, ClipboardCheck, Camera, Ruler, BarChart3, ShieldCheck, Heart, Clock, Briefcase, Hammer, FileText } from 'lucide-react'

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
  { name: 'Rachel & Tom', text: 'As first-time buyers, we were nervous about the whole process. The team held our hand every step of the way.', area: 'Bow', stars: 5 },
]

const STATS = [
  { value: '12+', label: 'Years Experience' },
  { value: '4', label: 'Local Offices' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '2,500+', label: 'Properties Sold' },
]

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy')

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Butler <span className="text-pink">&</span> Stag
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Buy', 'Rent', 'Sell', 'Services', 'Area Guides', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white/70 hover:text-white text-sm font-medium transition-colors">{item}</a>
            ))}
            <a href="tel:02089816611" className="bg-pink hover:bg-pink/90 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
              <Phone size={14} /> Call Us
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-navy border-t border-white/10 px-4 py-4 space-y-3">
            {['Buy', 'Rent', 'Sell', 'Services', 'Area Guides', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-white/80 hover:text-white text-base py-2" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy/80" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-pink font-semibold text-sm tracking-wider uppercase mb-4">Independent Estate Agents Since 2012</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Find Your Perfect<br />
            <span className="text-pink">Home</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Award-winning estate agents covering East London & Essex. Local knowledge, personal service, exceptional results.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-1 mb-3 justify-center">
              {(['buy', 'rent'] as const).map(t => (
                <button key={t} onClick={() => setSearchType(t)} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${searchType === t ? 'bg-pink text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'}`}>
                  {t === 'buy' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>
            <div className="flex bg-white rounded-xl overflow-hidden shadow-2xl">
              <input type="text" placeholder="Search by location, postcode, or area..." className="flex-1 px-6 py-4 text-gray-800 text-base outline-none" />
              <button className="bg-pink hover:bg-pink/90 text-white px-6 md:px-8 flex items-center gap-2 font-semibold transition-colors">
                <Search size={18} /> <span className="hidden md:inline">Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED PROPERTIES ═══ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Properties</h2>
              <p className="text-gray-500 mt-2">Hand-picked homes ready for viewings</p>
            </div>
            <button className="hidden md:flex items-center gap-1 text-pink font-semibold hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 overflow-x-auto">
            {[
              { price: '£525,000', beds: 3, type: 'Semi-Detached', area: 'Chingford', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80' },
              { price: '£385,000', beds: 2, type: 'Victorian Terrace', area: 'Bow', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80' },
              { price: '£750,000', beds: 4, type: 'Detached', area: 'Theydon Bois', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80' },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="h-52 overflow-hidden">
                  <img src={p.img} alt={p.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="text-xl font-bold text-navy">{p.price}</div>
                  <div className="text-gray-600 text-sm mt-1">{p.beds} bed {p.type}</div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-2"><MapPin size={12} /> {p.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY WE'RE DIFFERENT ═══ */}
      <section className="bg-cream py-16 md:py-20" id="sell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>Why We&apos;re Different</h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto">We&apos;re not a corporate chain. We&apos;re your neighbours, and we treat every property like it&apos;s our own.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Truly Independent', desc: 'No corporate targets, no pressure selling. We work for you, not shareholders.' },
              { icon: Users, title: 'Local Experts', desc: 'Born and raised in East London. We know every street, every school, every shortcut.' },
              { icon: Award, title: 'Award-Winning Service', desc: '98% client satisfaction rate and hundreds of 5-star reviews speak for themselves.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-pink/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="text-pink" size={24} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-white py-16 md:py-20" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>Our Services</h2>
            <p className="text-gray-500 mt-2">Everything you need under one roof</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 hover:bg-pink/5 hover:border-pink/20 border border-gray-100 rounded-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-navy transition-all cursor-pointer">
                <s.icon size={16} className="text-pink" />
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AREA GUIDES ═══ */}
      <section className="bg-cream py-16 md:py-20" id="area-guides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>Area Guides</h2>
            <p className="text-gray-500 mt-2">Average prices and market trends across our coverage areas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AREAS.map(a => (
              <div key={a.name} className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer border border-gray-50">
                <div className="text-navy font-bold text-base">{a.name}</div>
                <div className="text-2xl font-bold text-navy mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{a.avg}</div>
                <div className="text-green-600 text-xs font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> {a.yoy} YoY
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="text-navy font-semibold text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUATION CTA ═══ */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Thinking of Selling?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Get a free, no-obligation valuation from our local experts. We&apos;ll tell you exactly what your property is worth in today&apos;s market.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-pink hover:bg-pink/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <Home size={18} /> Book Free Valuation
            </button>
            <a href="tel:02089816611" className="bg-white/10 hover:bg-white/15 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <Phone size={18} /> Call 020 8981 6611
            </a>
          </div>
        </div>
      </section>

      {/* ═══ OFFICES ═══ */}
      <section className="bg-white py-16 md:py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>Our Offices</h2>
            <p className="text-gray-500 mt-2">Pop in for a chat — the kettle&apos;s always on</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {OFFICES.map(o => (
              <div key={o.name} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="text-pink" size={20} />
                </div>
                <div className="text-navy font-bold">{o.name}</div>
                <div className="text-gray-400 text-xs mb-3">{o.area}</div>
                <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="text-pink font-semibold text-sm hover:underline flex items-center justify-center gap-1">
                  <Phone size={12} /> {o.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ACCREDITATIONS ═══ */}
      <section className="bg-cream py-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-gray-400 text-xs font-medium">
          {['ARLA Propertymark', 'NAEA Propertymark', 'The Property Ombudsman', 'ICO Registered', 'Client Money Protection'].map(badge => (
            <div key={badge} className="flex items-center gap-2">
              <ShieldCheck size={14} />
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white text-lg font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Butler <span className="text-pink">&</span> Stag
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Independent estate agents est. 2012. Founded by Neil Leahy & Michael Woolley.
              </p>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-3">Quick Links</div>
              <div className="space-y-2">
                {['Properties for Sale', 'Properties to Rent', 'Valuations', 'Our Story'].map(link => (
                  <a key={link} href="#" className="block text-white/50 hover:text-white text-sm transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-3">Services</div>
              <div className="space-y-2">
                {['Sales', 'Lettings', 'Property Management', 'New Homes'].map(link => (
                  <a key={link} href="#" className="block text-white/50 hover:text-white text-sm transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-3">Get in Touch</div>
              <div className="space-y-2 text-sm">
                <a href="mailto:info@butlerandstag.uk" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                  <Mail size={14} /> info@butlerandstag.uk
                </a>
                <a href="tel:02089816611" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                  <Phone size={14} /> 020 8981 6611
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/30 text-xs">
            © {new Date().getFullYear()} Butler & Stag. All rights reserved. Built by <a href="https://anyos.co.uk" className="text-pink/50 hover:text-pink">anyOS</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
