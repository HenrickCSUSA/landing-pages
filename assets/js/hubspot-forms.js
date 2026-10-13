/* 
 * CS INSTRUMENTS Landing Pages
 * HubSpot Forms Integration
 */

/**
 * Lädt ein HubSpot-Formular in einen Container
 * @param {string} formId - HubSpot Form ID
 * @param {string} targetId - ID des Ziel-Containers (mit #)
 * @param {object} options - Zusätzliche Optionen
 */
function loadHubSpotForm(formId, targetId, options = {}) {
    // Warten bis HubSpot Forms API geladen ist
    if (!window.hbspt) {
        console.error('HubSpot Forms API not loaded');
        return;
    }

    const defaultOptions = {
        portalId: "43972642",  // CS INSTRUMENTS Portal ID
        formId: formId,
        target: targetId,
        
        // Standard-Callbacks
        onFormReady: function($form) {
            console.log('HubSpot Form ready:', formId);
            
            // Custom Styling nach dem Laden
            styleHubSpotForm($form);
        },
        
        onFormSubmit: function($form) {
            console.log('HubSpot Form submitted:', formId);
        },
        
        onFormSubmitted: function($form) {
            console.log('HubSpot Form submission complete:', formId);
            
            // Optional: Google Analytics Event tracken
            if (window.gtag) {
                gtag('event', 'form_submit', {
                    'form_id': formId,
                    'form_name': 'Landing Page Form'
                });
            }
            
            // Optional: Scroll zur Danke-Nachricht
            setTimeout(() => {
                const thankYou = document.querySelector('.submitted-message');
                if (thankYou) {
                    thankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    };

    // Merge mit custom options
    const finalOptions = { ...defaultOptions, ...options };

    // Formular erstellen
    hbspt.forms.create(finalOptions);
}

/**
 * Stylt HubSpot-Formulare für CS INSTRUMENTS Design
 */
function styleHubSpotForm($form) {
    // Füge Custom-Klasse hinzu
    $form.addClass('cs-hubspot-form');
    
    // Style Submit Button
    const submitButton = $form.find('input[type="submit"]');
    submitButton.addClass('btn');
    
    // Style Inputs
    $form.find('input[type="text"], input[type="email"], input[type="tel"], textarea, select').each(function() {
        $(this).addClass('form-input');
    });
}

/**
 * Initialisiert HubSpot Tracking Code
 */
function initHubSpotTracking() {
    // HubSpot Tracking Code wird automatisch geladen
    // Diese Funktion kann für zusätzliche Tracking-Events verwendet werden
    
    console.log('HubSpot Tracking initialized');
}

/**
 * Validiert E-Mail-Adresse
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validiert Telefonnummer (US-Format)
 */
function validatePhone(phone) {
    // Entfernt alle nicht-numerischen Zeichen
    const cleaned = phone.replace(/\D/g, '');
    // Prüft ob 10 oder 11 Ziffern (mit oder ohne Ländercode)
    return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Formatiert Telefonnummer im US-Format
 */
function formatPhoneUS(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

/**
 * Wartet auf HubSpot Forms API
 */
function waitForHubSpot(callback) {
    if (window.hbspt && window.hbspt.forms) {
        callback();
    } else {
        setTimeout(() => waitForHubSpot(callback), 100);
    }
}

/**
 * Beispiel: Lädt Standard-Kontaktformular
 */
function loadContactForm() {
    waitForHubSpot(() => {
        loadHubSpotForm(
            'IHRE-FORM-ID-HIER',  // Ersetzen mit echter Form ID
            '#hubspot-form-container',
            {
                // Custom Options hier
                cssClass: 'contact-form',
                submitButtonClass: 'btn btn-primary'
            }
        );
    });
}

// Export für globale Verwendung
window.CSInstruments = window.CSInstruments || {};
window.CSInstruments.forms = {
    loadHubSpotForm,
    styleHubSpotForm,
    initHubSpotTracking,
    validateEmail,
    validatePhone,
    formatPhoneUS,
    waitForHubSpot,
    loadContactForm
};

console.log('CS INSTRUMENTS: HubSpot Forms module loaded ✓');
