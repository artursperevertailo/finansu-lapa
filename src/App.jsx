import React, { useState, useEffect, useRef } from 'react';

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
  `}</style>
);

const cx = (...classes) => classes.filter(Boolean).join(' ');
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>;

const FadeInElement = ({ children, className, style }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.disconnect(); };
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

const BlogSection = () => {
    const posts = [ { title: "Kas ir uzkrājošā dzīvības apdrošināšana?", description: "Izskaidrots vienkārši – kā tas strādā, kam tā piemērota un kā tā atšķiras no citiem uzkrājumu risinājumiem.", link: "#" }, { title: "Kā izvēlēties piemērotu risinājumu?", description: "Vai Tev piemērotāks ir uzkrājums ar garantiju vai elastīgs ieguldījums? Mēs palīdzam izvēlēties.", link: "#" }, { title: "Kad labāk sākt?", description: "Dati rāda, ka uzkrājumu uzsākšana agrīnā vecumā dod būtisku priekšrocību. Lūk, kāpēc.", link: "#" } ];
    return (
        <section id="blog" className="section-padding bg-white">
            <div className="container">
                <FadeInElement className="text-center mb-16"><h2>Izglītības centrs</h2><p className="section-subtitle">Uzziniet vairāk par uzkrājumiem, apdrošināšanu un finanšu pārvaldību no mūsu praktiskajiem ceļvežiem un rakstiem.</p></FadeInElement>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {posts.map((post, index) => <FadeInElement key={post.title} className="card" style={{ animationDelay: `${index * 0.1}s` }}><h3>{post.title}</h3><p className="mb-4">{post.description}</p><a href={post.link} className="resource-link">Lasīt vairāk →</a></FadeInElement>)}
                </div>
            </div>
        </section>
    );
};

const ContactSection = () => (
    <section id="contact" className="section-padding">
        <div className="container">
            <FadeInElement className="text-center mb-16"><h2>Sazinies ar mani</h2><p className="section-subtitle">Aizpildi formu vai izmanto kādu no zemāk norādītajiem saziņas veidiem. Atbildēšu cik ātri vien iespējams.</p></FadeInElement>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                <FadeInElement as="form" action="https://formspree.io/f/your_form_id" method="POST" className="space-y-4">
                    <input type="text" name="Vārds" placeholder="Vārds" required className="form-input" />
                    <input type="email" name="E-pasts" placeholder="E-pasts" required className="form-input" />
                    <textarea name="Ziņa" rows="4" placeholder="Tavs jautājums vai komentārs" className="form-input" required></textarea>
                    <div className="flex items-start gap-3 text-sm"><input type="checkbox" id="gdpr" name="gdpr" required className="form-checkbox" /><label htmlFor="gdpr" className="text-slate-600">Piekrītu datu apstrādei saskaņā ar <a href="#">privātuma politiku</a>.</label></div>
                    <button type="submit" className="btn btn-primary w-full">Nosūtīt ziņu</button>
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

const QuizSectionStable = () => (
    <section id="quiz" className="section-padding bg-white">
        <div className="container">
            <FadeInElement className="text-center mb-16"><h2>Sāc savu ceļu uz finansiālo skaidrību</h2><p className="section-subtitle">Interaktīvā aptauja ir izstrādes stadijā. Lai saņemtu personalizētu piedāvājumu, lūdzu, izmantojiet kontaktformu.</p></FadeInElement>
            <FadeInElement className="text-center"><a href="#contact" className="btn btn-primary">Pieteikties konsultācijai</a></FadeInElement>
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
                <p>Mēs izmantojam sīkdatnes, lai uzlabotu lietošanas pieredzi. Uzzini vairāk mūsu <a href="#">privātuma politikā</a>.</p>
                <button onClick={acceptCookies} className="btn btn-accent btn-small">Piekrītu</button>
            </div>
        </div>
    );
};

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <CalculatorSection />
        <BlogSection />
        <ContactSection />
        <QuizSectionStable />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
