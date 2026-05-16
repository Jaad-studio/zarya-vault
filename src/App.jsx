import React, { useState, useEffect, useRef } from 'react'
import { Lock, Shield, Watch, ChevronRight, ArrowRight, CheckCircle2, X, UploadCloud, Globe, Search } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'

// --- TRANSLATIONS ---
const translations = {
  fr: {
    nav_concept: "L'Expertise",
    nav_collection: "Collection",
    nav_estimate: "Demander une Expertise",
    hero_badge: "Est. 2026",
    hero_title: "L'Excellence Horlogère.",
    hero_subtitle: "Votre partenaire de confiance pour l'acquisition et la valorisation de garde-temps exclusifs. Discrétion absolue, authenticité certifiée.",
    hero_btn: "Découvrir",
    status_label: "Statut",
    status_value: "Expertisé & Certifié",
    concept_title: "L'Art du Sourcing & de l'Acquisition",
    concept_desc: "Nous vous donnons accès à un inventaire hors-marché exclusif, réservé aux collectionneurs et investisseurs avertis. De la recherche de la pièce rare à son authentification experte, chaque étape est orchestrée avec la plus grande discrétion.",
    feature1_title: "Sourcing International",
    feature1_desc: "Accès privilégié aux collections privées et réseaux horlogers mondiaux pour trouver l'introuvable.",
    feature2_title: "Certification & Authenticité",
    feature2_desc: "Contrôle rigoureux et certification par nos maîtres horlogers, garantissant une intégrité totale.",
    collection_title: "Nos Montres",
    collection_desc: "Un aperçu confidentiel de nos pièces actuellement sous voûte.",
    watch1_title: "Rolex Daytona 'Panda'",
    watch1_brand: "116519LN - 2020 Full Set + Rubber B offert",
    watch2_title: "Rolex Datejust 41",
    watch2_brand: "126303 - 2023 Full Set - Cadran Motif Cannelé",
    btn_request: "Nous Contacter",
    btn_our_watches: "Nos Montres",
    trust_title: "Standards Internationaux",
    trust_1: "Trusted Seller Chrono24",
    trust_2: "Transactions par Escrow",
    trust_3: "Expédition Globale Sécurisée",
    footer_desc: "Cabinet privé de conseil et courtage en Haute Horlogerie.",
    footer_contact: "Contact Conciergerie",
    footer_links: "Liens Officiels",
    // Form Estimate
    form_title: "Demander une Expertise",
    form_step1: "Manufacture",
    form_step2: "Référence exacte de la pièce",
    form_step3: "État & Contenu (Set)",
    form_step4: "Documentation photographique (Optionnel)",
    form_step5: "Vos coordonnées confidentielles",
    form_btn_next: "Étape Suivante",
    form_btn_submit: "Transmettre au Cabinet",
    form_placeholder_model: "Ex: Rolex Daytona 116500LN",
    form_placeholder_email: "Adresse e-mail sécurisée",
    form_placeholder_phone: "Ligne directe (Téléphone)",
    set_full: "Full Set (Boîte d'origine & Certificats)",
    set_box: "Boîte uniquement",
    set_naked: "Montre seule",
    upload_text: "Cliquez pour déposer vos clichés HD",
    // Form Sourcing
    btn_sourcing: "Sourcing Privé",
    sourcing_title: "Recherche Hors-Marché",
    sourcing_desc: "Confiez-nous la référence exacte de la pièce introuvable que vous désirez. Notre réseau privé vous la sourcera dans les plus brefs délais.",
    sourcing_placeholder: "Ex: Audemars Piguet Royal Oak 15500ST",
    sourcing_btn_submit: "Lancer la recherche"
  },
  en: {
    nav_concept: "The Expertise",
    nav_collection: "Collection",
    nav_estimate: "Request an Appraisal",
    hero_badge: "Est. 2026",
    hero_title: "Horological Excellence.",
    hero_subtitle: "Your trusted partner for the acquisition and appraisal of exclusive timepieces. Absolute discretion, certified authenticity.",
    hero_btn: "Discover",
    status_label: "Status",
    status_value: "Appraised & Certified",
    concept_title: "The Art of Sourcing & Acquisition",
    concept_desc: "We provide access to an exclusive off-market inventory reserved for discerning collectors and investors. From locating the elusive piece to its expert authentication, every step is orchestrated with the utmost discretion.",
    feature1_title: "International Sourcing",
    feature1_desc: "Privileged access to private collections and global watch networks to find the unfindable.",
    feature2_title: "Certification & Authenticity",
    feature2_desc: "Rigorous control and certification by our master watchmakers, guaranteeing total integrity.",
    collection_title: "Our Watches",
    collection_desc: "A confidential glimpse into the pieces currently in our vault.",
    watch1_title: "Rolex Daytona 'Panda'",
    watch1_brand: "116519LN - 2020 Full Set + Free Rubber B Strap",
    watch2_title: "Rolex Datejust 41",
    watch2_brand: "126303 - 2023 Full Set - Fluted Motif Dial",
    btn_request: "Contact Us",
    btn_our_watches: "Our Watches",
    trust_title: "Global Standards",
    trust_1: "Chrono24 Trusted Seller",
    trust_2: "Secure Escrow Transactions",
    trust_3: "Fully Insured Global Shipping",
    footer_desc: "Private advisory and brokerage firm in Haute Horlogerie.",
    footer_contact: "Concierge Contact",
    footer_links: "Official Links",
    form_title: "Request an Appraisal",
    form_step1: "Manufacture",
    form_step2: "Exact Piece Reference",
    form_step3: "Condition & Contents (Set)",
    form_step4: "Photographic Documentation (Optional)",
    form_step5: "Your Confidential Contact Info",
    form_btn_next: "Next Step",
    form_btn_submit: "Submit to Advisory",
    form_placeholder_model: "Ex: Rolex Daytona 116500LN",
    form_placeholder_email: "Secure E-mail Address",
    form_placeholder_phone: "Direct Line (Phone)",
    set_full: "Full Set (Original Box & Papers)",
    set_box: "Box Only",
    set_naked: "Watch Only",
    upload_text: "Click to upload HD imagery",
    btn_sourcing: "Private Sourcing",
    sourcing_title: "Off-Market Request",
    sourcing_desc: "Provide us with the exact reference of the elusive piece you desire. Our private network will source it for you promptly.",
    sourcing_placeholder: "Ex: Audemars Piguet Royal Oak 15500ST",
    sourcing_btn_submit: "Initiate Search"
  },
  ar: {
    nav_concept: "الخبرة",
    nav_collection: "المجموعة",
    nav_estimate: "طلب تقييم",
    hero_badge: "تأسست ٢٠٢٦",
    hero_title: "التميز في صناعة الساعات",
    hero_subtitle: "شريكك الموثوق لاقتناء وتقييم الساعات الحصرية. سرية تامة، وأصالة معتمدة.",
    hero_btn: "اكتشف",
    status_label: "الحالة",
    status_value: "تم التقييم والاعتماد",
    concept_title: "فن البحث والاستحواذ",
    concept_desc: "نوفر لك وصولاً حصرياً إلى مخزون خارج السوق مخصص لهواة الجمع والمستثمرين المتميزين. من البحث عن القطعة النادرة إلى توثيقها الاحترافي، يتم تنسيق كل خطوة بأقصى درجات السرية.",
    feature1_title: "مصادر دولية",
    feature1_desc: "وصول استثنائي إلى المجموعات الخاصة وشبكات الساعات العالمية للعثور على القطع النادرة.",
    feature2_title: "الاعتماد والأصالة",
    feature2_desc: "رقابة صارمة واعتماد من قبل خبراء الساعات لدينا، مما يضمن النزاهة التامة.",
    collection_title: "ساعاتنا",
    collection_desc: "لمحة سرية عن القطع الموجودة حالياً في خزينتنا.",
    watch1_title: "رولكس دايتونا باندا",
    watch1_brand: "116519LN - طقم كامل 2020 + حزام Rubber B مجاني",
    watch2_title: "رولكس ديت جست 41",
    watch2_brand: "126303 - طقم كامل 2023 - مينا مخدد",
    btn_request: "اتصل بنا",
    btn_our_watches: "ساعاتنا",
    trust_title: "معايير عالمية",
    trust_1: "بائع معتمد في Chrono24",
    trust_2: "معاملات ضامن (Escrow) آمنة",
    trust_3: "شحن عالمي مؤمن بالكامل",
    footer_desc: "شركة استشارية ووساطة خاصة في الساعات الفاخرة.",
    footer_contact: "اتصل بالكونسيرج",
    footer_links: "روابط رسمية",
    form_title: "طلب تقييم",
    form_step1: "الشركة المصنعة",
    form_step2: "الرقم المرجعي الدقيق للقطعة",
    form_step3: "الحالة والمحتويات",
    form_step4: "التوثيق الفوتوغرافي (اختياري)",
    form_step5: "معلومات الاتصال السرية الخاصة بك",
    form_btn_next: "الخطوة التالية",
    form_btn_submit: "إرسال إلى القسم الاستشاري",
    form_placeholder_model: "مثال: Rolex Daytona 116500LN",
    form_placeholder_email: "بريد إلكتروني آمن",
    form_placeholder_phone: "خط مباشر (هاتف)",
    set_full: "مجموعة كاملة (العلبة الأصلية والشهادات)",
    set_box: "العلبة فقط",
    set_naked: "الساعة فقط",
    upload_text: "انقر لتحميل صور عالية الدقة",
    btn_sourcing: "البحث الخاص",
    sourcing_title: "طلب خارج السوق",
    sourcing_desc: "زودنا بالرقم المرجعي الدقيق للقطعة النادرة التي ترغب بها. ستقوم شبكتنا الخاصة بتوفيرها لك في أسرع وقت.",
    sourcing_placeholder: "مثال: Audemars Piguet Royal Oak 15500ST",
    sourcing_btn_submit: "بدء البحث"
  }
}

function App() {
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState('fr')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSourcingOpen, setIsSourcingOpen] = useState(false)
  
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({ brand: '', model: '', condition: '', email: '', phone: '' })
  const [sourcingData, setSourcingData] = useState({ reference: '', email: '', phone: '' })

  const collectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: collectionRef, offset: ["start end", "end start"] })
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, -150])

  const t = translations[lang]

  useEffect(() => {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800) // 1.8s Cinematic Vault Entry
    return () => clearTimeout(timer)
  }, [])

  const nextStep = () => setFormStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setFormStep(prev => Math.max(prev - 1, 1))

  // Animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  if (loading) {
    return (
      <div className="preloader">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="preloader-text"
        >
          ZARYA VAULT
        </motion.h1>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`app-container ${lang === 'ar' ? 'rtl-layout' : ''}`}
    >
      <header className="header glass-dark">
        <div className="logo">ZARYA VAULT</div>
        <nav className="nav">
          <a href="#concept">{t.nav_concept}</a>
          <a href="#collection">{t.nav_collection}</a>
          <button onClick={() => setIsModalOpen(true)} className="btn-contact">{t.nav_estimate}</button>
          
          <div className="lang-switcher-premium">
            {['fr', 'en', 'ar'].map((l) => (
              <React.Fragment key={l}>
                <button 
                  className={`lang-btn ${lang === l ? 'active' : ''}`}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
                {l !== 'ar' && <span className="lang-separator">|</span>}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION - Immersive */}
        <section className="hero immersive-hero">
          {/* Subtle Abstract Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="hero-video-bg"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-black-and-white-abstract-liquid-background-31714-large.mp4" type="video/mp4" />
          </video>
          
          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className="hero-huge-title"
            >
              ZARYA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="hero-subtitle-centered"
            >
              {t.hero_subtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="hero-cta" 
              style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}
            >
              <a href="#collection" className="btn btn-primary btn-large" style={{textDecoration: 'none'}}>
                {t.btn_our_watches}
              </a>
              <button onClick={() => setIsSourcingOpen(true)} className="btn btn-large" style={{background: 'var(--color-accent)', color: 'var(--color-bg-dark)', border: 'none', fontWeight: 700}}>
                <Search size={20} /> {t.btn_sourcing}
              </button>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-large" style={{background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)'}}>
                {t.nav_estimate} <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* CONCEPT SECTION */}
        <section id="concept" className="section concept-section">
          <div className="container concept-layout">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="concept-text editorial-text"
            >
              <h2 className="section-title">{t.concept_title}</h2>
              <p className="section-desc">{t.concept_desc}</p>
              
              <div className="features">
                <div className="feature glass-feature-dark">
                  <Globe className="feature-icon" size={24} />
                  <div>
                    <h3>{t.feature1_title}</h3>
                    <p>{t.feature1_desc}</p>
                  </div>
                </div>
                <div className="feature glass-feature-dark">
                  <CheckCircle2 className="feature-icon" size={24} />
                  <div>
                    <h3>{t.feature2_title}</h3>
                    <p>{t.feature2_desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="concept-image-wrapper editorial-image-wrapper"
            >
              <img src="/sourcing_macro.png" alt="Sourcing & Authentication" className="concept-img dark-img-filter editorial-img" />
              <div className="decoration-square dark-square editorial-square"></div>
            </motion.div>
          </div>
        </section>

        {/* COLLECTION SECTION */}
        <section id="collection" ref={collectionRef} className="section collection-section">
          <div className="container">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="section-header"
            >
              <h2 className="section-title text-center">{t.collection_title}</h2>
              <p className="section-desc text-center">{t.collection_desc}</p>
            </motion.div>
            
            <div className="watch-grid">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
                className="watch-card dark-card"
              >
                <motion.div style={{ y: yParallax1 }} className="watch-img-container">
                  <img src="/daytona.png" alt="Rolex Daytona Panda" className="dark-img-filter" />
                </motion.div>
                <div className="watch-info glass-info-dark">
                  <h3>{t.watch1_title}</h3>
                  <p className="watch-brand">{t.watch1_brand}</p>
                  <a href={`https://wa.me/33788408004?text=${encodeURIComponent("Salut, j'aimerais plus d'infos sur la montre " + t.watch1_title)}`} target="_blank" rel="noopener noreferrer" className="watch-link btn-text" style={{padding:0, textDecoration: 'none', display: 'inline-flex', alignItems: 'center'}}>{t.btn_request} <ChevronRight size={16}/></a>
                </div>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
                }}
                className="watch-card offset-card dark-card"
              >
                <motion.div style={{ y: yParallax2 }} className="watch-img-container">
                  <img src="/datejust.png" alt="Rolex Datejust 41" className="dark-img-filter" />
                </motion.div>
                <div className="watch-info glass-info-dark">
                  <h3>{t.watch2_title}</h3>
                  <p className="watch-brand">{t.watch2_brand}</p>
                  <a href={`https://wa.me/33788408004?text=${encodeURIComponent("Salut, j'aimerais plus d'infos sur la montre " + t.watch2_title)}`} target="_blank" rel="noopener noreferrer" className="watch-link btn-text" style={{padding:0, textDecoration: 'none', display: 'inline-flex', alignItems: 'center'}}>{t.btn_request} <ChevronRight size={16}/></a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <footer id="contact" className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h2>ZARYA VAULT</h2>
            <p>{t.footer_desc}</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>{t.footer_contact}</h4>
              <p>concierge@zarya.fr</p>
              <p>+33 1 00 00 00 00</p>
            </div>
            <div className="link-group">
              <h4>{t.footer_links}</h4>
              <a href="#">Instagram</a>
              <a href="#">Chrono24 Store</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ESTIMATE MODAL (SELL/APPRAISAL) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="modal-content glass-dark-modal"
          >
            <button className="modal-close" onClick={() => {setIsModalOpen(false); setFormStep(1);}}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <h2>{t.form_title}</h2>
              <div className="step-indicator">
                {[1,2,3,4,5].map(step => (
                  <div key={step} className={`step-dot ${step === formStep ? 'active' : step < formStep ? 'done' : ''}`} />
                ))}
              </div>
            </div>

            <div className="modal-body">
              {formStep === 1 && (
                <div className="form-step slide-in">
                  <h3>{t.form_step1}</h3>
                  <div className="brand-options">
                    {['Rolex', 'Audemars Piguet', 'Patek Philippe', 'Autre'].map(brand => (
                      <button 
                        key={brand} 
                        className={`brand-btn ${formData.brand === brand ? 'selected' : ''}`}
                        onClick={() => {setFormData({...formData, brand}); nextStep();}}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="form-step slide-in">
                  <h3>{t.form_step2}</h3>
                  <input 
                    type="text" 
                    placeholder={t.form_placeholder_model}
                    className="form-input"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                  <div className="form-actions">
                    <button className="btn-text" onClick={prevStep}>Retour</button>
                    <button className="btn btn-primary" onClick={nextStep} disabled={!formData.model}>{t.form_btn_next}</button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="form-step slide-in">
                  <h3>{t.form_step3}</h3>
                  <div className="condition-options">
                    <button className={`cond-btn ${formData.condition === 'full' ? 'selected' : ''}`} onClick={() => {setFormData({...formData, condition: 'full'}); nextStep();}}>
                      {t.set_full}
                    </button>
                    <button className={`cond-btn ${formData.condition === 'box' ? 'selected' : ''}`} onClick={() => {setFormData({...formData, condition: 'box'}); nextStep();}}>
                      {t.set_box}
                    </button>
                    <button className={`cond-btn ${formData.condition === 'naked' ? 'selected' : ''}`} onClick={() => {setFormData({...formData, condition: 'naked'}); nextStep();}}>
                      {t.set_naked}
                    </button>
                  </div>
                  <div className="form-actions-left">
                     <button className="btn-text" onClick={prevStep}>Retour</button>
                  </div>
                </div>
              )}

              {formStep === 4 && (
                <div className="form-step slide-in">
                  <h3>{t.form_step4}</h3>
                  <div className="upload-box">
                    <UploadCloud size={32} className="upload-icon" />
                    <p>{t.upload_text}</p>
                  </div>
                  <div className="form-actions">
                    <button className="btn-text" onClick={prevStep}>Retour</button>
                    <button className="btn btn-primary" onClick={nextStep}>{t.form_btn_next}</button>
                  </div>
                </div>
              )}

              {formStep === 5 && (
                <div className="form-step slide-in">
                  <h3>{t.form_step5}</h3>
                  <input 
                    type="email" 
                    placeholder={t.form_placeholder_email}
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <input 
                    type="tel" 
                    placeholder={t.form_placeholder_phone}
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <div className="form-actions">
                    <button className="btn-text" onClick={prevStep}>Retour</button>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>{t.form_btn_submit}</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* SOURCING MODAL (BUY/FIND) */}
      {isSourcingOpen && (
        <div className="modal-overlay">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="modal-content glass-dark-modal"
          >
            <button className="modal-close" onClick={() => setIsSourcingOpen(false)}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <h2>{t.sourcing_title}</h2>
              <p style={{color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem'}}>{t.sourcing_desc}</p>
            </div>

            <div className="modal-body" style={{ minHeight: 'auto' }}>
              <div className="form-step slide-in">
                <input 
                  type="text" 
                  placeholder={t.sourcing_placeholder}
                  className="form-input"
                  value={sourcingData.reference}
                  onChange={(e) => setSourcingData({...sourcingData, reference: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder={t.form_placeholder_email}
                  className="form-input"
                  value={sourcingData.email}
                  onChange={(e) => setSourcingData({...sourcingData, email: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder={t.form_placeholder_phone}
                  className="form-input"
                  style={{marginBottom: '2rem'}}
                  value={sourcingData.phone}
                  onChange={(e) => setSourcingData({...sourcingData, phone: e.target.value})}
                />
                <div className="form-actions" style={{justifyContent: 'flex-end'}}>
                  <button className="btn btn-primary" onClick={() => setIsSourcingOpen(false)} disabled={!sourcingData.reference || !sourcingData.email}>
                    {t.sourcing_btn_submit}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  )
}

export default App
