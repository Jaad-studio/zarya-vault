import React, { useState, useEffect } from 'react'
import { Lock, Shield, Watch, ChevronRight, ArrowRight, CheckCircle2, X, UploadCloud, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'

// --- TRANSLATIONS ---
const translations = {
  fr: {
    nav_concept: "Le Concept",
    nav_collection: "Collection",
    nav_estimate: "Estimer ma Montre",
    hero_badge: "Est. 2026",
    hero_title: "Sécurité & Luxe.",
    hero_subtitle: "Le courtier privé ultime pour les garde-temps les plus convoités. Sécurité absolue, authenticité garantie.",
    hero_btn: "Découvrir",
    status_label: "Statut",
    status_value: "Authentifié",
    concept_title: "Plus qu'une boutique. Une institution.",
    concept_desc: "ZARYA VAULT n'est pas un magasin traditionnel. C'est un réseau privé hautement sécurisé dédié à la recherche et la protection des montres de luxe les plus exclusives du monde. Des chronographes iconiques aux modèles sport en acier, nous offrons l'accès à l'inaccessible.",
    feature1_title: "100% Authentique",
    feature1_desc: "Chaque pièce est rigoureusement inspectée par nos maîtres horlogers.",
    feature2_title: "Sécurité Maximale",
    feature2_desc: "Transactions opérées avec une confidentialité de niveau militaire.",
    collection_title: "La Sélection",
    collection_desc: "Un aperçu confidentiel de nos pièces actuelles.",
    watch1_title: "Emerald 'Jumbo'",
    watch1_brand: "Acier Intégré - Automatique",
    watch2_title: "Cosmic Gold",
    watch2_brand: "Or Massif 18k - Chronographe",
    btn_request: "Demander l'Accès",
    btn_our_watches: "Nos Montres",
    trust_title: "Vendeur de Confiance",
    trust_1: "Vendeur Certifié Chrono24",
    trust_2: "Garantie Full Set",
    trust_3: "Livraison Mondiale Assurée",
    footer_desc: "Garde-temps d'Exception Sécurisés",
    footer_contact: "Contact Conciergerie",
    footer_links: "Liens Officiels",
    // Form
    form_title: "Estimer votre Montre",
    form_step1: "Quelle est la marque ?",
    form_step2: "Modèle ou Référence",
    form_step3: "État & Set",
    form_step4: "Photos (Optionnel)",
    form_step5: "Où envoyons-nous l'offre ?",
    form_btn_next: "Suivant",
    form_btn_submit: "Demander l'Estimation",
    form_placeholder_model: "Ex: Rolex Daytona 116500LN",
    form_placeholder_email: "Votre email",
    form_placeholder_phone: "Votre téléphone",
    set_full: "Full Set (Boîte + Papiers)",
    set_box: "Boîte uniquement",
    set_naked: "Montre seule",
    upload_text: "Cliquez pour ajouter des photos"
  },
  en: {
    nav_concept: "The Concept",
    nav_collection: "Collection",
    nav_estimate: "Estimate Watch",
    hero_badge: "Est. 2026",
    hero_title: "Secured Luxury.",
    hero_subtitle: "The ultimate private broker for highly sought-after timepieces. Uncompromising security, verified authenticity.",
    hero_btn: "Discover",
    status_label: "Status",
    status_value: "Verified Authentic",
    concept_title: "Beyond a boutique. An institution.",
    concept_desc: "ZARYA VAULT is not a traditional store. It is a highly secure, private network dedicated to sourcing and protecting the world's most exclusive luxury watches. From iconic chronographs to rare integrated steel sports models, we provide access to the inaccessible.",
    feature1_title: "100% Authenticity",
    feature1_desc: "Every timepiece is rigorously inspected by our master horologists.",
    feature2_title: "Vault Security",
    feature2_desc: "Transactions handled with military-grade privacy and protection.",
    collection_title: "The Selection",
    collection_desc: "A curated glimpse into our current holdings.",
    watch1_title: "Emerald 'Jumbo'",
    watch1_brand: "Integrated Steel - Automatic",
    watch2_title: "Cosmic Gold",
    watch2_brand: "Solid 18k - Chronograph",
    btn_request: "Request Access",
    btn_our_watches: "Our Watches",
    trust_title: "Trusted Globally",
    trust_1: "Chrono24 Trusted Seller",
    trust_2: "Full Set Guarantee",
    trust_3: "Insured Global Shipping",
    footer_desc: "Secured Luxury Timepieces",
    footer_contact: "Contact Concierge",
    footer_links: "Official Links",
    form_title: "Estimate Your Watch",
    form_step1: "What is the brand?",
    form_step2: "Model or Reference",
    form_step3: "Condition & Set",
    form_step4: "Photos (Optional)",
    form_step5: "Where should we send the offer?",
    form_btn_next: "Next Step",
    form_btn_submit: "Get Estimate",
    form_placeholder_model: "Ex: Rolex Daytona 116500LN",
    form_placeholder_email: "Your email",
    form_placeholder_phone: "Your phone number",
    set_full: "Full Set (Box + Papers)",
    set_box: "Box Only",
    set_naked: "Watch Only",
    upload_text: "Click to upload photos"
  },
  ar: {
    nav_concept: "المفهوم",
    nav_collection: "المجموعة",
    nav_estimate: "تقييم ساعتك",
    hero_badge: "تأسست ٢٠٢٦",
    hero_title: "الفخامة الآمنة",
    hero_subtitle: "الوسيط الخاص الأمثل للساعات الأكثر طلباً. أمان مطلق، أصالة مضمونة.",
    hero_btn: "اكتشف",
    status_label: "الحالة",
    status_value: "أصلي معتمد",
    concept_title: "أكثر من مجرد متجر. مؤسسة.",
    concept_desc: "ZARYA VAULT ليست متجراً تقليدياً. إنها شبكة خاصة وآمنة للغاية مكرسة للبحث عن أكثر الساعات الفاخرة حصرية في العالم وحمايتها.",
    feature1_title: "أصالة 100٪",
    feature1_desc: "يتم فحص كل ساعة بدقة من قبل خبراء الساعات لدينا.",
    feature2_title: "أمان الخزنة",
    feature2_desc: "تتم المعاملات بخصوصية وحماية عسكرية.",
    collection_title: "التشكيلة",
    collection_desc: "لمحة حصرية عن مقتنياتنا الحالية.",
    watch1_title: "إيميرالد جامبو",
    watch1_brand: "صلب متكامل - أوتوماتيك",
    watch2_title: "كوزميك جولد",
    watch2_brand: "ذهب خالص عيار 18 - كرونوغراف",
    btn_request: "طلب وصول",
    btn_our_watches: "ساعاتنا",
    trust_title: "بائع موثوق عالمياً",
    trust_1: "بائع معتمد في Chrono24",
    trust_2: "ضمان المجموعة الكاملة",
    trust_3: "شحن عالمي مؤمن",
    footer_desc: "ساعات فخمة آمنة",
    footer_contact: "اتصل بالكونسيرج",
    footer_links: "روابط رسمية",
    form_title: "تقييم ساعتك",
    form_step1: "ما هي العلامة التجارية؟",
    form_step2: "النموذج أو الرقم المرجعي",
    form_step3: "الحالة والمجموعة",
    form_step4: "الصور (اختياري)",
    form_step5: "أين نرسل العرض؟",
    form_btn_next: "التالي",
    form_btn_submit: "طلب التقييم",
    form_placeholder_model: "مثال: Rolex Daytona 116500LN",
    form_placeholder_email: "بريدك الإلكتروني",
    form_placeholder_phone: "رقم هاتفك",
    set_full: "مجموعة كاملة (علبة + أوراق)",
    set_box: "علبة فقط",
    set_naked: "الساعة فقط",
    upload_text: "انقر لتحميل الصور"
  }
}

// Custom Cursor Removed

function App() {
  const [lang, setLang] = useState('fr')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({ brand: '', model: '', condition: '', email: '', phone: '' })

  const t = translations[lang]

  useEffect(() => {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const nextStep = () => setFormStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setFormStep(prev => Math.max(prev - 1, 1))

  // Animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <div className={`app-container ${lang === 'ar' ? 'rtl-layout' : ''}`}>
      <header className="header glass-dark">
        <div className="logo">ZARYA <span className="text-accent">VAULT</span></div>
        <nav className="nav">
          <a href="#concept">{t.nav_concept}</a>
          <a href="#collection">{t.nav_collection}</a>
          <button onClick={() => setIsModalOpen(true)} className="btn-contact">{t.nav_estimate}</button>
          
          <div className="lang-switcher">
            <Globe size={16} />
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="fr">FR</option>
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="hero-huge-title"
            >
              ZARYA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hero-subtitle-centered"
            >
              {t.hero_subtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hero-cta" 
              style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}
            >
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-large">
                {t.nav_estimate} <ArrowRight size={20} />
              </button>
              <button onClick={() => {}} className="btn btn-large" style={{background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)'}}>
                {t.btn_our_watches}
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
              className="concept-image-wrapper"
            >
              <img src="/concept_glass.png" alt="The Vault Concept" className="concept-img dark-img-filter" />
              <div className="decoration-square dark-square"></div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="concept-text"
            >
              <h2 className="section-title">{t.concept_title}</h2>
              <p className="section-desc">{t.concept_desc}</p>
              
              <div className="features">
                <div className="feature glass-feature-dark">
                  <Shield className="feature-icon" size={24} />
                  <div>
                    <h3>{t.feature1_title}</h3>
                    <p>{t.feature1_desc}</p>
                  </div>
                </div>
                <div className="feature glass-feature-dark">
                  <Lock className="feature-icon" size={24} />
                  <div>
                    <h3>{t.feature2_title}</h3>
                    <p>{t.feature2_desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COLLECTION SECTION */}
        <section id="collection" className="section collection-section">
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
                <div className="watch-img-container">
                  <img src="/watch_light_1.png" alt="Watch 1" className="dark-img-filter" />
                </div>
                <div className="watch-info glass-info-dark">
                  <h3>{t.watch1_title}</h3>
                  <p className="watch-brand">{t.watch1_brand}</p>
                  <a href="#contact" className="watch-link">{t.btn_request} <ChevronRight size={16}/></a>
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
                <div className="watch-img-container">
                  <img src="/watch_light_2.png" alt="Watch 2" className="dark-img-filter" />
                </div>
                <div className="watch-info glass-info-dark">
                  <h3>{t.watch2_title}</h3>
                  <p className="watch-brand">{t.watch2_brand}</p>
                  <a href="#contact" className="watch-link">{t.btn_request} <ChevronRight size={16}/></a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <footer id="contact" className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h2>ZARYA <span className="text-accent">VAULT</span></h2>
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

      {/* ESTIMATE MODAL */}
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
    </div>
  )
}

export default App
