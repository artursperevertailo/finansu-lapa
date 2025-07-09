import React, { useState, useEffect, useRef } from 'react';
import client from './api/sanityClient';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { PortableText } from '@portabletext/react';

// ===================================================================================
// CSS STILI - Viss nepieciešamais dizains ir definēts šeit.
// Šis komponents tiek ievietots aplikācijā un nodrošina visu dizainu.
// ===================================================================================
const GlobalStyles = () => (
  <style>{`
    :root {
        --brand-dark-green: #042f2e;
        --brand-accent: #c7a77d;
        --brand-bg: #f9f7f4;
        --text-main: #1f2937;
        --text-muted: #6b7280;
        --font-base: 'Manrope', sans-serif;
        --font-heading: 'Lora', serif;
    }
    body {
        font-family: var(--font-base);
        background-color: var(--brand-bg);
        color: var(--text-main);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
        color: var(--brand-dark-green);
        font-weight: 700;
    }
    h1 { font-size: 2.5rem; line-height: 1.2; }
    h2 { font-size: 2.25rem; line-height: 1.2; }
    h3 { font-size: 1.25rem; font-weight: 700; }
    @media (min-width: 768px) {
        h1 { font-size: 3.75rem; }
        h2 { font-size: 3rem; }
    }
    p { line-height: 1.6; }
    a { color: var(--brand-dark-green); text-decoration: underline; transition: color 0.2s; }
    a:hover { color: var(--brand-accent); }
    .container { max-width: 1152px; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; }
    .section-padding { padding-top: 5rem; padding-bottom: 5rem; }
    @media (min-width: 768px) { .section-padding { padding-top: 7rem; padding-bottom: 7rem; } }
    .section-subtitle { margin-top: 1.25rem; font-size: 1.125rem; max-width: 42rem; margin-left: auto; margin-right: auto; color: var(--text-muted); }
    .btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; text-align: center; text-decoration: none; transition: all 0.3s; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
    .btn:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1); transform: translateY(-2px); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-primary { background-color: var(--brand-dark-green); color: white; }
    .btn-primary:hover { background-color: #064e4c; color: white; }
    .btn-accent { background-color: var(--brand-accent); color: var(--brand-dark-green); }
    .btn-accent:hover { background-color: #b9956a; color: var(--brand-dark-green); }
    .btn-small { padding: 0.5rem 1.5rem; font-size: 0.875rem; }
    .card { background-color: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
    .card h3 { margin-bottom: 0.75rem; }
    .form-input { width: 100%; padding: 1rem; background-color: white; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 1.125rem; transition: all 0.2s; }
    .form-input:focus { outline: none; border-color: var(--brand-accent); box-shadow: 0 0 0 2px rgba(199, 167, 125, 0.5); }
    .form-label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.25rem; color: var(--text-muted); }
    .form-checkbox { margin-top: 0.25rem; height: 1rem; width: 1rem; border-radius: 0.25rem; border-color: #d1d5db; color: var(--brand-dark-green); }
    .page-header { background-color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 50; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
    .page-header .container { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; padding-bottom: 1rem; }
    .logo { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; text-decoration: none; color: var(--brand-dark-green); }
    .main-nav { display: none; }
    @media (min-width: 768px) { .main-nav { display: flex; gap: 2rem; align-items: center; } }
    .nav-link { position: relative; font-weight: 600; text-decoration: none; color: var(--text-muted); }
    .nav-link:hover { color: var(--brand-dark-green); }
    .nav-link::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -6px; left: 50%; transform: translateX(-50%); background-color: var(--brand-accent); transition: width 0.3s ease-in-out; }
    .nav-link:hover::after { width: 60%; }
    .mobile-nav { display: none; padding: 1rem 1.5rem; position: absolute; background-color: white; width: 100%; left: 0; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1); }
    .mobile-nav.open { display: block; }
    .mobile-nav .nav-link { display: block; padding: 0.75rem 0; text-align: center; }
    .hero-section { padding-top: 7rem; padding-bottom: 7rem; text-align: center; }
    .how-it-works-card { background-color: white; padding: 1.5rem; border-radius: 0.5rem; position: relative; }
    .how-it-works-number { height: 3rem; width: 3rem; display: flex; align-items: center; justify-content: center; background-color: var(--brand-accent); color: var(--brand-dark-green); font-size: 1.5rem; font-weight: 700; border-radius: 9999px; margin-left: auto; margin-right: auto; margin-bottom: 1rem; border: 4px solid var(--brand-bg); }
    .how-it-works-card h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    .quiz-question { font-size: 1.5rem; margin-bottom: 2rem; text-align: center; }
    @media (min-width: 768px) { .quiz-question { font-size: 1.875rem; } }
    .quiz-options { display: grid; grid-template-columns: 1fr; gap: 1rem; }
    @media (min-width: 768px) { .quiz-options { grid-template-columns: 1fr 1fr; } }
    .quiz-option { padding: 0; }
    .quiz-option > div { display: flex; align-items: center; width: 100%; height: 100%; padding: 1.25rem; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; transition: all 0.2s; text-align: left; }
    .quiz-option > div:hover { border-color: var(--brand-accent); }
    .quiz-option input:checked + div { border-color: var(--brand-accent); background-color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .quiz-option input { position: absolute; opacity: 0; width: 0; height: 0; }
    .quiz-option .custom-radio { width: 1.5rem; height: 1.5rem; border: 2px solid #d1d5db; border-radius: 9999px; margin-right: 1rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .quiz-option input:checked + div .custom-radio { border-color: var(--brand-dark-green); }
    .quiz-option .custom-radio::after { content: ''; width: 0.75rem; height: 0.75rem; background-color: var(--brand-dark-green); border-radius: 9999px; opacity: 0; transform: scale(0.5); transition: all 0.2s; }
    .quiz-option input:checked + div .custom-radio::after { opacity: 1; transform: scale(1); }
    .quiz-option span { font-size: 1.125rem; color: var(--text-main); }
    .quiz-option input:checked + div span { font-weight: 600; }
    .resource-link { font-weight: 600; margin-top: 0.75rem; display: inline-block; text-decoration: none; }
    .cookie-banner { position: fixed; bottom: 0; left: 0; right: 0; background-color: #111827; color: white; padding: 1rem; z-index: 50; box-shadow: 0 -2px 10px rgba(0,0,0,0.2); }
    .cookie-banner .container { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem; }
    @media (min-width: 768px) { .cookie-banner .container { flex-direction: row; } }
    .cookie-banner p { font-size: 0.875rem; text-align: center; }
    @media (min-width: 768px) { .cookie-banner p { text-align: left; } }
    .fade-in-element { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .fade-in-element.is-visible { opacity: 1; transform: translateY(0); }
    .page-footer { background-color: var(--brand-dark-green); color: white; padding: 3rem 1.5rem; text-align: center; font-size: 0.875rem; }
    .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--brand-dark-green);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
  `}</style>
);

const cx = (...classes) => classes.filter(Boolean).join(' ');
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>;

const CheckmarkIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#c7a77d"/>
    <path d="M13 21.5L18 26.5L27 15.5" stroke="#042f2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FadeInElement = ({ children, className, style }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const node = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(node);
            }
        }, { threshold: 0.1 });
        if (node) observer.observe(node);
        return () => { if (node) observer.disconnect(); };
    }, []);
    return <div ref={ref} className={cx('transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8', className)} style={style}>{children}</div>;
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const links = [ { href: "#services", label: "Risinājumi" }, { href: "#how-it-works", label: "Kā tas strādā?" }, { href: "#blog", label: "Izglītības centrs" }, { href: "#contact", label: "Sazinies" }, ];
    return (
        <header className="page-header">
            <div className="container">
                <a href="#sakums" className="logo">Finanšu Ceļvedis</a>
                <nav className="main-nav">
                    {links.map(link => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
                    <a href="#quiz" className="btn btn-primary btn-small">Sākt Aptauju</a>
                </nav>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" aria-label="Atvērt izvēlni"><MenuIcon /></button>
            </div>
            <div className={cx('mobile-nav', isMenuOpen && 'open')} >
                {links.map(link => <a key={link.href} href={link.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>{link.label}</a>)}
                <a href="#quiz" className="btn btn-primary w-full mt-4" onClick={() => setIsMenuOpen(false)}>Sākt Aptauju</a>
            </div>
        </header>
    );
};

const HeroSection = () => (
    <section id="sakums" className="hero-section">
        <div className="container"><h1>Palīdzi savai naudas nākotnei sākt augt šodien</h1><p className="section-subtitle">Plāno uzkrājumus, veido finanšu drošības spilvenu un saņem ekspertu atbalstu jebkurā dzīves posmā.</p><div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"><a href="#quiz" className="btn btn-primary">Sāc bezmaksas aptauju</a><a href="#contact" className="btn btn-accent">Piesakies konsultācijai</a></div></div>
    </section>
);

const ServicesSection = () => {
    const services = [ { title: "Uzkrājumu stratēģija", description: "Pielāgots ilgtermiņa uzkrājumu plāns, kas balstīts uz Taviem mērķiem un komforta līmeni ar risku." }, { title: "Bērna nākotnes fonds", description: "Sāc krāt bērna izglītībai vai pirmajam mājoklim. Sākums ar nelielām summām jau šodien." }, { title: "Dzīvības apdrošināšana", description: "Aizsargā savus tuviniekus neparedzētos gadījumos. Vienkārši, caurspīdīgi un digitāli." }, { title: "Uzņēmumu darbinieku plāni", description: "Piedāvājums uzņēmumiem darbinieku motivēšanai un ilgtermiņa lojalitātes veidošanai." } ];
    return (
        <section id="services" className="section-padding bg-white">
            <div className="container text-center">
                <FadeInElement className="mb-16"><h2>Mūsu risinājumi</h2><p className="section-subtitle">Vienkārši, saprotami un digitāli risinājumi Jūsu finansiālajai drošībai.</p></FadeInElement>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => <FadeInElement key={service.title} className="card" style={{ animationDelay: `${index * 0.1}s` }}><h3>{service.title}</h3><p>{service.description}</p></FadeInElement>)}
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection = () => {
    const steps = [ { title: "Aizpildi aptauju", description: "Atbildi uz dažiem jautājumiem, lai mēs saprastu Tavas vajadzības." }, { title: "Saņem ieteikumu", description: "Sagatavojam caurspīdīgu risinājumu ar simulāciju." }, { title: "Apstiprini", description: "Izmanto Smart-ID vai eParakstu, lai droši apstiprinātu līgumu." }, { title: "Seko līdzi", description: "Pārbaudi progresu savā klienta profilā jebkurā laikā." } ];
    return (
        <section id="how-it-works" className="section-padding">
            <div className="container">
                <FadeInElement className="text-center mb-16"><h2>Kā tas strādā?</h2><p className="section-subtitle">Mēs esam vienkāršojuši ceļu uz Jūsu finansiālo drošību. Sekojiet šiem soļiem.</p></FadeInElement>
                <div className="relative">
                    <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center relative">
                        {steps.map((step, index) => <FadeInElement key={step.title} className="how-it-works-card" style={{ animationDelay: `${index * 0.1}s` }}><div className="how-it-works-number">{index + 1}</div><h3>{step.title}</h3><p>{step.description}</p></FadeInElement>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CalculatorSection = () => {
    const [monthly, setMonthly] = useState(50);
    const [years, setYears] = useState(10);
    const [interest, setInterest] = useState(4);
    const [result, setResult] = useState('€0.00');
    useEffect(() => {
        const m = parseFloat(monthly) || 0;
        const n = (parseFloat(years) || 0) * 12;
        const r = (parseFloat(interest) || 0) / 100 / 12;
        let futureValue = (r === 0) ? m * n : m * ((Math.pow(1 + r, n) - 1) / r);
        setResult('€' + futureValue.toLocaleString('lv-LV', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }, [monthly, years, interest]);
    return (
        <section id="calculator" className="section-padding">
            <div className="container">
                <FadeInElement className="max-w-3xl mx-auto text-center"><h2>Uzkrājumu kalkulators</h2><p className="section-subtitle">Uzzini, cik daudz Tu varētu uzkrāt, regulāri iemaksājot izvēlēto summu.</p></FadeInElement>
                <FadeInElement className="card max-w-4xl mx-auto mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
                        <div><label htmlFor="monthly" className="form-label">Iemaksa mēnesī (€)</label><input type="number" id="monthly" className="form-input" value={monthly} onChange={e => setMonthly(e.target.value)} min="10" /></div>
                        <div><label htmlFor="years" className="form-label">Termiņš (gadi)</label><input type="number" id="years" className="form-input" value={years} onChange={e => setYears(e.target.value)} min="1" /></div>
                        <div><label htmlFor="interest" className="form-label">Gada ienesīgums (%)</label><input type="number" id="interest" className="form-input" value={interest} onChange={e => setInterest(e.target.value)} step="0.1" min="0" /></div>
                    </div>
                    <div className="text-center bg-brand-bg p-8 rounded-lg">
                        <p className="text-lg font-semibold">Potenciālais uzkrājums pēc {years} gadiem:</p>
                        <p className="text-5xl font-bold mt-2 text-brand-dark-green">{result}</p>
                        <p className="text-sm text-muted mt-4">Šis ir informatīvs aprēķins un neietver komisijas maksas. Reālais ienesīgums var atšķirties.</p>
                    </div>
                </FadeInElement>
            </div>
        </section>
    );
};

const getExcerpt = (body, maxLength = 180) => {
  if (!Array.isArray(body)) return '';
  let text = '';
  for (const block of body) {
    if (block._type === 'block' && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child.text) text += child.text + ' ';
        if (text.length > maxLength) break;
      }
    }
    if (text.length > maxLength) break;
  }
  return text.trim().slice(0, maxLength) + (text.length > maxLength ? '...' : '');
};

const BlogSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await client.fetch(`*[_type == "post"]|order(publishedAt desc)[0...6]{
                  _id,
                  title,
                  slug,
                  publishedAt,
                  body,
                  author,
                  coverImage,
                  tags
                }`);
                setPosts(data);
            } catch (err) {
                setError('Neizdevās ielādēt rakstus.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section id="blog" className="section-padding bg-white">
            <div className="container">
                <FadeInElement className="text-center mb-16"><h2>Izglītības centrs</h2><p className="section-subtitle">Uzziniet vairāk par uzkrājumiem, apdrošināšanu un finanšu pārvaldību no mūsu praktiskajiem ceļvežiem un rakstiem.</p></FadeInElement>
                {loading ? (
                  <div className="text-center">Ielādē rakstus...</div>
                ) : error ? (
                  <div className="text-red-600 text-center">{error}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {posts.map((post, index) => {
                      const excerpt = getExcerpt(post.body);
                      return (
                        <FadeInElement key={post._id} className="card" style={{ animationDelay: `${index * 0.1}s` }}>
                          {post.coverImage && post.coverImage.asset && (
                            <img src={post.coverImage.asset.url} alt={post.title} className="mb-4 w-full h-48 object-cover rounded" />
                          )}
                          <h3>{post.title}</h3>
                          <p className="mb-2 text-sm text-muted">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('lv-LV') : ''}</p>
                          {post.author && <p className="mb-2 text-xs text-slate-500">Autors: {post.author}</p>}
                          {post.tags && post.tags.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                              {post.tags.map(tag => <span key={tag} className="bg-slate-100 text-xs px-2 py-1 rounded">{tag}</span>)}
                            </div>
                          )}
                          <p className="mb-4">{excerpt}</p>
                          {post.slug && (
                            <a href={`/blog/${post.slug.current}`} className="resource-link">Lasīt vairāk →</a>
                          )}
                        </FadeInElement>
                      );
                    })}
                  </div>
                )}
            </div>
        </section>
    );
};

const ContactSection = () => {
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState(() => {
        // Load draft from localStorage
        try {
            return JSON.parse(localStorage.getItem('contactDraft')) || {
                name: '',
                email: '',
                message: '',
                gdpr: false,
                honey: ''
            };
        } catch {
            return { name: '', email: '', message: '', gdpr: false, honey: '' };
        }
    });
    const [touched, setTouched] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    // Save draft to localStorage
    useEffect(() => {
        localStorage.setItem('contactDraft', JSON.stringify(formData));
    }, [formData]);

    // Reset draft on success
    useEffect(() => {
        if (status === 'success') {
            localStorage.removeItem('contactDraft');
        }
    }, [status]);

    // Validation helpers
    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Vārds ir obligāts';
        if (!formData.email.trim()) errors.email = 'E-pasts ir obligāts';
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.email = 'Nederīgs e-pasts';
        if (!formData.message.trim()) errors.message = 'Ziņa ir obligāta';
        if (!formData.gdpr) errors.gdpr = 'Nepieciešama piekrišana';
        if (formData.honey) errors.honey = 'Spam detected';
        return errors;
    };
    const errors = validate();

    // Focus first invalid field on submit
    useEffect(() => {
        if (status === 'error' && formRef.current) {
            const firstError = Object.keys(errors)[0];
            if (firstError) {
                const el = formRef.current.querySelector(`[name="${firstError}"]`);
                if (el) el.focus();
            }
        }
    }, [status, errors]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };
    const handleBlur = e => {
        setTouched(t => ({ ...t, [e.target.name]: true }));
    };
    const handleReset = () => {
        setFormData({ name: '', email: '', message: '', gdpr: false, honey: '' });
        setTouched({});
        setErrorMsg('');
        setStatus('idle');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true, gdpr: true });
        if (Object.keys(errors).length > 0) {
            setStatus('error');
            setErrorMsg('Lūdzu, aizpildiet visus obligātos laukus.');
            return;
        }
        setStatus('sending');
        setShowSpinner(true);
        setErrorMsg('');
        try {
            const data = new FormData();
            data.append('Vārds', formData.name);
            data.append('E-pasts', formData.email);
            data.append('Ziņa', formData.message);
            data.append('gdpr', formData.gdpr ? 'on' : '');
            data.append('honey', formData.honey);
            const res = await fetch('https://formspree.io/f/xpwrgnzr', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            });
            const result = await res.json();
            setShowSpinner(false);
            if (res.ok) {
                setStatus('success');
                handleReset();
                setTimeout(() => navigate('/thank-you'), 2000);
            } else {
                setStatus('error');
                setErrorMsg(result.errors?.[0]?.message || 'Neizdevās nosūtīt ziņu.');
            }
        } catch (err) {
            setShowSpinner(false);
            setStatus('error');
            setErrorMsg('Neizdevās nosūtīt ziņu.');
        }
    };

    return (
        <section id="contact" className="section-padding">
            <div className="container">
                <FadeInElement className="text-center mb-16"><h2>Sazinies ar mani</h2><p className="section-subtitle">Aizpildi formu vai izmanto kādu no zemāk norādītajiem saziņas veidiem. Atbildēšu cik ātri vien iespējams.</p></FadeInElement>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    <FadeInElement>
                        <form ref={formRef} onSubmit={handleSubmit} onReset={handleReset} className="space-y-4" aria-label="Saziņas forma" autoComplete="on" noValidate data-testid="contact-form">
                            {/* Honeypot anti-spam field */}
                            <input type="text" name="honey" value={formData.honey} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" aria-hidden="true" />
                            <div>
                                <input type="text" name="name" placeholder="Vārds" required aria-required="true" aria-invalid={!!errors.name} value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`form-input${touched.name && errors.name ? ' border-red-500' : ''}`} />
                                {touched.name && errors.name && <div className="text-red-600 text-xs mt-1 animate-fade-in">{errors.name}</div>}
                            </div>
                            <div>
                                <input type="email" name="email" placeholder="E-pasts" required aria-required="true" aria-invalid={!!errors.email} value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`form-input${touched.email && errors.email ? ' border-red-500' : ''}`} />
                                {touched.email && errors.email && <div className="text-red-600 text-xs mt-1 animate-fade-in">{errors.email}</div>}
                            </div>
                            <div>
                                <textarea name="message" rows="4" placeholder="Tavs jautājums vai komentārs" required aria-required="true" aria-invalid={!!errors.message} value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`form-input${touched.message && errors.message ? ' border-red-500' : ''}`}></textarea>
                                {touched.message && errors.message && <div className="text-red-600 text-xs mt-1 animate-fade-in">{errors.message}</div>}
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <input type="checkbox" id="gdpr" name="gdpr" checked={formData.gdpr} onChange={handleChange} onBlur={handleBlur} required aria-required="true" aria-invalid={!!errors.gdpr} className="form-checkbox" />
                                <label htmlFor="gdpr" className="text-slate-600">Piekrītu datu apstrādei saskaņā ar <a href="/privatuma-politika">privātuma politiku</a>.</label>
                            </div>
                            {touched.gdpr && errors.gdpr && <div className="text-red-600 text-xs mt-1 animate-fade-in">{errors.gdpr}</div>}
                            <div className="flex gap-2">
                                <button type="submit" className="btn btn-primary w-full flex items-center justify-center" disabled={status === 'sending'}>
                                    {showSpinner && <span className="loader mr-2"></span>}
                                    {status === 'sending' ? 'Sūta...' : 'Nosūtīt ziņu'}
                                </button>
                                <button type="reset" className="btn bg-slate-200">Notīrīt</button>
                            </div>
                            {status === 'success' && <div className="text-green-700 text-center font-semibold py-4 animate-fade-in">Paldies! Jūsu ziņa ir nosūtīta.</div>}
                            {status === 'error' && <div className="text-red-600 text-center mt-2 animate-fade-in">{errorMsg}</div>}
                        </form>
                    </FadeInElement>
                    <FadeInElement style={{ animationDelay: "0.1s" }}>
                        <h3>Par mani</h3>
                        <p className="mb-4">Esmu licencēts finanšu konsultants ar pieredzi dzīvības apdrošināšanas un ieguldījumu risinājumos. Mani mērķi ir vienkāršība, uzticamība un klienta vajadzību izpratne.</p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3"><span className="text-brand-accent">✔️</span> Sertificēts (Latvijas Banka)</li>
                            <li className="flex items-center gap-3"><span className="text-brand-accent">✔️</span> 10+ gadu pieredze ar uzkrājumu risinājumiem</li>
                            <li className="flex items-center gap-3"><span className="text-brand-accent">✔️</span> Nav piesaistes vienam pakalpojuma sniedzējam</li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-slate-200"><p className="font-semibold">Sazinies arī caur:</p><a href="mailto:info@example.lv" className="block mt-2">info@example.lv</a><a href="tel:+37120000000" className="block mt-1">+371 20000000</a></div>
                    </FadeInElement>
                </div>
            </div>
        </section>
    );
};

export { ContactSection, ErrorBoundary, QuizSection, BlogSection, BlogPostPage, ThankYouPage, PrivacyPolicyPage, NotFoundPage };

const QuizSection = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        { id: 1, question: "1. Kāds ir Jūsu galvenais finanšu mērķis šobrīd?", name: "Mērķis", options: ["Uzkrāt pensijai", "Sakrāt pirmajai iemaksai", "Nodrošināt bērnu izglītību", "Cits"] },
        { id: 2, question: "2. Vai Jums jau ir izveidoti kādi uzkrājumi?", name: "Uzkrājumi", options: ["Jā, ir stabili uzkrājumi", "Nedaudz, bet gribētu vairāk", "Nē, sāku no nulles"] },
        { id: 3, question: "3. Kā Jūs raksturotu savu komforta līmeni ar finanšu risku?", name: "Riska tolerance", options: ["Ļoti piesardzīgs", "Mērens", "Gatavs riskēt"] },
        { id: 4, question: "4. Cik ilgā laika posmā plānojat sasniegt savu mērķi?", name: "Laika horizonts", options: ["Īstermiņā (1-3 gadi)", "Vidējā termiņā (4-7 gadi)", "Ilgtermiņā (8+ gadi)"] },
        { id: 5, question: "Gandrīz gatavs! Kur nosūtīt Jūsu rezultātus?", name: "Kontakti", type: "contacts" }
    ];

    const handleOptionChange = (e) => {
        setAnswers({ ...answers, [steps[currentStep].name]: e.target.value });
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            if (!answers[steps[currentStep].name]) {
                alert('Lūdzu, izvēlieties vienu no atbildēm!');
                return;
            }
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        const name = e.target.elements['Vārds'].value;
        const email = e.target.elements['E-pasts'].value;
        const phone = e.target.elements['Tālrunis'].value;
        const quizAnswers = steps.slice(0, 4).map((step) => ({
            question: step.question,
            answer: answers[step.name] || '',
        }));
        try {
            const res = await fetch('/api/submitQuiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, answers: quizAnswers }),
            });
            const result = await res.json();
            if (result.success) {
                setIsSubmitted(true);
            } else {
                setSubmitError(result.error || 'Neizdevās nosūtīt datus.');
            }
        } catch (err) {
            setSubmitError('Neizdevās nosūtīt datus.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const stepData = steps[currentStep];

    return (
        <section id="quiz" className="section-padding bg-white">
            <div className="container">
                <FadeInElement className="text-center mb-16"><h2>Sāc savu ceļu uz finansiālo skaidrību</h2><p className="section-subtitle">Atbildi uz dažiem jautājumiem, lai saņemtu personalizētu kopsavilkumu.</p></FadeInElement>
                <FadeInElement className="card max-w-3xl mx-auto">
                    {isSubmitted ? (
                        <div className="text-center">
                            <div className="bg-brand-accent text-brand-dark-green rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto"><CheckmarkIcon /></div>
                            <h3>Paldies!</h3>
                            <p>Jūsu pieteikums ir saņemts. Tuvākajā laikā sazināšos ar Jums.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8"><div className="bg-slate-200 rounded-full h-2.5"><div className="bg-brand-accent h-2.5 rounded-full transition-all duration-300" style={{width: `${(currentStep / (steps.length - 1)) * 100}%`}}></div></div></div>
                            <div className="relative min-h-[350px]">
                                <h3 className="quiz-question">{stepData.question}</h3>
                                {stepData.type === 'contacts' ? (
                                    <div className="space-y-4 max-w-md mx-auto mt-8">
                                        <input type="text" name="Vārds" placeholder="Vārds, Uzvārds" className="form-input" required autoComplete="name" />
                                        <input type="email" name="E-pasts" placeholder="E-pasts" className="form-input" required autoComplete="email" />
                                        <input type="tel" name="Tālrunis" placeholder="Tālruņa numurs (nav obligāts)" className="form-input" autoComplete="tel" />
                                    </div>
                                ) : (
                                    <div className="quiz-options">
                                        {stepData.options.map(opt => (
                                            <label key={opt} className="quiz-option">
                                                <input type="radio" name={stepData.name} value={opt} checked={answers[stepData.name] === opt} onChange={handleOptionChange} required />
                                                <div><div className="custom-radio"></div><span>{opt}</span></div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="mt-12 flex justify-center gap-4">
                                {currentStep > 0 && <button type="button" onClick={handlePrev} className="btn bg-slate-200">Atpakaļ</button>}
                                {currentStep < steps.length - 1 && <button type="button" onClick={handleNext} className="btn btn-primary">Tālāk</button>}
                                {currentStep === steps.length - 1 && <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Nosūta...' : 'Nosūtīt'}</button>}
                            </div>
                            {submitError && <div className="text-red-600 text-center mt-4">{submitError}</div>}
                        </form>
                    )}
                </FadeInElement>
            </div>
        </section>
    );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    client.fetch(`*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      body,
      author,
      coverImage,
      tags
    }`, { slug })
      .then(data => {
        if (!data) {
          setError('404');
        } else {
          setPost(data);
        }
      })
      .catch(() => setError('Neizdevās ielādēt rakstu.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container py-16 text-center">Ielādē rakstu...</div>;
  if (error === '404') return (
    <section className="section-padding bg-white">
      <div className="container max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="mb-8 text-lg text-muted">Raksts nav atrasts.</p>
        <button className="btn btn-accent" onClick={() => navigate('/')}>Uz sākumlapu</button>
      </div>
    </section>
  );
  if (error) return <div className="container py-16 text-center text-red-600">{error}</div>;
  if (!post) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container max-w-3xl mx-auto">
        <button className="mb-8 text-brand-accent underline" onClick={() => navigate(-1)}>&larr; Atpakaļ</button>
        {post.coverImage && post.coverImage.asset && (
          <img src={post.coverImage.asset.url} alt={post.title} className="mb-8 w-full h-64 object-cover rounded" />
        )}
        <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
        <p className="mb-2 text-sm text-muted">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('lv-LV') : ''}</p>
        {post.author && <p className="mb-2 text-xs text-slate-500">Autors: {post.author}</p>}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map(tag => <span key={tag} className="bg-slate-100 text-xs px-2 py-1 rounded">{tag}</span>)}
          </div>
        )}
        <div className="prose dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
    </section>
  );
};

const ThankYouPage = () => (
  <section className="section-padding bg-white">
    <div className="container max-w-xl mx-auto text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold mb-4">Paldies par saziņu!</h1>
      <p className="mb-8 text-lg text-muted">Jūsu ziņa ir veiksmīgi nosūtīta. Atbildēšu cik ātri vien iespējams.</p>
      <a href="/" className="btn btn-primary">Uz sākumlapu</a>
    </div>
  </section>
);

const PrivacyPolicyPage = () => (
  <section className="section-padding bg-white">
    <div className="container max-w-2xl mx-auto prose dark:prose-invert">
      <h1>Privātuma politika</h1>
      <p>Jūsu privātums mums ir svarīgs. Šajā lapā ir aprakstīts, kā mēs apstrādājam un aizsargājam jūsu personas datus, kas tiek ievākti, izmantojot šo vietni.</p>
      <h2>Kādi dati tiek ievākti?</h2>
      <ul>
        <li>Vārds un e-pasta adrese, ko norādāt saziņas formā</li>
        <li>Jautājuma saturs</li>
        <li>Tehniskā informācija (IP adrese, pārlūkprogrammas tips u.c.)</li>
      </ul>
      <h2>Kā dati tiek izmantoti?</h2>
      <ul>
        <li>Lai atbildētu uz jūsu jautājumiem un sniegtu pakalpojumus</li>
        <li>Lai uzlabotu vietnes darbību un lietotāju pieredzi</li>
        <li>Datu drošības un juridisko prasību nodrošināšanai</li>
      </ul>
      <h2>Datu glabāšana un aizsardzība</h2>
      <p>Jūsu dati tiek glabāti droši un netiek nodoti trešajām personām bez jūsu piekrišanas, izņemot gadījumus, kad to pieprasa likums.</p>
      <h2>Jūsu tiesības</h2>
      <ul>
        <li>Piekļūt saviem datiem</li>
        <li>Labot vai dzēst savus datus</li>
        <li>Aizliegt datu apstrādi noteiktos gadījumos</li>
      </ul>
      <p>Jautājumu vai pieprasījumu gadījumā, lūdzu, sazinieties ar mums, izmantojot kontaktformu.</p>
    </div>
  </section>
);

const Footer = () => (<footer className="page-footer"><p>&copy; 2024 Finanšu Ceļvedis. Visas tiesības aizsargātas.</p></footer>);

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => { if (!localStorage.getItem("cookie_consent")) setIsVisible(true); }, []);
    const acceptCookies = () => { localStorage.setItem("cookie_consent", "true"); setIsVisible(false); };
    if (!isVisible) return null;
    return (
        <div className="cookie-banner">
            <div className="container flex-col md:flex-row">
                <p>Mēs izmantojam sīkdatnes, lai uzlabotu lietošanas pieredzi. Uzzini vairāk mūsu <a href="/privatuma-politika">privātuma politikā</a>.</p>
                <button onClick={acceptCookies} className="btn btn-accent btn-small">Piekrītu</button>
            </div>
        </div>
    );
};

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  handleRetry = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded p-6 text-center my-8">
          <div className="text-3xl mb-2">😬</div>
          <p className="mb-4">Radās kļūda šīs sadaļas ielādēšanā.</p>
          <button className="btn btn-accent" onClick={this.handleRetry}>Mēģināt vēlreiz</button>
        </div>
      );
    }
    return this.props.children;
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Sentry will automatically capture errors
  }
  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };
  handleReport = () => {
    const subject = encodeURIComponent('Kļūda finanšu lapā');
    const body = encodeURIComponent(`Kļūdas ziņojums: ${this.state.error?.toString() || ''}\n\nPapildu informācija: ${this.state.errorInfo?.componentStack || ''}`);
    window.open(`mailto:info@example.lv?subject=${subject}&body=${body}`);
  };
  render() {
    if (this.state.hasError) {
      return (
        <section className="section-padding bg-white">
          <div className="container max-w-xl mx-auto text-center">
            <div className="text-6xl mb-6">😢</div>
            <h1 className="text-3xl font-bold mb-4">Kaut kas nogāja greizi</h1>
            <p className="mb-8 text-lg text-muted">Diemžēl radās neparedzēta kļūda. Lūdzu, mēģiniet pārlādēt lapu vai ziņojiet par problēmu.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary" onClick={this.handleReload}>Pārlādēt lapu</button>
              <button className="btn btn-accent" onClick={this.handleReport}>Ziņot par problēmu</button>
            </div>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

const NotFoundPage = () => (
  <section className="section-padding bg-white">
    <div className="container max-w-xl mx-auto text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-bold mb-4">Lapa nav atrasta (404)</h1>
      <p className="mb-8 text-lg text-muted">Atvainojiet, šāda lapa neeksistē vai ir pārvietota.</p>
      <a href="/" className="btn btn-primary">Uz sākumlapu</a>
    </div>
  </section>
);

export default function App() {
  return (
    <ErrorBoundary>
      <GlobalStyles />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <ServicesSection />
              <HowItWorksSection />
              <CalculatorSection />
              <SectionErrorBoundary><BlogSection /></SectionErrorBoundary>
              <SectionErrorBoundary><ContactSection /></SectionErrorBoundary>
              <SectionErrorBoundary><QuizSection /></SectionErrorBoundary>
            </>
          } />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privatuma-politika" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </ErrorBoundary>
  );
}
