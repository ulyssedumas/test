// =============================================================================
// SAGEFLOW APP SWITCHER & MULTI-DEVICE CONTROLLER
// Manages switching between Pro, Maternité, Patiente, light/dark mode and devices
// =============================================================================

const AppSwitcher = {
  currentApp: 'pro',       // 'pro' | 'mater' | 'patiente'
  currentDevice: 'tablet', // 'tablet' | 'desktop' | 'mobile' | 'responsive'
  isDark: false,

  init() {
    this.setupEventListeners();
    this.switchApp('pro', 1);
  },

  setupEventListeners() {
    // Top app buttons
    document.querySelectorAll('[data-app-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const app = e.currentTarget.getAttribute('data-app-btn');
        this.switchApp(app);
      });
    });

    // Device buttons
    document.querySelectorAll('[data-device-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const device = e.currentTarget.getAttribute('data-device-btn');
        this.switchDevice(device);
      });
    });

    // Dark mode toggle
    const themeBtn = document.getElementById('btn-toggle-dark');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleDarkMode());
    }

    // Screen selector dropdown
    const screenSelect = document.getElementById('screen-select');
    if (screenSelect) {
      screenSelect.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        this.goToScreen(val);
      });
    }
  },

  switchApp(app, defaultScreen = 1) {
    this.currentApp = app;

    // Update active tab buttons
    document.querySelectorAll('[data-app-btn]').forEach(btn => {
      const match = btn.getAttribute('data-app-btn') === app;
      if (match) {
        btn.classList.add('bg-[var(--c-navy)]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-transparent', 'text-[var(--text-muted)]');
      } else {
        btn.classList.remove('bg-[var(--c-navy)]', 'text-white', 'shadow-sm');
        btn.classList.add('bg-transparent', 'text-[var(--text-muted)]');
      }
    });

    // Auto-adjust default device frame based on typical app use
    if (app === 'pro' && this.currentDevice !== 'tablet') {
      this.switchDevice('tablet');
    } else if (app === 'mater' && this.currentDevice !== 'desktop') {
      this.switchDevice('desktop');
    } else if (app === 'patiente' && this.currentDevice !== 'mobile') {
      this.switchDevice('mobile');
    }

    // Populate screen dropdown options
    this.updateScreenDropdown();

    // Render screen
    this.goToScreen(defaultScreen);
  },

  switchDevice(device) {
    this.currentDevice = device;
    const frame = document.getElementById('device-frame-container');
    if (!frame) return;

    // Reset dimensions classes
    frame.className = 'device-frame shadow-2xl transition-all duration-300 relative flex flex-col overflow-hidden';

    document.querySelectorAll('[data-device-btn]').forEach(btn => {
      const match = btn.getAttribute('data-device-btn') === device;
      if (match) {
        btn.classList.add('bg-[var(--c-pink)]', 'text-[var(--c-navy)]', 'font-bold');
        btn.classList.remove('bg-transparent', 'text-[var(--text-muted)]');
      } else {
        btn.classList.remove('bg-[var(--c-pink)]', 'text-[var(--c-navy)]', 'font-bold');
        btn.classList.add('bg-transparent', 'text-[var(--text-muted)]');
      }
    });

    switch(device) {
      case 'tablet':
        frame.style.width = '1080px';
        frame.style.height = '720px';
        frame.style.borderRadius = '28px';
        frame.style.border = '10px solid #1c2733';
        break;
      case 'desktop':
        frame.style.width = '1260px';
        frame.style.height = '760px';
        frame.style.borderRadius = '14px';
        frame.style.border = '1px solid var(--border-app)';
        break;
      case 'mobile':
        frame.style.width = '390px';
        frame.style.height = '780px';
        frame.style.borderRadius = '44px';
        frame.style.border = '12px solid #1c2733';
        break;
      case 'responsive':
        frame.style.width = '100%';
        frame.style.height = '100%';
        frame.style.borderRadius = '0px';
        frame.style.border = 'none';
        break;
    }
  },

  toggleDarkMode() {
    this.isDark = !this.isDark;
    const htmlEl = document.documentElement;
    const frame = document.getElementById('device-frame-container');
    const label = document.getElementById('dark-toggle-label');

    if (this.isDark) {
      htmlEl.classList.add('dark');
      if (label) label.textContent = '🌙 Mode Garde / Nuit';
    } else {
      htmlEl.classList.remove('dark');
      if (label) label.textContent = '☀️ Mode Cabinet / Jour';
    }

    // Re-render to refresh canvas colors
    if (this.currentApp === 'pro') ProSimulator.render(ProSimulator.activeScreen);
    else if (this.currentApp === 'mater') MaterSimulator.render(MaterSimulator.activeModule);
    else if (this.currentApp === 'patiente') PatienteSimulator.render(PatienteSimulator.activeModule);
  },

  updateScreenDropdown() {
    const sel = document.getElementById('screen-select');
    if (!sel) return;
    sel.innerHTML = '';

    if (this.currentApp === 'pro') {
      const screens = [
        "1. Dashboard & File Active (Accueil)",
        "2. Agenda Obstétrique & Triage",
        "3. Dossier Patiente - Header Fixe",
        "4. Roue SA & Frise Chronologique",
        "5. Consultation Active (Split 3 Volets & BCF)",
        "6. Partogramme Tactile B-Spline",
        "7. Gynécologie & Contraception",
        "8. Protocole IVG Médicamenteuse",
        "9. Rééducation Périnéale (Testing 0-5)",
        "10. Biologie & Ingestion HPRIM",
        "11. Générateur Prescriptions e-Ordonnance",
        "12. Feuille de Route Trimestrielle",
        "13. Facturation SESAM-Vitale FSE",
        "14. Compagnonnage & Télé-Expertise"
      ];
      screens.forEach((title, idx) => {
        const opt = document.createElement('option');
        opt.value = idx + 1;
        opt.textContent = title;
        sel.appendChild(opt);
      });
    } else if (this.currentApp === 'mater') {
      const modules = [
        "1. Tableau de Garde Prédictif (Salles)",
        "2. Passerelle d'Admission Rapide (Clé OTP)",
        "3. Visualiseur Clinique d'Urgence 1-Page",
        "4. Module de Liaison Sortie PRADO",
        "5. Transferts In Utero vers CHU Niv 3"
      ];
      modules.forEach((title, idx) => {
        const opt = document.createElement('option');
        opt.value = idx + 1;
        opt.textContent = title;
        sel.appendChild(opt);
      });
    } else if (this.currentApp === 'patiente') {
      const modules = [
        "1. Accueil & Roue de Grossesse Dynamique",
        "2. Questionnaire Pré-Consultation",
        "3. Coffre-fort & Scanner IA OCR",
        "4. e-Ordonnances & Feuilles de Route",
        "5. Projet de Naissance Collaboratif",
        "6. Passeport d'Urgence (Clé OTP & QR Code)",
        "7. Carnet Post-Partum & Dépistage EPDS"
      ];
      modules.forEach((title, idx) => {
        const opt = document.createElement('option');
        opt.value = idx + 1;
        opt.textContent = title;
        sel.appendChild(opt);
      });
    }
  },

  goToScreen(id) {
    const sel = document.getElementById('screen-select');
    if (sel) sel.value = id;

    if (this.currentApp === 'pro') {
      ProSimulator.render(id);
    } else if (this.currentApp === 'mater') {
      MaterSimulator.render(id);
    } else if (this.currentApp === 'patiente') {
      PatienteSimulator.render(id);
    }
  }
};

window.AppSwitcher = AppSwitcher;
