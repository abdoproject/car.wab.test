/**
 * Modern Car Rental JS
 * Features: Multi-language, Dark/Light Mode, Lightbox, Smooth Scroll
 */

// --- Translation Dictionary ---
const translations = {
    ar: {
        logo: " موقع عبدالرزاق لتجرب",
        home: "الرئيسية",
        cars: "السيارات",
        about: "من نحن",
        contact: "اتصل بنا",
        hero_title: "استأجر سيارة أحلامك اليوم",
        hero_subtitle: "نقدم لك أفضل السيارات الفاخرة بأسعار تنافسية وخدمة استثنائية.",
        browse_cars: "تصفح السيارات",
        our_fleet: "أسطولنا المميز",
        per_day: "يومياً",
        view_details: "عرض التفاصيل",
        specs: "المواصفات",
        model: "الموديل",
        year: "السنة",
        transmission: "ناقل الحركة",
        fuel: "الوقود",
        seats: "المقاعد",
        price_per_day: "السعر باليوم",
        weekly_discount: "خصم الأسبوع",
        rental_terms: "شروط الكراء",
        deposit: "الوديعة",
        km_limit: "حدود الكيلومترات",
        book_whatsapp: "احجز عبر واتساب",
        back_home: "العودة للرئيسية",
        automatic: "أوتوماتيك",
        petrol: "بنزين",
        unlimited: "غير محدود",
        copyright: "© 2026 فخامة للسيارات. جميع الحقوق محفوظة."
    },
    en: {
        logo: "wab abderazak for test",
        home: "Home",
        cars: "Cars",
        about: "About",
        contact: "Contact",
        hero_title: "Rent Your Dream Car Today",
        hero_subtitle: "We offer the best luxury cars at competitive prices and exceptional service.",
        browse_cars: "Browse Cars",
        our_fleet: "Our Premium Fleet",
        per_day: "/ Day",
        view_details: "View Details",
        specs: "Specifications",
        model: "Model",
        year: "Year",
        transmission: "Transmission",
        fuel: "Fuel",
        seats: "Seats",
        price_per_day: "Price per day",
        weekly_discount: "Weekly Discount",
        rental_terms: "Rental Terms",
        deposit: "Deposit",
        km_limit: "KM Limit",
        book_whatsapp: "Book via WhatsApp",
        back_home: "Back to Home",
        automatic: "Automatic",
        petrol: "Petrol",
        unlimited: "Unlimited",
        copyright: "© 2026 Luxury Cars. All rights reserved."
    },
    fr: {
        logo: " wab abderazak for test",
        home: "Accueil",
        cars: "Voitures",
        about: "À propos",
        contact: "Contact",
        hero_title: "Louez la voiture de vos rêves",
        hero_subtitle: "Nous proposons les meilleures voitures de luxe à des prix compétitifs.",
        browse_cars: "Parcourir",
        our_fleet: "Notre Flotte Premium",
        per_day: "/ Jour",
        view_details: "Voir Détails",
        specs: "Spécifications",
        model: "Modèle",
        year: "Année",
        transmission: "Transmission",
        fuel: "Carburant",
        seats: "Sièges",
        price_per_day: "Prix par jour",
        weekly_discount: "Remise Hebdomadaire",
        rental_terms: "Conditions de Location",
        deposit: "Dépôt",
        km_limit: "Limite KM",
        book_whatsapp: "Réserver via WhatsApp",
        back_home: "Retour à l'accueil",
        automatic: "Automatique",
        petrol: "Essence",
        unlimited: "Illimité",
        copyright: "© 2026 Luxury Cars. Tous droits réservés."
    }
};

// --- State Management ---
let currentLang = localStorage.getItem('lang') || 'ar';
let currentTheme = localStorage.getItem('theme') || 'light';

// --- Theme Logic ---
const toggleTheme = () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
};

const updateThemeIcon = () => {
    const icon = document.querySelector('#theme-icon');
    if (icon) {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
};

// --- Language Logic ---
const updateLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update WhatsApp links if needed
    updateWhatsAppLinks();
};

const updateWhatsAppLinks = () => {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    const carModel = document.querySelector('[data-car-model]')?.textContent || 'Car';
    const phone = "212624139690"; // CHANGE THIS TO YOUR NUMBER

    whatsappBtns.forEach(btn => {
        const message = currentLang === 'ar' 
            ? `مرحباً، أريد حجز سيارة ${carModel}. هل هي متوفرة؟`
            : `Hello, I want to book ${carModel}. Is it available?`;
        btn.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    });
};

// --- Lightbox Logic ---
const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();

    // Apply saved language
    updateLanguage(currentLang);
    const langSelect = document.querySelector('#lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => updateLanguage(e.target.value));
    }

    // Theme toggle event
    const themeBtn = document.querySelector('#theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Init Lightbox
    initLightbox();
});
