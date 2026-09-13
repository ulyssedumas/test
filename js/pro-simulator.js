// =============================================================================
// SAGEFLOW PRO SIMULATOR - 14 SCREENS & CLINICAL MODULES (TABLETTE PAYSAGE & DESKTOP)
// Based on Cahier des Charges v2.3 - Table 5
// =============================================================================

const ProSimulator = {
  activeScreen: 1,

  // Render the selected screen (1 to 14)
  render(screenId) {
    this.activeScreen = screenId;
    const container = document.getElementById('screen-viewport');
    if (!container) return;

    let html = '';
    switch(screenId) {
      case 1: html = this.screenDashboard(); break;
      case 2: html = this.screenAgenda(); break;
      case 3: html = this.screenHeaderFixe(); break;
      case 4: html = this.screenRoueTimeline(); break;
      case 5: html = this.screenConsultationSplit(); break;
      case 6: html = this.screenPartogramme(); break;
      case 7: html = this.screenGyneco(); break;
      case 8: html = this.screenIVG(); break;
      case 9: html = this.screenReeducation(); break;
      case 10: html = this.screenBiologie(); break;
      case 11: html = this.screenOrdonnances(); break;
      case 12: html = this.screenFeuilleRoute(); break;
      case 13: html = this.screenFacturation(); break;
      case 14: html = this.screenTeleExpertise(); break;
      default: html = this.screenDashboard(); break;
    }

    container.innerHTML = `<div class="screen-fade h-full w-full flex flex-col">${html}</div>`;
    this.afterRender(screenId);
  },

  afterRender(screenId) {
    // Re-initialize BCF canvas if present on screen 3, 5, or 6
    if (document.getElementById('bcf-canvas-pro')) {
      if (window.proBcfMonitor) window.proBcfMonitor.destroy();
      window.proBcfMonitor = new BcfMonitor('bcf-canvas-pro', 'bcf-bpm-val');
    }
  },

  // Common Header for SageFlow Pro
  proTopBar(activeTitle, badgeText = '100% Synchronisé (CRDT Local-First)') {
    return `
      <header class="glass-header px-5 py-3 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <img src="assets/logo-icon.svg" alt="SageFlow" class="w-7 h-7">
            <span class="font-['Montserrat'] font-bold text-base tracking-tight" style="color: var(--c-navy);">
              Sage<span style="color: var(--c-brown);">Flow</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ml-1" style="background: var(--c-skin-linen); color: var(--c-navy);">PRO</span>
            </span>
          </div>
          <span class="text-xs text-gray-400">|</span>
          <span class="text-xs font-semibold text-[var(--text-main)]">${activeTitle}</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="glass-badge badge-success">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>${badgeText}</span>
          </div>

          <div class="flex items-center gap-2 pl-3 border-l border-[var(--border-app)]">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style="background: var(--c-pink); color: var(--c-brown);">
              CR
            </div>
            <div class="text-left text-xs leading-tight hidden md:block">
              <div class="font-bold text-[var(--text-main)]">Clémence Roche</div>
              <div class="text-[var(--text-muted)] text-[10px]">Sage-Femme DE • Libéral</div>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  // ===========================================================================
  // SCREEN 1 : DASHBOARD & FILE ACTIVE
  // ===========================================================================
  screenDashboard() {
    return `
      ${this.proTopBar('Tableau de Bord & File Active')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <!-- Welcome Banner & Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="glass-card p-4 flex items-center justify-between">
            <div>
              <div class="text-xs text-[var(--text-muted)] font-medium">File Active Patientes</div>
              <div class="text-2xl font-bold font-['Montserrat'] text-[var(--c-navy)] mt-1">42</div>
              <div class="text-[11px] text-emerald-600 font-semibold mt-0.5">+4 ce mois-ci</div>
            </div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style="background: var(--c-pink-light); color: var(--c-brown);">
              🤰
            </div>
          </div>

          <div class="glass-card p-4 flex items-center justify-between">
            <div>
              <div class="text-xs text-[var(--text-muted)] font-medium">Consultations Aujourd'hui</div>
              <div class="text-2xl font-bold font-['Montserrat'] text-[var(--c-navy)] mt-1">7</div>
              <div class="text-[11px] text-[var(--c-brown-muted)] mt-0.5">Prochaine : 14h15 (Élodie M.)</div>
            </div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style="background: var(--c-blue-sky-bg); color: var(--c-blue-ocean);">
              📅
            </div>
          </div>

          <div class="glass-card p-4 flex items-center justify-between">
            <div>
              <div class="text-xs text-[var(--text-muted)] font-medium">Bilans à Valider (IA OCR)</div>
              <div class="text-2xl font-bold font-['Montserrat'] text-[var(--c-terracotta)] mt-1">3</div>
              <div class="text-[11px] text-[var(--c-terracotta)] font-semibold mt-0.5">1 carence ferritine</div>
            </div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style="background: var(--c-terracotta-bg); color: var(--c-terracotta);">
              📑
            </div>
          </div>

          <div class="glass-card p-4 flex items-center justify-between">
            <div>
              <div class="text-xs text-[var(--text-muted)] font-medium">Recettes Télétransmises (FSE)</div>
              <div class="text-2xl font-bold font-['Montserrat'] text-emerald-700 mt-1">1 420 €</div>
              <div class="text-[11px] text-emerald-600 font-semibold mt-0.5">100% à jour Noémie</div>
            </div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style="background: rgba(56,161,105,0.12); color: #22543D;">
              💳
            </div>
          </div>
        </div>

        <!-- Main Content Split -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- File Active Table (2 cols) -->
          <div class="lg:col-span-2 glass-card p-5">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-['Montserrat'] font-bold text-sm text-[var(--text-main)]">File Active Prioritaire</h3>
                <p class="text-xs text-[var(--text-muted)]">Patientes enceintes avec alertes ou rendez-vous imminents</p>
              </div>
              <div class="flex items-center gap-2">
                <button class="btn-secondary text-xs py-1.5 px-3">Filtrer</button>
                <button class="btn-primary text-xs py-1.5 px-3" onclick="ProSimulator.render(5)">+ Nouvelle Consultation</button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-[var(--border-app)] text-[var(--text-muted)] pb-2">
                    <th class="py-2.5 font-semibold">Patiente</th>
                    <th class="py-2.5 font-semibold">Terme SA</th>
                    <th class="py-2.5 font-semibold">Statut Clinique</th>
                    <th class="py-2.5 font-semibold">Maternité Cible</th>
                    <th class="py-2.5 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--border-app)]">
                  <tr class="hover:bg-[var(--c-skin-linen)] cursor-pointer transition-colors" onclick="ProSimulator.render(5)">
                    <td class="py-3">
                      <div class="font-bold text-[var(--text-main)]">Élodie Martin</div>
                      <div class="text-[11px] text-[var(--text-muted)]">31 ans • G2P1 • 06 12 34 56 78</div>
                    </td>
                    <td class="py-3">
                      <span class="glass-badge badge-blue font-mono font-bold">28 SA + 3j</span>
                      <div class="text-[10px] text-[var(--text-muted)] mt-0.5">DPA: 24/11/2026</div>
                    </td>
                    <td class="py-3">
                      <span class="glass-badge badge-pink font-semibold">Consultation 7e mois</span>
                      <div class="text-[10px] text-[var(--c-terracotta)] mt-0.5">⚠️ Ferritine basse (14 µg/L)</div>
                    </td>
                    <td class="py-3 text-[var(--text-main)] font-medium">
                      Maternité Hôpital Nord (Niv 2B)
                    </td>
                    <td class="py-3 text-right">
                      <button class="btn-primary text-xs py-1 px-3" onclick="event.stopPropagation(); ProSimulator.render(5);">Ouvrir Dossier</button>
                    </td>
                  </tr>

                  <tr class="hover:bg-[var(--c-skin-linen)] cursor-pointer transition-colors">
                    <td class="py-3">
                      <div class="font-bold text-[var(--text-main)]">Sarah Benali</div>
                      <div class="text-[11px] text-[var(--text-muted)]">27 ans • G1P0</div>
                    </td>
                    <td class="py-3">
                      <span class="glass-badge badge-blue font-mono font-bold">37 SA + 1j</span>
                      <div class="text-[10px] text-[var(--text-muted)] mt-0.5">DPA: 28/09/2026</div>
                    </td>
                    <td class="py-3">
                      <span class="glass-badge badge-success font-semibold">Grossesse physiologique</span>
                      <div class="text-[10px] text-emerald-700 mt-0.5">Strepto B Négatif • BCF 144</div>
                    </td>
                    <td class="py-3 text-[var(--text-main)] font-medium">
                      CHU Pellegrin (Niv 3)
                    </td>
                    <td class="py-3 text-right">
                      <button class="btn-secondary text-xs py-1 px-3">Voir Fiche</button>
                    </td>
                  </tr>

                  <tr class="hover:bg-[var(--c-skin-linen)] cursor-pointer transition-colors">
                    <td class="py-3">
                      <div class="font-bold text-[var(--text-main)]">Camille Leroy</div>
                      <div class="text-[11px] text-[var(--text-muted)]">34 ans • G3P2</div>
                    </td>
                    <td class="py-3">
                      <span class="glass-badge badge-blue font-mono font-bold">12 SA + 5j</span>
                      <div class="text-[10px] text-[var(--text-muted)] mt-0.5">DPA: 14/03/2027</div>
                    </td>
                    <td class="py-3">
                      <span class="glass-badge badge-navy font-semibold">Écho T1 Programmée</span>
                      <div class="text-[10px] text-[var(--text-muted)] mt-0.5">Dépistage T21 à initier</div>
                    </td>
                    <td class="py-3 text-[var(--text-main)] font-medium">
                      Clinique Bagatelle (Niv 1)
                    </td>
                    <td class="py-3 text-right">
                      <button class="btn-secondary text-xs py-1 px-3">Voir Fiche</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right Column: Urgent Alerts & Shortcuts -->
          <div class="space-y-4">
            <div class="glass-card p-4 border-l-4 border-l-[var(--c-terracotta)]">
              <div class="flex items-center gap-2 text-[var(--c-terracotta)] font-bold text-xs">
                <span>🚨</span>
                <span>Passeport d'Urgence Détecté (12.3% imprévus)</span>
              </div>
              <p class="text-xs text-[var(--text-main)] mt-2 leading-relaxed">
                Une maternité non prévue a sollicité le dossier de <strong>Léa Dubois (34 SA)</strong> via clé OTP. Transfert sécurisé complété avec succès il y a 18 min.
              </p>
              <div class="mt-3 flex items-center justify-between text-[11px]">
                <span class="text-[var(--text-muted)]">Maternité Arcachon</span>
                <span class="font-bold text-emerald-700">✓ Données synchronisées</span>
              </div>
            </div>

            <div class="glass-card p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-bold text-xs text-[var(--text-main)]">Raccourcis Modules Cliniques</h4>
                <span class="text-[10px] text-[var(--text-muted)]">14 écrans</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <button class="p-2.5 rounded-lg text-left bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] transition-colors" onclick="ProSimulator.render(4)">
                  <div class="font-bold text-[var(--c-navy)]">🎡 Roue SA</div>
                  <div class="text-[10px] text-[var(--text-muted)]">Calculatrice terme</div>
                </button>
                <button class="p-2.5 rounded-lg text-left bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] transition-colors" onclick="ProSimulator.render(6)">
                  <div class="font-bold text-[var(--c-navy)]">📈 Partogramme</div>
                  <div class="text-[10px] text-[var(--text-muted)]">Tracé tactile dilatation</div>
                </button>
                <button class="p-2.5 rounded-lg text-left bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] transition-colors" onclick="ProSimulator.render(7)">
                  <div class="font-bold text-[var(--c-navy)]">🩺 Gynécologie</div>
                  <div class="text-[10px] text-[var(--text-muted)]">FCU & Contraception</div>
                </button>
                <button class="p-2.5 rounded-lg text-left bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] transition-colors" onclick="ProSimulator.render(9)">
                  <div class="font-bold text-[var(--c-navy)]">🧘 Rééducation</div>
                  <div class="text-[10px] text-[var(--text-muted)]">Bilan périnéal 0-5</div>
                </button>
                <button class="p-2.5 rounded-lg text-left bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] transition-colors" onclick="ProSimulator.render(8)">
                  <div class="font-bold text-[var(--c-navy)]">💊 Protocole IVG</div>
                  <div class="text-[10px] text-[var(--text-muted)]">Médicamenteuse ville</div>
                </button>
                <button class="p-2.5 rounded-lg text-left bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] transition-colors" onclick="ProSimulator.render(13)">
                  <div class="font-bold text-[var(--c-navy)]">📑 Facturation</div>
                  <div class="text-[10px] text-[var(--text-muted)]">SESAM-Vitale FSE</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 2 : AGENDA INTELLIGENT & TRIAGE
  // ===========================================================================
  screenAgenda() {
    return `
      ${this.proTopBar('Agenda Obstétrique & Triage')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Planning de Consultation — Mardi 15 Septembre 2026</h3>
            <p class="text-xs text-[var(--text-muted)]">Triage automatique des rendez-vous selon le terme SA et les jalons réglementaires</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn-secondary text-xs">Aujourd'hui</button>
            <button class="btn-primary text-xs" onclick="ProSimulator.render(5)">+ Ajouter Créneau</button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <!-- Calendar Slots (3 cols) -->
          <div class="lg:col-span-3 glass-card p-5 space-y-3">
            <div class="p-3 rounded-lg border-l-4 border-l-emerald-600 bg-[var(--c-skin-linen)] flex justify-between items-center">
              <div>
                <span class="font-mono font-bold text-xs text-[var(--c-navy)]">09h00 - 09h45</span>
                <span class="font-bold text-xs text-[var(--text-main)] ml-3">Consultation 4e mois • Marion Petit (16 SA)</span>
                <div class="text-[11px] text-[var(--text-muted)] mt-0.5">Entretien Prénatal Précoce (EPP) • Déclaration de grossesse</div>
              </div>
              <span class="glass-badge badge-success text-[10px]">Terminé</span>
            </div>

            <div class="p-3 rounded-lg border-l-4 border-l-emerald-600 bg-[var(--c-skin-linen)] flex justify-between items-center">
              <div>
                <span class="font-mono font-bold text-xs text-[var(--c-navy)]">10h00 - 10h30</span>
                <span class="font-bold text-xs text-[var(--text-main)] ml-3">Suivi Gynécologique • Laura Mercier</span>
                <div class="text-[11px] text-[var(--text-muted)] mt-0.5">Frottis de dépistage (FCU) & renouvellement contraception</div>
              </div>
              <span class="glass-badge badge-success text-[10px]">Terminé</span>
            </div>

            <div class="p-3 rounded-lg border-l-4 border-l-[var(--c-navy)] bg-[var(--c-pink-light)] shadow-sm flex justify-between items-center cursor-pointer" onclick="ProSimulator.render(5)">
              <div>
                <span class="font-mono font-bold text-xs text-[var(--c-navy)]">14h15 - 15h00</span>
                <span class="font-bold text-xs text-[var(--c-navy)] ml-3">Consultation 7e mois • Élodie Martin (28 SA + 3j)</span>
                <div class="text-[11px] text-[var(--c-brown-muted)] mt-0.5">Bilan T2 à vérifier • BCF • Hauteur utérine • Prescription fer</div>
              </div>
              <span class="glass-badge badge-pink text-[10px] font-bold">À Venir (En Cours)</span>
            </div>

            <div class="p-3 rounded-lg border-l-4 border-l-[var(--c-terracotta)] bg-[var(--c-terracotta-bg)] flex justify-between items-center">
              <div>
                <span class="font-mono font-bold text-xs text-[var(--c-terracotta)]">15h15 - 15h45</span>
                <span class="font-bold text-xs text-[var(--c-terracotta)] ml-3">Créneau d'Urgence • Sophie Giraud (33 SA)</span>
                <div class="text-[11px] text-[var(--c-terracotta)] mt-0.5">Motif : Contractions utérines rapprochées • Triage prioritaire</div>
              </div>
              <span class="glass-badge badge-danger text-[10px]">Urgence</span>
            </div>
          </div>

          <!-- Triage Rules & Legend -->
          <div class="glass-card p-4 space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Algorithme de Triage</h4>
            <div class="text-xs space-y-2 text-[var(--text-muted)]">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded bg-emerald-600"></span>
                <span>Suivi physiologique standard</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded bg-[var(--c-navy)]"></span>
                <span>Jalon clé (Écho T1/T2/T3, EPP)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded bg-[var(--c-terracotta)]"></span>
                <span>Urgence obstétricale réservée</span>
              </div>
            </div>
            <div class="pt-3 border-t border-[var(--border-app)] text-[11px] text-[var(--text-muted)]">
              Optimisation du temps de travail libéral : gain mesuré de 45 minutes par jour sur la gestion des créneaux.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 3 : HEADER FIXE
  // ===========================================================================
  screenHeaderFixe() {
    return `
      <div class="glass-panel px-5 py-2.5 flex items-center justify-between border-b border-[var(--border-app)] shrink-0">
        <div class="flex items-center gap-4">
          <button class="btn-secondary text-xs py-1 px-2.5" onclick="ProSimulator.render(1)">← File Active</button>
          <div class="border-l border-[var(--border-app)] pl-3">
            <div class="flex items-center gap-2">
              <span class="font-['Montserrat'] font-bold text-sm text-[var(--text-main)]">Élodie Martin</span>
              <span class="text-xs text-[var(--text-muted)]">(31 ans • 14/05/1995)</span>
              <span class="glass-badge badge-pink text-[10px] font-bold">G2P1</span>
            </div>
            <div class="flex items-center gap-3 text-[11px] text-[var(--text-muted)] mt-0.5">
              <span>Terme : <strong class="text-[var(--c-navy)] font-mono">28 SA + 3j</strong></span>
              <span>• DPA : <strong>24/11/2026</strong></span>
              <span>• Suivi : <strong>Physiologique</strong></span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Vital Clinical Badges -->
          <div class="flex items-center gap-1.5 text-xs font-mono">
            <span class="px-2 py-1 rounded bg-red-100 text-red-800 font-bold border border-red-200">O POSITIF</span>
            <span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">RAI NÉG</span>
            <span class="px-2 py-1 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">TOXO NON IMMUNISÉE</span>
          </div>

          <!-- Emergency Maternite Transfer Button -->
          <button class="btn-urgent text-xs py-1.5 px-3.5" onclick="ProSimulator.triggerEmergencyTransfer()">
            <span>🚨</span> Transférer en Maternité
          </button>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 4 : ROUE SA & TIMELINE
  // ===========================================================================
  screenRoueTimeline() {
    return `
      ${this.proTopBar('Roue de Grossesse & Frise Chronologique')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Frise Chronologique Médicale des 9 Mois</h3>
            <p class="text-xs text-[var(--text-muted)]">Patiente : Élodie Martin • Terme actuel calculé : 28 SA + 3 jours</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div class="relative w-48 h-48 rounded-full border-8 border-[var(--c-skin-linen)] flex items-center justify-center shadow-inner" style="border-top-color: var(--c-navy); border-right-color: var(--c-pink);">
              <div>
                <div class="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">Terme Précis</div>
                <div class="text-2xl font-bold font-mono text-[var(--c-navy)] mt-0.5">28 SA + 3j</div>
                <div class="text-xs text-[var(--c-terracotta)] font-semibold mt-1">7e Mois en cours</div>
                <div class="text-[10px] text-[var(--text-muted)]">81 jours avant terme</div>
              </div>
            </div>
            <div class="mt-4 text-xs text-[var(--text-muted)] leading-relaxed">
              Dernières Règles : 07/02/2026<br>
              Date Présumée d'Accouchement : <strong>24/11/2026</strong>
            </div>
          </div>

          <div class="lg:col-span-2 glass-card p-6 space-y-4">
            <h4 class="font-['Montserrat'] font-bold text-xs text-[var(--text-main)]">Jalons Obligatoires & Échéances Réglementaires</h4>

            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 rounded-lg bg-[var(--c-skin-linen)] border-l-4 border-l-emerald-600">
                <div class="font-mono font-bold text-xs w-16 text-emerald-700">12 SA</div>
                <div class="flex-1 text-xs">
                  <div class="font-bold text-[var(--text-main)]">Échographie T1 (Clarté nucale) + Dépistage T21</div>
                  <div class="text-[11px] text-[var(--text-muted)]">Effectuée le 18/04/2026 • Risque 1/2400 (Bas risque)</div>
                </div>
                <span class="glass-badge badge-success text-[10px]">✓ Conforme</span>
              </div>

              <div class="flex items-center gap-3 p-3 rounded-lg bg-[var(--c-skin-linen)] border-l-4 border-l-emerald-600">
                <div class="font-mono font-bold text-xs w-16 text-emerald-700">22 SA</div>
                <div class="flex-1 text-xs">
                  <div class="font-bold text-[var(--text-main)]">Échographie Morphologique T2</div>
                  <div class="text-[11px] text-[var(--text-muted)]">Effectuée le 28/06/2026 • Biométrie 50e percentile</div>
                </div>
                <span class="glass-badge badge-success text-[10px]">✓ Conforme</span>
              </div>

              <div class="flex items-center gap-3 p-3 rounded-lg bg-[var(--c-pink-light)] border-l-4 border-l-[var(--c-navy)] shadow-sm">
                <div class="font-mono font-bold text-xs w-16 text-[var(--c-navy)]">28 SA</div>
                <div class="flex-1 text-xs">
                  <div class="font-bold text-[var(--c-navy)]">Consultation 7e Mois + Dépistage Diabète HGPO (Aujourd'hui)</div>
                  <div class="text-[11px] text-[var(--text-muted)]">NFS, Ferritine, BCF fœtal en direct</div>
                </div>
                <span class="glass-badge badge-pink text-[10px] font-bold">En cours</span>
              </div>

              <div class="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-app)] opacity-80">
                <div class="font-mono font-bold text-xs w-16 text-[var(--text-muted)]">32 SA</div>
                <div class="flex-1 text-xs">
                  <div class="font-bold text-[var(--text-main)]">Échographie T3 (Croissance et Présentation)</div>
                  <div class="text-[11px] text-[var(--text-muted)]">Rendez-vous fixé au 22/09/2026 au cabinet d'imagerie</div>
                </div>
                <span class="glass-badge badge-navy text-[10px]">Programmé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 5 : CONSULTATION ACTIVE (SPLIT 3 VOLETS 22% / 52% / 26%)
  // ===========================================================================
  screenConsultationSplit() {
    return `
      ${this.screenHeaderFixe()}
      <div class="flex-1 flex overflow-hidden">
        <!-- Volet Gauche (22%) : Historique & Antécédents -->
        <div class="w-[22%] border-r border-[var(--border-app)] p-4 overflow-y-auto bg-[var(--bg-surface)] space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-['Montserrat'] font-bold text-xs text-[var(--text-main)]">Historique de Suivi</h4>
            <span class="glass-badge badge-pink font-mono text-[10px]">7e visite</span>
          </div>

          <div class="space-y-2">
            <div class="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-app)] shadow-sm">
              <div class="flex justify-between text-[11px] font-bold text-[var(--text-main)]">
                <span>C6 • 24 SA</span>
                <span class="text-[var(--text-muted)]">12/08/2026</span>
              </div>
              <div class="text-[11px] text-[var(--text-muted)] mt-1">HU 23cm • BCF 142 • TA 118/72</div>
              <div class="text-[10px] text-emerald-600 mt-0.5">Écho T2 normale (Fœtus 680g)</div>
            </div>

            <div class="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-app)] opacity-85">
              <div class="flex justify-between text-[11px] font-bold text-[var(--text-main)]">
                <span>C5 • 20 SA</span>
                <span class="text-[var(--text-muted)]">15/07/2026</span>
              </div>
              <div class="text-[11px] text-[var(--text-muted)] mt-1">HU 19cm • BCF 146 • TA 110/68</div>
              <div class="text-[10px] text-[var(--text-muted)] mt-0.5">Mouvements fœtaux ressentis</div>
            </div>
          </div>

          <div class="pt-3 border-t border-[var(--border-app)]">
            <h5 class="font-bold text-[11px] text-[var(--text-main)] mb-2">Antécédents Marquants</h5>
            <ul class="text-[11px] space-y-1.5 text-[var(--text-muted)]">
              <li>• G2P1 (Accouchement voie basse 2023, 3350g)</li>
              <li>• Allergie : <strong>Pénicilline</strong> (Urticaire sévère)</li>
              <li>• Toxoplasmose négative (sérologie mensuelle)</li>
            </ul>
          </div>
        </div>

        <!-- Volet Central (52%) : Examen Clinique Actuel & Dictée IA -->
        <div class="w-[52%] p-5 overflow-y-auto space-y-5 bg-[var(--bg-app)]">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-['Montserrat'] font-bold text-sm text-[var(--text-main)]">Consultation Prénatale du 7e Mois (28 SA + 3j)</h3>
              <p class="text-xs text-[var(--text-muted)]">Cotation NGAP : CPN (26,50 €) • 100% Assurance Maternité</p>
            </div>
            <button class="btn-secondary text-xs" onclick="ProSimulator.simulateDictation()">
              <span class="animate-pulse text-red-500">🎙️</span>
              <span id="dictation-btn-text">Simuler Dictée IA</span>
            </button>
          </div>

          <!-- Live BCF Card with Realtime Animated Canvas -->
          <div class="glass-card p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="animate-pulse-bcf text-base">💓</span>
                <span class="font-bold text-xs text-[var(--text-main)]">Monitoring Fœtal & Bruit du Cœur (BCF)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-[var(--text-muted)]">Rythme de base :</span>
                <span class="font-mono font-bold text-base px-2 py-0.5 rounded bg-[var(--c-navy)] text-[var(--c-pink)]" id="bcf-bpm-val">142</span>
                <span class="text-[11px] text-[var(--text-muted)]">bpm</span>
              </div>
            </div>
            <!-- Canvas Graph -->
            <div class="rounded-lg overflow-hidden border border-[var(--border-app)] relative">
              <canvas id="bcf-canvas-pro" class="w-full block"></canvas>
            </div>
            <div class="flex justify-between items-center text-[10px] text-[var(--text-muted)] mt-1 px-1">
              <span>Tracé FHR : Variabilité normale (10-15 bpm) • Pas de décélération</span>
              <span>Canal TOCO : Utérus souple au repos</span>
            </div>
          </div>

          <!-- Form Grid : Biométrie & Constantes -->
          <div class="glass-card p-4 space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Constantes & Examen Physique</h4>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="text-[11px] text-[var(--text-muted)] font-medium">Hauteur Utérine</label>
                <div class="flex items-center gap-1 mt-1">
                  <input type="number" value="26" class="glass-input text-center font-bold font-mono">
                  <span class="text-xs text-[var(--text-muted)]">cm</span>
                </div>
              </div>

              <div>
                <label class="text-[11px] text-[var(--text-muted)] font-medium">Tension Artérielle</label>
                <div class="flex items-center gap-1 mt-1">
                  <input type="text" value="115/70" class="glass-input text-center font-bold font-mono">
                  <span class="text-xs text-[var(--text-muted)]">mmHg</span>
                </div>
              </div>

              <div>
                <label class="text-[11px] text-[var(--text-muted)] font-medium">Poids Patiente</label>
                <div class="flex items-center gap-1 mt-1">
                  <input type="text" value="64.2" class="glass-input text-center font-bold font-mono">
                  <span class="text-xs text-[var(--text-muted)]">kg (+6.5)</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label class="text-[11px] text-[var(--text-muted)] font-medium">Présentation Fœtale</label>
                <select class="glass-input mt-1 text-xs">
                  <option selected>Céphalique haute</option>
                  <option>Siège</option>
                  <option>Transverse</option>
                </select>
              </div>

              <div>
                <label class="text-[11px] text-[var(--text-muted)] font-medium">Col de l'Utérus</label>
                <input type="text" value="Long, postérieur, fermé" class="glass-input mt-1 text-xs">
              </div>

              <div>
                <label class="text-[11px] text-[var(--text-muted)] font-medium">Bandelette Urinaire</label>
                <div class="glass-input mt-1 text-xs flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Alb: Nég</span>
                  <span>Glu: Nég</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Clinical Observations & Voice Dictation Area -->
          <div class="glass-card p-4 space-y-2">
            <div class="flex items-center justify-between">
              <label class="font-bold text-xs text-[var(--text-main)]">Observations & Conclusion Clinique</label>
              <div id="dictation-wave" class="hidden items-center gap-1">
                <span class="sound-bar"></span>
                <span class="sound-bar"></span>
                <span class="sound-bar"></span>
                <span class="sound-bar"></span>
                <span class="sound-bar"></span>
                <span class="text-[11px] text-[var(--c-terracotta)] font-bold ml-1">Écoute active...</span>
              </div>
            </div>
            <textarea id="clinical-notes" rows="3" class="glass-input text-xs leading-relaxed" placeholder="Cliquez sur 'Simuler Dictée IA' pour voir la transcription médicale automatique...">Patiente en bon état général. Mouvements fœtaux bien perçus. Pas de métrorragies ni de contractions douloureuses. BCF régulier à 142 bpm. Hauteur utérine conforme au terme (26 cm). Bilan biologique T2 prescrit avec NFS, ferritinémie et sérologie toxoplasmose.</textarea>
          </div>
        </div>

        <!-- Volet Droit (26%) : Synthèse & Prescriptions -->
        <div class="w-[26%] border-l border-[var(--border-app)] p-4 overflow-y-auto bg-[var(--bg-surface)] space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-['Montserrat'] font-bold text-xs text-[var(--text-main)]">Actions en 1 Clic</h4>
            <span class="glass-badge badge-blue font-bold text-[10px]">EBM Ready</span>
          </div>

          <!-- Ordonnance Express Card -->
          <div class="glass-card p-3 space-y-2">
            <div class="flex justify-between items-center">
              <span class="font-bold text-xs text-[var(--text-main)]">Prescription du 7e Mois</span>
              <span class="text-[10px] text-emerald-600 font-semibold">Vidal Validé</span>
            </div>
            <div class="text-[11px] text-[var(--text-muted)] space-y-1">
              <div class="flex items-center gap-1.5">
                <input type="checkbox" checked class="accent-[var(--c-navy)]">
                <span>Tardyferon B9 (1 cp/j pendant 3 mois)</span>
              </div>
              <div class="flex items-center gap-1.5">
                <input type="checkbox" checked class="accent-[var(--c-navy)]">
                <span>Bilan sanguin T3 (NFS, Plaquettes, RAI)</span>
              </div>
            </div>
            <button class="btn-primary w-full text-xs py-2 mt-2" onclick="ProSimulator.render(11)">
              <span>✍️</span> Signer & Transmettre (2D-Doc)
            </button>
          </div>

          <!-- Cotation & Télétransmission NGAP -->
          <div class="glass-card p-3 space-y-2.5">
            <div class="flex justify-between items-center">
              <span class="font-bold text-xs text-[var(--text-main)]">Cotation Acte Médical</span>
              <span class="glass-badge badge-navy text-[10px]">SESAM-Vitale</span>
            </div>
            <div class="p-2.5 rounded-lg bg-[var(--c-skin-linen)] text-xs flex justify-between items-center">
              <div>
                <div class="font-bold text-[var(--c-navy)]">CPN (Consultation Prénatale)</div>
                <div class="text-[10px] text-[var(--text-muted)]">Tiers Payant 100% Maternité</div>
              </div>
              <div class="font-mono font-bold text-base text-[var(--c-navy)]">26,50 €</div>
            </div>
            <button class="btn-primary w-full text-xs py-2" onclick="alert('Facture FSE télétransmise avec succès à la CPAM !')">
              <span>⚡</span> Valider la FSE en 1 Clic
            </button>
          </div>

          <!-- Transfert Maternité Rapide -->
          <div class="glass-card p-3 border border-[var(--c-blue-ocean)]/30 space-y-2">
            <div class="flex items-center gap-2 text-xs font-bold text-[var(--c-blue-ocean)]">
              <span>🏥</span>
              <span>Passerelle Maternité</span>
            </div>
            <p class="text-[11px] text-[var(--text-muted)]">
              Partager l'intégralité de la visite avec l'Hôpital Nord de garde en temps réel.
            </p>
            <button class="btn-secondary w-full text-xs py-1.5" onclick="alert('Dossier clinique synchronisé avec le serveur hospitalier HDS !')">
              Synchroniser avec l'Hôpital
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 6 : PARTOGRAMME
  // ===========================================================================
  screenPartogramme() {
    return `
      ${this.proTopBar('Partogramme Tactile B-Spline (Salle de Naissance / Travail)')}
      <div class="p-6 overflow-y-auto flex-1 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Suivi Dynamique du Travail d'Accouchement</h3>
            <p class="text-xs text-[var(--text-muted)]">Courbe de Friedman (Alerte à 1cm/h et Action) • Dilatation cervicale en direct</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="glass-card p-5 space-y-4">
          <div class="flex justify-between items-center border-b border-[var(--border-app)] pb-3">
            <div class="flex items-center gap-3">
              <span class="text-xs text-[var(--text-muted)]">Début de travail : <strong>06h30</strong></span>
              <span class="text-xs text-[var(--text-muted)]">Poche des eaux : <strong class="text-emerald-700">Rompue claire (08h15)</strong></span>
            </div>
            <div class="flex items-center gap-2 font-mono text-xs">
              <span class="px-2.5 py-1 rounded bg-[var(--c-navy)] text-white font-bold">Dilatation : 7 cm</span>
              <span class="px-2.5 py-1 rounded bg-[var(--c-pink)] text-[var(--c-brown)] font-bold">Station : +1 (Engagé)</span>
            </div>
          </div>

          <div class="w-full h-64 relative bg-[var(--c-skin-light)] rounded-lg p-3 border border-[var(--border-app)]">
            <svg class="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
              <line x1="50" y1="20" x2="680" y2="20" stroke="#E2D7CC" stroke-width="1"/>
              <line x1="50" y1="60" x2="680" y2="60" stroke="#E2D7CC" stroke-width="1"/>
              <line x1="50" y1="100" x2="680" y2="100" stroke="#E2D7CC" stroke-width="1"/>
              <line x1="50" y1="140" x2="680" y2="140" stroke="#E2D7CC" stroke-width="1"/>
              <line x1="50" y1="180" x2="680" y2="180" stroke="#E2D7CC" stroke-width="1"/>

              <line x1="150" y1="140" x2="450" y2="20" stroke="#DE6349" stroke-width="2" stroke-dasharray="4"/>
              <text x="455" y="25" fill="#DE6349" font-size="10" font-weight="bold">Ligne d'Action</text>

              <line x1="230" y1="140" x2="530" y2="20" stroke="#E59400" stroke-width="2" stroke-dasharray="4"/>
              <text x="535" y="25" fill="#E59400" font-size="10" font-weight="bold">Ligne d'Alerte</text>

              <path d="M 100 180 Q 180 140, 260 120 T 400 60 T 520 20" fill="none" stroke="#152538" stroke-width="3.5"/>

              <circle cx="100" cy="180" r="5" fill="#152538"/>
              <circle cx="260" cy="120" r="5" fill="#152538"/>
              <circle cx="400" cy="60" r="5" fill="#F0B9BD" stroke="#152538" stroke-width="2"/>
              <circle cx="520" cy="20" r="6" fill="#DE6349"/>
            </svg>
          </div>

          <div class="flex justify-between items-center text-xs text-[var(--text-muted)] pt-2">
            <span>Heures de travail : 06h | 08h | 10h | 12h | 14h | 16h</span>
            <span class="font-bold text-emerald-700">Progression physiologique normale (Aucune dystocie)</span>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 7 : GYNÉCOLOGIE
  // ===========================================================================
  screenGyneco() {
    return `
      ${this.proTopBar('Suivi Gynécologique de Prévention & Contraception')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Consultation Gynécologique de Prévention</h3>
            <p class="text-xs text-[var(--text-muted)]">Frottis (FCU), Pose/Retrait DIU, Implant contraceptif, Dépistage IST</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="glass-card p-5 space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Frottis Cervico-Utérin (FCU)</h4>
            <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] text-xs space-y-1.5">
              <div class="flex justify-between font-bold">
                <span>Dernier FCU :</span>
                <span>14/10/2024</span>
              </div>
              <div class="text-emerald-700 font-semibold">Résultat : Négatif (Cytologie normale)</div>
              <div class="text-[11px] text-[var(--text-muted)]">Recommandation HAS : Prochain dépistage en 2027 (Test HPV)</div>
            </div>
            <button class="btn-primary w-full text-xs py-2">Nouvelle Prescription FCU</button>
          </div>

          <div class="glass-card p-5 space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Contraception Active</h4>
            <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] text-xs space-y-1.5">
              <div class="flex justify-between font-bold">
                <span>Dispositif :</span>
                <span>DIU Cuivre (Mona Lisa)</span>
              </div>
              <div class="text-[var(--text-muted)]">Date de pose : 12/03/2023</div>
              <div class="text-amber-700 font-semibold">Échéance de retrait : 2028</div>
            </div>
            <button class="btn-secondary w-full text-xs py-2">Contrôle échographique DIU</button>
          </div>

          <div class="glass-card p-5 space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Vaccination & Prévention HPV</h4>
            <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] text-xs space-y-1.5">
              <div class="font-bold">Gardasil 9 (Schéma complet)</div>
              <div class="text-emerald-700 font-semibold">Doses reçues : 3/3</div>
              <div class="text-[11px] text-[var(--text-muted)]">Sérologie rubéole : Immunisée</div>
            </div>
            <button class="btn-secondary w-full text-xs py-2">Bilan Pré-conceptionnel</button>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 8 : IVG
  // ===========================================================================
  screenIVG() {
    return `
      ${this.proTopBar('Parcours Réglementaire IVG Médicamenteuse en Ville')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Protocole Dématérialisé d'IVG Médicamenteuse</h3>
            <p class="text-xs text-[var(--text-muted)]">Conventionnement avec le CHU de référence • Jusqu'à 9 SA en cabinet de ville</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="glass-card p-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] border-t-4 border-t-emerald-600">
              <div class="font-bold text-[var(--text-main)]">1. Consultation Préalable</div>
              <div class="text-[11px] text-[var(--text-muted)] mt-1">Information, écho de datation (6 SA), fiche de liaison</div>
              <span class="glass-badge badge-success text-[10px] mt-2">✓ Complété</span>
            </div>

            <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] border-t-4 border-t-emerald-600">
              <div class="font-bold text-[var(--text-main)]">2. Consentement Éclairé</div>
              <div class="text-[11px] text-[var(--text-muted)] mt-1">Signature numérique RGPD & choix de la méthode</div>
              <span class="glass-badge badge-success text-[10px] mt-2">✓ Signé en ligne</span>
            </div>

            <div class="p-3 rounded-lg bg-[var(--c-pink-light)] border-t-4 border-t-[var(--c-navy)] shadow-sm">
              <div class="font-bold text-[var(--c-navy)]">3. Prise Médicamenteuse</div>
              <div class="text-[11px] text-[var(--text-muted)] mt-1">Mifépristone (J0) puis Misoprostol (J+2) au cabinet</div>
              <span class="glass-badge badge-pink text-[10px] font-bold mt-2">En cours (J+1)</span>
            </div>

            <div class="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-app)] opacity-75">
              <div class="font-bold text-[var(--text-main)]">4. Consultation de Contrôle</div>
              <div class="text-[11px] text-[var(--text-muted)] mt-1">Contrôle J14-J21 : dosage bêta-hCG ou écho de vacuité</div>
              <span class="glass-badge badge-navy text-[10px] mt-2">Prévue le 24/09</span>
            </div>
          </div>

          <div class="p-3.5 rounded-lg bg-[var(--c-terracotta-bg)] border border-[var(--c-terracotta)]/40 flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 text-[var(--c-terracotta)]">
              <span>📞</span>
              <span>Ligne d'Urgence Maternité Référente CHU : <strong>05 56 79 56 79</strong> (24h/24)</span>
            </div>
            <button class="btn-urgent text-xs py-1 px-3">Fiche de Liaison HDS</button>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 9 : RÉÉDUCATION
  // ===========================================================================
  screenReeducation() {
    return `
      ${this.proTopBar('Bilan & Rééducation Périnéale')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Bilan Périnéal & Schéma Musculaire Tactile</h3>
            <p class="text-xs text-[var(--text-muted)]">Évaluation manuelle testing d'Oxford (0 à 5), biofeedback & électrostimulation</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="glass-card p-5 space-y-4">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Testing Musculaire d'Oxford (0 à 5)</h4>
            <div class="space-y-3 text-xs">
              <div class="flex justify-between items-center p-2.5 rounded bg-[var(--c-skin-linen)]">
                <span>Faisceau Pubo-Coccygien Droit :</span>
                <span class="font-mono font-bold text-[var(--c-navy)]">3 / 5 (Moyen avec résistance)</span>
              </div>
              <div class="flex justify-between items-center p-2.5 rounded bg-[var(--c-skin-linen)]">
                <span>Faisceau Pubo-Coccygien Gauche :</span>
                <span class="font-mono font-bold text-[var(--c-navy)]">2 / 5 (Faible sans résistance)</span>
              </div>
              <div class="flex justify-between items-center p-2.5 rounded bg-[var(--c-skin-linen)]">
                <span>Verrouillage à la toux :</span>
                <span class="font-bold text-amber-700">Incomplet (Légères fuites à l'effort)</span>
              </div>
            </div>
            <button class="btn-primary w-full text-xs py-2">Enregistrer Bilan Séance 4/10</button>
          </div>

          <div class="glass-card p-5 space-y-4">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Plan d'Exercices Recommandé</h4>
            <div class="text-xs space-y-2 text-[var(--text-muted)]">
              <div class="p-3 rounded bg-[var(--c-pink-light)] border border-[var(--c-pink-border)] text-[var(--text-main)]">
                <strong>Exercice 1 : La montée d'ascenseur</strong><br>
                Contraction progressive sur 4 étages (5 sec de tenue, 10 sec de repos). 3 séries de 10.
              </div>
              <div class="p-3 rounded bg-[var(--c-skin-linen)]">
                <strong>Exercice 2 : Verrouillage anticipatoire</strong><br>
                Contraction réflexe avant chaque éternuement, portage de charge ou saut.
              </div>
            </div>
            <button class="btn-secondary w-full text-xs py-2">Envoyer Fiche d'Exercices sur l'App Patiente</button>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 10 : BIOLOGIE
  // ===========================================================================
  screenBiologie() {
    return `
      ${this.proTopBar('Biologie Médicale & Ingestion HPRIM')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Suivi Biologique Évolutif de Grossesse</h3>
            <p class="text-xs text-[var(--text-muted)]">Intégration automatique HPRIM des laboratoires • Détection proactive des anomalies</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="glass-card p-5 overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-[var(--border-app)] text-[var(--text-muted)] pb-2">
                <th class="py-2.5">Analyse Biologique</th>
                <th class="py-2.5">T1 (12 SA)</th>
                <th class="py-2.5">T2 (24 SA)</th>
                <th class="py-2.5">T3 (28 SA - Récent)</th>
                <th class="py-2.5">Norme Grossesse</th>
                <th class="py-2.5 text-right">Statut</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-app)]">
              <tr>
                <td class="py-3 font-bold text-[var(--text-main)]">Hémoglobine (g/dL)</td>
                <td class="py-3 font-mono">12.8</td>
                <td class="py-3 font-mono">11.4</td>
                <td class="py-3 font-mono text-amber-700 font-bold">10.5</td>
                <td class="py-3 text-[var(--text-muted)]">> 10.5 g/dL au T3</td>
                <td class="py-3 text-right"><span class="glass-badge badge-navy text-[10px]">Limite basse</span></td>
              </tr>
              <tr class="bg-[var(--c-terracotta-bg)]/30">
                <td class="py-3 font-bold text-[var(--c-terracotta)]">Ferritinémie (µg/L)</td>
                <td class="py-3 font-mono">38</td>
                <td class="py-3 font-mono">22</td>
                <td class="py-3 font-mono text-[var(--c-terracotta)] font-bold">14</td>
                <td class="py-3 text-[var(--text-muted)]">> 20 µg/L</td>
                <td class="py-3 text-right"><span class="glass-badge badge-danger text-[10px]">⚠️ Carence martiale</span></td>
              </tr>
              <tr>
                <td class="py-3 font-bold text-[var(--text-main)]">Glycémie à jeun (g/L)</td>
                <td class="py-3 font-mono">0.82</td>
                <td class="py-3 font-mono">0.85</td>
                <td class="py-3 font-mono font-bold text-emerald-700">0.84</td>
                <td class="py-3 text-[var(--text-muted)]">< 0.92 g/L</td>
                <td class="py-3 text-right"><span class="glass-badge badge-success text-[10px]">✓ Normal</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 11 : ORDONNANCES
  // ===========================================================================
  screenOrdonnances() {
    return `
      ${this.proTopBar('Générateur de Prescriptions & e-Ordonnances')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Prescription Médicale Sécurisée (QR 2D-Doc)</h3>
            <p class="text-xs text-[var(--text-muted)]">Base Vidal intégrée • Conformité EBM et dispensation officine instantanée</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(5)">← Retour Consultation</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="glass-card p-5 space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Modèles Cliniques Préréglés (1 Clic)</h4>
            <div class="space-y-2 text-xs">
              <button class="w-full p-2.5 text-left rounded bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] font-medium">
                💊 Supplémentation Fer & Folates (T2/T3)
              </button>
              <button class="w-full p-2.5 text-left rounded bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] font-medium">
                🧪 Bilan Sanguin Pré-Anesthésie & T3
              </button>
              <button class="w-full p-2.5 text-left rounded bg-[var(--c-skin-linen)] hover:bg-[var(--c-pink-light)] font-medium">
                🩻 Échographie T3 de Croissance
              </button>
            </div>
          </div>

          <div class="lg:col-span-2 glass-card p-6 space-y-4 border border-[var(--border-app)]">
            <div class="flex justify-between items-start border-b border-[var(--border-app)] pb-4">
              <div>
                <div class="font-bold text-sm text-[var(--c-navy)]">Clémence Roche — Sage-Femme DE</div>
                <div class="text-xs text-[var(--text-muted)]">N° RPPS : 10104892341 • Cabinet de Maïeutique Bordeaux</div>
              </div>
              <div class="w-14 h-14 border border-gray-300 rounded p-1 flex items-center justify-center text-[10px] text-center font-mono bg-white">
                [QR 2D-Doc]
              </div>
            </div>

            <div class="text-xs space-y-3 py-2">
              <div class="font-bold text-[var(--text-main)]">ORDONNANCE MÉDICALE pour : Élodie Martin (28 SA + 3j)</div>
              <ol class="list-decimal list-inside space-y-2 text-[var(--text-main)]">
                <li><strong>TARDYFERON B9</strong>, comprimé pelliculé :<br>
                <span class="text-[var(--text-muted)] text-[11px] pl-4">1 comprimé par jour le matin pendant 3 mois. Traitement de l'anémie par carence martiale.</span></li>
              </ol>
            </div>

            <div class="pt-4 border-t border-[var(--border-app)] flex justify-between items-center">
              <span class="text-[11px] text-emerald-700 font-semibold">✓ Signature électronique qualifiée eIDAS</span>
              <button class="btn-primary text-xs py-2 px-4" onclick="alert('Ordonnance envoyée avec succès sur le coffre-fort de la patiente !')">
                Envoyer sur l'App Patiente (PDF Sécurisé)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 12 : FEUILLE DE ROUTE
  // ===========================================================================
  screenFeuilleRoute() {
    return `
      ${this.proTopBar('Feuille de Route Trimestrielle')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Feuille de Route du 2e Trimestre (T2)</h3>
            <p class="text-xs text-[var(--text-muted)]">Synthèse vulgarisée et bienveillante envoyée directement sur l'application patiente</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="glass-card p-6 space-y-4 max-w-3xl mx-auto">
          <div class="flex items-center gap-3 p-3 rounded-lg bg-[var(--c-pink-light)] border border-[var(--c-pink-border)]">
            <span class="text-2xl">🌸</span>
            <div>
              <div class="font-bold text-xs text-[var(--c-navy)]">Un bilan de santé serein pour vous et votre bébé</div>
              <div class="text-[11px] text-[var(--text-muted)]">Rédigé par Clémence Roche à l'issue de votre 6e et 7e consultation</div>
            </div>
          </div>

          <div class="space-y-3 text-xs text-[var(--text-main)] leading-relaxed">
            <p>Bonjour Élodie,</p>
            <p>Votre grossesse évolue très favorablement à <strong>28 semaines d'aménorrhée</strong>. Votre bébé grandit harmonieusement avec un rythme cardiaque parfait de 142 battements par minute. La hauteur de votre utérus est de 26 cm, tout à fait conforme au terme.</p>
            <div class="p-3 rounded bg-[var(--c-skin-linen)] space-y-1 font-medium">
              <div>📌 <strong>Votre To-Do List pour les prochaines semaines :</strong></div>
              <div>• Prendre régulièrement le fer prescrit pour corriger la petite baisse de ferritine.</div>
              <div>• Réaliser l'échographie du 3e trimestre le 22 septembre.</div>
              <div>• Contacter le secrétariat de la maternité pour fixer le rendez-vous d'anesthésie du 8e mois.</div>
            </div>
          </div>

          <div class="pt-4 border-t border-[var(--border-app)] flex justify-end">
            <button class="btn-primary text-xs py-2 px-4" onclick="alert('Feuille de route trimestrielle transmise sur le smartphone d\'Élodie !')">
              Transmettre sur SageFlow App
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 13 : FACTURATION
  // ===========================================================================
  screenFacturation() {
    return `
      ${this.proTopBar('Facturation SESAM-Vitale & Télétransmission FSE')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Gestionnaire Comptable & Télétransmissions</h3>
            <p class="text-xs text-[var(--text-muted)]">Tiers payant AMO/AMC • Rejets Noémie à 0% • Conformité FAMI CNAM</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="glass-card p-4">
            <div class="text-xs text-[var(--text-muted)]">Total Encaissé ce Mois</div>
            <div class="text-2xl font-bold font-mono text-[var(--c-navy)] mt-1">3 840,50 €</div>
            <div class="text-[11px] text-emerald-600 font-semibold mt-0.5">98 FSE traitées</div>
          </div>
          <div class="glass-card p-4">
            <div class="text-xs text-[var(--text-muted)]">Tiers Payant en Attente CPAM</div>
            <div class="text-2xl font-bold font-mono text-amber-700 mt-1">265,00 €</div>
            <div class="text-[11px] text-[var(--text-muted)] mt-0.5">Règlement sous 48h</div>
          </div>
          <div class="glass-card p-4">
            <div class="text-xs text-[var(--text-muted)]">Forfait FAMI Estimé</div>
            <div class="text-2xl font-bold font-mono text-emerald-700 mt-1">830,00 €</div>
            <div class="text-[11px] text-emerald-600 font-semibold mt-0.5">100% indicateurs validés</div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // SCREEN 14 : TÉLÉ-EXPERTISE
  // ===========================================================================
  screenTeleExpertise() {
    return `
      ${this.proTopBar('Télé-Expertise Médicale & Compagnonnage')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Messagerie Sécurisée Confraternelle HDS</h3>
            <p class="text-xs text-[var(--text-muted)]">Échanges d'avis obstétricaux ville-hôpital avec le CHU Pellegrin (Niveau 3)</p>
          </div>
          <button class="btn-secondary text-xs" onclick="ProSimulator.render(1)">← Retour Dashboard</button>
        </div>

        <div class="glass-card p-5 space-y-4 max-w-2xl mx-auto">
          <div class="flex items-center gap-3 border-b border-[var(--border-app)] pb-3">
            <div class="w-9 h-9 rounded-full bg-[var(--c-blue-ocean)] text-white font-bold flex items-center justify-center text-xs">
              DR
            </div>
            <div>
              <div class="font-bold text-xs text-[var(--text-main)]">Dr. Vincent Laurent (Gynécologue-Obstétricien, CHU)</div>
              <div class="text-[11px] text-emerald-600">● En ligne • Télé-expertise MSSanté</div>
            </div>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] space-y-1">
              <div class="text-[10px] text-[var(--text-muted)] font-bold">Clémence Roche (Sage-femme) • 10h14</div>
              <p class="text-[var(--text-main)]">Bonjour Docteur, pour la patiente Élodie Martin (28 SA), la biométrie fœtale montre un périmètre abdominal au 15e percentile à l'écho intermédiaire. Le Doppler ombilical est normal. Préconisez-vous une surveillance rapprochée tous les 15 jours ?</p>
            </div>

            <div class="p-3 rounded-lg bg-[var(--c-blue-sky-bg)] space-y-1 ml-4 border border-[var(--c-blue-sky)]">
              <div class="text-[10px] text-[var(--c-blue-ocean)] font-bold">Dr. Vincent Laurent • 10h28</div>
              <p class="text-[var(--text-main)]">Bonjour Clémence. Au vu du Doppler normal et des mouvements actifs, un simple contrôle de croissance dans 3 semaines (vers 31 SA) suffit amplement. Inutile d'inquiéter la patiente. Bonne journée !</p>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2 border-t border-[var(--border-app)]">
            <input type="text" placeholder="Répondre sur le canal sécurisé..." class="glass-input text-xs">
            <button class="btn-primary text-xs py-2 px-4">Envoyer</button>
          </div>
        </div>
      </div>
    `;
  },

  simulateDictation() {
    const wave = document.getElementById('dictation-wave');
    const btn = document.getElementById('dictation-btn-text');
    const txt = document.getElementById('clinical-notes');
    if (!wave || !txt) return;

    if (wave.classList.contains('hidden')) {
      wave.classList.remove('hidden');
      wave.classList.add('flex');
      btn.textContent = 'Arrêter la dictée';
      
      setTimeout(() => {
        txt.value = "Examen du 7e mois (28 SA + 3j). Hauteur utérine à 26 cm. BCF perçu vigoureux et régulier à 142 bpm. Utérus souple sans CU. Mouvements fœtaux bien perçus. Bandelette urinaire négative. Prescription de fer initiée pour ferritinémie à 14 µg/L. Patiente rassurée, prochaine consultation dans 4 semaines.";
        wave.classList.remove('flex');
        wave.classList.add('hidden');
        btn.textContent = 'Simuler Dictée IA';
      }, 2000);
    } else {
      wave.classList.remove('flex');
      wave.classList.add('hidden');
      btn.textContent = 'Simuler Dictée IA';
    }
  },

  triggerEmergencyTransfer() {
    alert("🚨 PROCÉDURE D'URGENCE ACTIVÉE !\n\nLe dossier complet d'Élodie Martin vient d'être déverrouillé et transmis en priorité absolue à la salle de travail de la maternité de référence (CHU / Hôpital Nord). Clé d'accès OTP sécurisée transmise au médecin de garde.");
  }
};

window.ProSimulator = ProSimulator;
