import React, { useState, useEffect, useRef } from 'react'
import { Lock, Shield, Watch, ChevronRight, ArrowRight, CheckCircle2, X, UploadCloud, Globe, Search, MessageCircle } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './App.css'

// --- TRANSLATIONS ---
const translations = {
  fr: {
    nav_concept: "L'Expertise",
    nav_collection: "Collection",
    nav_estimate: "Vendre ma Montre",
    hero_badge: "Est. 2026",
    hero_title: "L'Excellence Horlogère.",
    hero_subtitle: "Votre partenaire de confiance pour l'acquisition et la valorisation de garde-temps exclusifs. Discrétion absolue, authenticité certifiée.",
    hero_btn: "Découvrir",
    status_label: "Statut",
    status_value: "Expertisé & Certifié",
    concept_title: "L'Art de l'Introuvable.",
    concept_desc: "Nous opérons là où les catalogues s'arrêtent. Un accès direct aux collections privées les plus fermées du monde pour dénicher la montre exacte que vous désirez.",
    feature1_title: "Réseau Confidentiel",
    feature1_desc: "Connexion directe et discrète avec les collectionneurs et marchands mondiaux.",
    feature2_title: "Authentification Absolue",
    feature2_desc: "Chaque garde-temps est rigoureusement inspecté et certifié par nos maîtres horlogers avant la remise en main propre.",
    collection_title: "Nos Montres",
    collection_desc: "Toutes nos montres sont garanties 1 an.",
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
    footer_desc: "Cabinet privé de conseil et expertise en Haute Horlogerie.",
    footer_contact: "Contact Conciergerie",
    footer_links: "Liens Officiels",
    // Form Estimate
    form_title: "Vendre ma Montre",
    form_step1: "Manufacture",
    form_step2: "Référence exacte de la pièce",
    form_step3: "État & Contenu (Set)",
    form_step4: "Documentation photographique (Optionnel)",
    form_step5: "Vos coordonnées confidentielles",
    form_btn_next: "Étape Suivante",
    form_btn_submit: "Transmettre au Cabinet",
    form_placeholder_model: "Modèle de la montre",
    form_placeholder_email: "Email",
    form_placeholder_phone: "Téléphone",
    set_full: "Full Set (Boîte d'origine & Certificats)",
    set_box: "Boîte uniquement",
    set_naked: "Montre seule",
    upload_text: "Cliquez pour déposer vos clichés HD",
    // Form Sourcing
    btn_sourcing: "Trouver une Montre",
    sourcing_title: "Rechercher une Montre",
    sourcing_desc: "",
    sourcing_placeholder: "Modèle ou Référence recherchée",
    sourcing_btn_submit: "Lancer la recherche"
  },
  en: {
    nav_concept: "The Expertise",
    nav_collection: "Collection",
    nav_estimate: "Sell my Watch",
    hero_badge: "Est. 2026",
    hero_title: "Horological Excellence.",
    hero_subtitle: "Your trusted partner for the acquisition and appraisal of exclusive timepieces. Absolute discretion, certified authenticity.",
    hero_btn: "Discover",
    status_label: "Status",
    status_value: "Appraised & Certified",
    concept_title: "The Art of the Unfindable.",
    concept_desc: "We operate where catalogs end. Direct access to the world's most exclusive private collections to source the exact timepiece you desire.",
    feature1_title: "Confidential Network",
    feature1_desc: "Direct and discreet connection with global collectors and dealers.",
    feature2_title: "Absolute Authentication",
    feature2_desc: "Every timepiece is rigorously inspected and certified by our master watchmakers prior to handover.",
    collection_title: "Our Watches",
    collection_desc: "All our watches come with a 1-year warranty.",
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
    footer_desc: "Private advisory and expertise firm in Haute Horlogerie.",
    footer_contact: "Concierge Contact",
    footer_links: "Official Links",
    form_title: "Sell my Watch",
    form_step1: "Manufacture",
    form_step2: "Exact Piece Reference",
    form_step3: "Condition & Contents (Set)",
    form_step4: "Photographic Documentation (Optional)",
    form_step5: "Your Confidential Contact Info",
    form_btn_next: "Next Step",
    form_btn_submit: "Submit to Advisory",
    form_placeholder_model: "Watch Model",
    form_placeholder_email: "Email",
    form_placeholder_phone: "Phone",
    set_full: "Full Set (Original Box & Papers)",
    set_box: "Box Only",
    set_naked: "Watch Only",
    upload_text: "Click to upload HD imagery",
    btn_sourcing: "Find a Watch",
    sourcing_title: "Find a Watch",
    sourcing_desc: "",
    sourcing_placeholder: "Desired Model or Reference",
    sourcing_btn_submit: "Search"
  },
  ar: {
    nav_concept: "الخبرة",
    nav_collection: "المجموعة",
    nav_estimate: "بيع ساعتي",
    hero_badge: "تأسست ٢٠٢٦",
    hero_title: "التميز في صناعة الساعات",
    hero_subtitle: "شريكك الموثوق لاقتناء وتقييم الساعات الحصرية. سرية تامة، وأصالة معتمدة.",
    hero_btn: "اكتشف",
    status_label: "الحالة",
    status_value: "تم التقييم والاعتماد",
    concept_title: "فن الوصول إلى النوادر.",
    concept_desc: "نعمل حيث تنتهي الكتالوجات. وصول مباشر لأكثر المجموعات الخاصة حصرية في العالم لنوفر لك الساعة التي تبحث عنها.",
    feature1_title: "شبكة سرية",
    feature1_desc: "تواصل مباشر وسري مع هواة الجمع والتجار حول العالم.",
    feature2_title: "توثيق مطلق",
    feature2_desc: "تُفحص كل ساعة وتُعتمد بدقة من قبل خبراء الساعات لدينا قبل التسليم.",
    collection_title: "ساعاتنا",
    collection_desc: "جميع ساعاتنا مضمونة لمدة سنة واحدة.",
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
    form_title: "بيع ساعتي",
    form_step1: "الشركة المصنعة",
    form_step2: "الرقم المرجعي الدقيق للقطعة",
    form_step3: "الحالة والمحتويات",
    form_step4: "التوثيق الفوتوغرافي (اختياري)",
    form_step5: "معلومات الاتصال السرية الخاصة بك",
    form_btn_next: "الخطوة التالية",
    form_btn_submit: "إرسال إلى القسم الاستشاري",
    form_placeholder_model: "موديل الساعة",
    form_placeholder_email: "البريد الإلكتروني",
    form_placeholder_phone: "الهاتف",
    set_full: "مجموعة كاملة (العلبة الأصلية والشهادات)",
    set_box: "العلبة فقط",
    set_naked: "الساعة فقط",
    upload_text: "انقر لتحميل صور عالية الدقة",
    btn_sourcing: "البحث عن ساعة",
    sourcing_title: "طلب بحث عن ساعة",
    sourcing_desc: "",
    sourcing_placeholder: "الموديل أو الرقم المرجعي",
    sourcing_btn_submit: "بدء البحث"
  }
}

function App() {
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState('fr')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSourcingOpen, setIsSourcingOpen] = useState(false)
  
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({ brand: '', model: '', condition: '', phone: '' })
  const [sourcingData, setSourcingData] = useState({ reference: '', phone: '' })

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

  const handleEstimateSubmit = () => {
    const text = `Bonjour Zarya Vault, je souhaite faire estimer ma montre.%0A*Marque :* ${formData.brand}%0A*Modèle :* ${formData.model}%0A*État/Set :* ${formData.condition}%0A*Téléphone :* ${formData.phone}`
    window.open(`https://wa.me/33788408004?text=${text}`, '_blank')
    setIsModalOpen(false)
  }

  const handleSourcingSubmit = () => {
    const text = `Bonjour Zarya Vault, je recherche une pièce spécifique.%0A*Référence :* ${sourcingData.reference}%0A*Téléphone :* ${sourcingData.phone}`
    window.open(`https://wa.me/33788408004?text=${text}`, '_blank')
    setIsSourcingOpen(false)
  }

  // Animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader"
            className="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, scale: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="preloader-text"
            >
              ZARYA VAULT
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

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
            muted 
            playsInline 
            className="hero-video-bg"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
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
        <section id="concept" className="concept-section container">
          <div className="concept-grid-minimal">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="concept-text-minimal"
            >
              <h2 className="serif-title">{t.concept_title}</h2>
              <p className="concept-lead">{t.concept_desc}</p>
              
              <div className="features-minimal">
                <div className="feature-item-minimal">
                  <span className="feature-number">01</span>
                  <div>
                    <h3>{t.feature1_title}</h3>
                    <p>{t.feature1_desc}</p>
                  </div>
                </div>
                <div className="feature-item-minimal">
                  <span className="feature-number">02</span>
                  <div>
                    <h3>{t.feature2_title}</h3>
                    <p>{t.feature2_desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="concept-image-minimal"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <img src="/sourcing_macro.png" alt="Sourcing & Authentication" className="minimal-img" />
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
              <div className="guarantee-badge">
                <Shield size={20} className="guarantee-icon" />
                <span>{t.collection_desc}</span>
              </div>
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
              <p>+33 7 88 40 80 04</p>
            </div>
            <div className="link-group">
              <h4>{t.footer_links}</h4>
              <a href="#">Instagram</a>
              <a href="#">Chrono24 Store</a>
            </div>
          </div>
        </div>
      </footer>

      <a 
        href="https://wa.me/33788408004" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

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
                    type="tel" 
                    placeholder={t.form_placeholder_phone}
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <div className="form-actions">
                    <button className="btn-text" onClick={prevStep}>Retour</button>
                    <button className="btn btn-primary" onClick={handleEstimateSubmit}>{t.form_btn_submit}</button>
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
                  type="tel" 
                  placeholder={t.form_placeholder_phone}
                  className="form-input"
                  style={{marginBottom: '2rem'}}
                  value={sourcingData.phone}
                  onChange={(e) => setSourcingData({...sourcingData, phone: e.target.value})}
                />
                <div className="form-actions" style={{justifyContent: 'flex-end'}}>
                  <button className="btn btn-primary" onClick={handleSourcingSubmit} disabled={!sourcingData.reference || !sourcingData.phone}>
                    {t.sourcing_btn_submit}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
    </>
  )
}

export default App
