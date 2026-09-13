// =============================================================================
// SAGEFLOW APP SIMULATOR - 7 MOBILE MODULES (SMARTPHONE 393x852)
// Based on Cahier des Charges v2.3 - Table 7
// =============================================================================

const PatienteSimulator = {
  activeModule: 1,

  render(moduleId) {
    this.activeModule = moduleId;
    const container = document.getElementById('screen-viewport');
    if (!container) return;

    let html = '';
    switch(moduleId) {
      case 1: html = this.moduleAccueil(); break;
      case 2: html = this.moduleQuestionnaire(); break;
      case 3: html = this.moduleCoffrefort(); break;
      case 4: html = this.moduleOrdonnances(); break;
      case 5: html = this.moduleProjetNaissance(); break;
      case 6: html = this.modulePasseportUrgence(); break;
      case 7: html = this.modulePostPartum(); break;
      default: html = this.moduleAccueil(); break;
    }

    container.innerHTML = `<div class="screen-fade h-full w-full flex flex-col">${html}</div>`;
  },

  // Mobile Top App Bar
  patienteTopBar(title, showEmergency = true) {
    return `
      <header class="glass-header px-4 py-2.5 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <img src="assets/logo-icon.svg" alt="SageFlow" class="w-6 h-6">
          <span class="font-['Montserrat'] font-bold text-sm tracking-tight" style="color: var(--c-navy);">
            Sage<span style="color: var(--c-brown);">Flow</span>
            <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full ml-0.5" style="background: var(--c-pink-light); color: var(--c-brown);">App</span>
          </span>
        </div>

        <div class="flex items-center gap-2">
          ${showEmergency ? `
            <button class="btn-urgent text-[10px] py-1 px-2.5 font-bold shadow-sm" onclick="PatienteSimulator.render(6)">
              <span>🚨</span> Urgence
            </button>
          ` : ''}
          <div class="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px]" style="background: var(--c-pink); color: var(--c-brown);">
            ÉM
          </div>
        </div>
      </header>
    `;
  },

  // Mobile Bottom Tab Bar
  patienteBottomBar(activeTab) {
    return `
      <nav class="glass-panel py-2 px-3 flex items-center justify-around border-t border-[var(--border-app)] shrink-0 text-center">
        <button class="flex flex-col items-center gap-0.5 text-[10px] ${activeTab === 1 ? 'font-bold text-[var(--c-navy)]' : 'text-[var(--text-muted)]'}" onclick="PatienteSimulator.render(1)">
          <span class="text-base">🏡</span>
          <span>Accueil</span>
        </button>
        <button class="flex flex-col items-center gap-0.5 text-[10px] ${activeTab === 3 ? 'font-bold text-[var(--c-navy)]' : 'text-[var(--text-muted)]'}" onclick="PatienteSimulator.render(3)">
          <span class="text-base">📁</span>
          <span>Documents</span>
        </button>
        <button class="flex flex-col items-center gap-0.5 text-[10px] ${activeTab === 4 ? 'font-bold text-[var(--c-navy)]' : 'text-[var(--text-muted)]'}" onclick="PatienteSimulator.render(4)">
          <span class="text-base">💊</span>
          <span>Ordonnances</span>
        </button>
        <button class="flex flex-col items-center gap-0.5 text-[10px] ${activeTab === 5 ? 'font-bold text-[var(--c-navy)]' : 'text-[var(--text-muted)]'}" onclick="PatienteSimulator.render(5)">
          <span class="text-base">👶</span>
          <span>Projet</span>
        </button>
        <button class="flex flex-col items-center gap-0.5 text-[10px] ${activeTab === 7 ? 'font-bold text-[var(--c-navy)]' : 'text-[var(--text-muted)]'}" onclick="PatienteSimulator.render(7)">
          <span class="text-base">🍼</span>
          <span>Bébé</span>
        </button>
      </nav>
    `;
  },

  // ===========================================================================
  // MODULE 1 : ACCUEIL & CHRONOLOGIE DE GROSSESSE
  // ===========================================================================
  moduleAccueil() {
    return `
      ${this.patienteTopBar('Bonjour Élodie')}
      <div class="p-4 overflow-y-auto flex-1 space-y-4">
        <!-- Gestational Dynamic Wheel Card -->
        <div class="glass-card p-5 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div class="relative w-40 h-40 rounded-full border-6 border-[var(--c-skin-linen)] flex items-center justify-center shadow-inner" style="border-top-color: var(--c-navy); border-right-color: var(--c-pink);">
            <div>
              <div class="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold">Vous êtes à</div>
              <div class="text-xl font-bold font-mono text-[var(--c-navy)] mt-0.5">28 SA + 3j</div>
              <div class="text-[11px] text-[var(--c-terracotta)] font-semibold mt-0.5">7e Mois • Trimestre 3</div>
              <div class="text-[9px] text-[var(--text-muted)] mt-0.5">81 jours avant la DPA</div>
            </div>
          </div>
          <div class="text-xs text-[var(--text-muted)] mt-3">
            Accouchement prévu le <strong>24 novembre 2026</strong>
          </div>
        </div>

        <!-- Weekly Baby & Mom Tip -->
        <div class="glass-card p-4 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">🥑</span>
            <div>
              <h4 class="font-bold text-xs text-[var(--text-main)]">Votre Bébé au 7e Mois (28 SA)</h4>
              <span class="text-[10px] text-[var(--text-muted)]">Taille : ~38 cm • Poids : ~1 100 g</span>
            </div>
          </div>
          <p class="text-xs text-[var(--text-main)] leading-relaxed">
            Ses yeux s'ouvrent et il perçoit la lumière à travers la paroi abdominale. Ses mouvements deviennent plus vigoureux. Pensez à bien vous hydrater et à surélever vos jambes le soir pour soulager la circulation.
          </p>
        </div>

        <!-- Next Appointments & Action -->
        <div class="glass-card p-4 space-y-3">
          <div class="flex justify-between items-center">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Prochain Rendez-vous</h4>
            <span class="glass-badge badge-pink text-[9px] font-bold">Cabinet Libéral</span>
          </div>
          <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] text-xs space-y-1">
            <div class="font-bold text-[var(--c-navy)]">Consultation Prénatale du 7e Mois</div>
            <div class="text-[var(--text-muted)]">Avec Clémence Roche • Aujourd'hui à 14h15</div>
          </div>
          <button class="btn-secondary w-full text-xs py-2" onclick="PatienteSimulator.render(2)">
            📋 Remplir le Questionnaire Pré-Consultation
          </button>
        </div>
      </div>
      ${this.patienteBottomBar(1)}
    `;
  },

  // ===========================================================================
  // MODULE 2 : QUESTIONNAIRE PRÉ-CONSULTATION
  // ===========================================================================
  moduleQuestionnaire() {
    return `
      ${this.patienteTopBar('Pré-Consultation', false)}
      <div class="p-4 overflow-y-auto flex-1 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-['Montserrat'] font-bold text-xs text-[var(--text-main)]">Questionnaire Médical sans Friction</h3>
          <button class="text-xs text-[var(--text-muted)]" onclick="PatienteSimulator.render(1)">✕ Fermer</button>
        </div>

        <p class="text-[11px] text-[var(--text-muted)] leading-relaxed">
          En répondant à ces 3 questions rapides avant d'entrer dans le cabinet, votre sage-femme dispose déjà de vos informations à jour.
        </p>

        <div class="glass-card p-4 space-y-3">
          <div>
            <label class="text-xs font-bold text-[var(--text-main)]">1. Avez-vous ressenti des contractions douloureuses ?</label>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <button class="p-2 rounded border border-[var(--border-app)] text-xs text-center font-medium bg-[var(--c-skin-linen)]">Non, utérus souple</button>
              <button class="p-2 rounded border border-[var(--border-app)] text-xs text-center font-medium">Oui, occasionnelles</button>
            </div>
          </div>

          <div class="pt-2 border-t border-[var(--border-app)]">
            <label class="text-xs font-bold text-[var(--text-main)]">2. Mouvements de votre bébé aujourd'hui :</label>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <button class="p-2 rounded border border-[var(--c-navy)] text-xs text-center font-bold bg-[var(--c-pink-light)] text-[var(--c-navy)]">✓ Bien présents et vifs</button>
              <button class="p-2 rounded border border-[var(--border-app)] text-xs text-center font-medium">Moins fréquents</button>
            </div>
          </div>

          <div class="pt-2 border-t border-[var(--border-app)]">
            <label class="text-xs font-bold text-[var(--text-main)]">3. Avez-vous une question particulière pour Clémence ?</label>
            <textarea rows="2" class="glass-input text-xs mt-1" placeholder="Ex : Douleurs de dos le soir, questions sur la valise de maternité..."></textarea>
          </div>
        </div>

        <button class="btn-primary w-full text-xs py-2.5" onclick="alert('Vos réponses ont été transmises directement au dossier médical de Clémence Roche !'); PatienteSimulator.render(1);">
          Transmettre à ma Sage-Femme
        </button>
      </div>
      ${this.patienteBottomBar(1)}
    `;
  },

  // ===========================================================================
  // MODULE 3 : COFFRE-FORT DOCUMENTS & SCAN IA OCR
  // ===========================================================================
  moduleCoffrefort() {
    return `
      ${this.patienteTopBar('Mes Documents')}
      <div class="p-4 overflow-y-auto flex-1 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-['Montserrat'] font-bold text-xs text-[var(--text-main)]">Coffre-fort Médical Sécurisé HDS</h3>
          <button class="btn-primary text-xs py-1 px-2.5" onclick="PatienteSimulator.simulateScan()">+ Scanner un Document</button>
        </div>

        <!-- Scanner Simulation Modal/Area -->
        <div id="scanner-area" class="hidden glass-card p-4 space-y-3 relative overflow-hidden border border-[var(--c-pink)]">
          <div class="scan-line"></div>
          <div class="flex items-center justify-between text-xs font-bold text-[var(--c-navy)]">
            <span>📷 Numérisation IA & OCR en cours...</span>
            <span class="text-[10px] text-emerald-600 animate-pulse">Extraction auto</span>
          </div>
          <div class="h-28 bg-[var(--c-skin-linen)] rounded border border-dashed border-gray-400 flex items-center justify-center text-xs text-[var(--text-muted)] text-center p-2">
            [Aperçu : Analyse de Biologie Médicale T2 — Glycémie & Ferritine détectées]
          </div>
        </div>

        <!-- Documents List -->
        <div class="space-y-2">
          <div class="glass-card p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">📑</span>
              <div class="text-xs">
                <div class="font-bold text-[var(--text-main)]">Bilan Biologique Trimestre 2</div>
                <div class="text-[10px] text-[var(--text-muted)]">Laboratoire BioSanté • 10/09/2026</div>
                <span class="glass-badge badge-success text-[9px] mt-0.5">✓ Validé par sage-femme</span>
              </div>
            </div>
            <button class="btn-secondary text-[11px] py-1 px-2">Voir</button>
          </div>

          <div class="glass-card p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🩻</span>
              <div class="text-xs">
                <div class="font-bold text-[var(--text-main)]">Compte-Rendu Échographie T2</div>
                <div class="text-[10px] text-[var(--text-muted)]">Cabinet d'Imagerie • 28/06/2026</div>
                <span class="glass-badge badge-success text-[9px] mt-0.5">✓ Cliché morphologique</span>
              </div>
            </div>
            <button class="btn-secondary text-[11px] py-1 px-2">Voir</button>
          </div>

          <div class="glass-card p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🩸</span>
              <div class="text-xs">
                <div class="font-bold text-[var(--text-main)]">Carte de Groupe Sanguin (2 déterminations)</div>
                <div class="text-[10px] text-[var(--text-muted)]">EFS Aquitaine • Groupe O Positif</div>
              </div>
            </div>
            <button class="btn-secondary text-[11px] py-1 px-2">Voir</button>
          </div>
        </div>
      </div>
      ${this.patienteBottomBar(3)}
    `;
  },

  // ===========================================================================
  // MODULE 4 : ORDONNANCES & FEUILLES DE ROUTE
  // ===========================================================================
  moduleOrdonnances() {
    return `
      ${this.patienteTopBar('Ordonnances & Conseils')}
      <div class="p-4 overflow-y-auto flex-1 space-y-4">
        <!-- Feuille de route active -->
        <div class="glass-card p-4 space-y-2 border-l-4 border-l-[var(--c-pink)]">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-xs text-[var(--c-navy)]">🌸 Feuille de Route Trimestre 2</h4>
            <span class="text-[10px] text-[var(--text-muted)]">Reçue il y a 3 jours</span>
          </div>
          <p class="text-[11px] text-[var(--text-main)] leading-relaxed">
            « Bonjour Élodie, votre suivi est impeccable. Pensez à prendre votre fer quotidiennement et n'oubliez pas de programmer votre écho T3 le 22 septembre. »
          </p>
        </div>

        <!-- E-Ordonnances List -->
        <div class="glass-card p-4 space-y-3">
          <h4 class="font-bold text-xs text-[var(--text-main)]">Mes e-Ordonnances (QR 2D-Doc)</h4>

          <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] text-xs space-y-2">
            <div class="flex justify-between items-start">
              <div>
                <div class="font-bold text-[var(--text-main)]">Supplémentation Fer & Folates</div>
                <div class="text-[10px] text-[var(--text-muted)]">Prescrit par Clémence Roche • Valable 3 mois</div>
              </div>
              <span class="glass-badge badge-navy font-mono text-[9px]">2D-Doc</span>
            </div>
            <button class="btn-primary w-full text-xs py-1.5" onclick="alert('Affichage du QR Code 2D-Doc prêt pour la pharmacie !')">
              📱 Présenter à la Pharmacie
            </button>
          </div>
        </div>

        <!-- Warning Signs Interactive Checklist -->
        <div class="glass-card p-4 space-y-2 border border-[var(--c-terracotta)]/40 bg-[var(--c-terracotta-bg)]/20">
          <div class="flex items-center gap-2 text-xs font-bold text-[var(--c-terracotta)]">
            <span>⚠️</span>
            <span>Signes Nécessitant une Consultation Immédiate :</span>
          </div>
          <ul class="text-[11px] space-y-1 text-[var(--text-main)] pl-2">
            <li>• Métrorragies (saignements rouges)</li>
            <li>• Fièvre supérieure à 38°C</li>
            <li>• Diminution nette des mouvements fœtaux sur 12h</li>
            <li>• Écoulement continu de liquide chaud</li>
          </ul>
        </div>
      </div>
      ${this.patienteBottomBar(4)}
    `;
  },

  // ===========================================================================
  // MODULE 5 : PROJET DE NAISSANCE COLLABORATIF
  // ===========================================================================
  moduleProjetNaissance() {
    return `
      ${this.patienteTopBar('Projet de Naissance')}
      <div class="p-4 overflow-y-auto flex-1 space-y-4">
        <div>
          <h3 class="font-['Montserrat'] font-bold text-xs text-[var(--text-main)]">Mes Souhaits pour le Jour J</h3>
          <p class="text-[11px] text-[var(--text-muted)]">Co-construit avec Clémence Roche • Transmis automatiquement à la maternité</p>
        </div>

        <div class="glass-card p-4 space-y-3 text-xs">
          <div>
            <label class="font-bold text-[var(--text-main)]">Gestion de la douleur & Analgésie</label>
            <div class="mt-1.5 p-2 rounded bg-[var(--c-skin-linen)]">
              Péridurale souhaitée si travail prolongé, mais volonté de mobiliser au maximum avant la pose.
            </div>
          </div>

          <div class="pt-2 border-t border-[var(--border-app)]">
            <label class="font-bold text-[var(--text-main)]">Positions de travail & Mobilisation</label>
            <div class="mt-1.5 p-2 rounded bg-[var(--c-skin-linen)]">
              Liberté de mouvement, utilisation du ballon de dilatation et étirements.
            </div>
          </div>

          <div class="pt-2 border-t border-[var(--border-app)]">
            <label class="font-bold text-[var(--text-main)]">Accueil du nouveau-né</label>
            <div class="mt-1.5 p-2 rounded bg-[var(--c-skin-linen)]">
              Peau-à-peau immédiat d'au moins 1 heure. Clampage tardif du cordon ombilical par le co-parent.
            </div>
          </div>
        </div>

        <button class="btn-secondary w-full text-xs py-2" onclick="alert('Modifications enregistrées et synchronisées avec la maternité !')">
          Modifier mes préférences
        </button>
      </div>
      ${this.patienteBottomBar(5)}
    `;
  },

  // ===========================================================================
  // MODULE 6 : PASSEPORT D'URGENCE (ALWAYS ON)
  // ===========================================================================
  modulePasseportUrgence() {
    return `
      ${this.patienteTopBar('Passeport d\'Urgence', false)}
      <div class="p-4 overflow-y-auto flex-1 space-y-4 text-center">
        <div class="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl bg-[var(--c-terracotta-bg)] text-[var(--c-terracotta)] animate-emergency">
          🚨
        </div>

        <div>
          <h3 class="font-['Montserrat'] font-bold text-sm text-[var(--c-terracotta)]">Passeport d'Urgence Maternité Imprévue</h3>
          <p class="text-[11px] text-[var(--text-muted)] mt-1">
            À présenter à toute équipe médicale (SAMU, pompier, maternité non prévue en déplacement).
          </p>
        </div>

        <!-- OTP 6-Digits Card -->
        <div class="glass-card p-5 space-y-3 border-2 border-[var(--c-terracotta)]/50">
          <div class="text-[11px] text-[var(--text-muted)] font-bold uppercase">Clé d'Accès Temporaire (OTP)</div>
          <div class="font-mono text-3xl font-bold tracking-widest text-[var(--c-navy)] bg-[var(--c-skin-linen)] py-3 rounded-lg border border-[var(--border-app)]">
            748 291
          </div>
          <div class="text-[10px] text-[var(--c-terracotta)] font-semibold flex items-center justify-center gap-1">
            <span>⏱️</span> Valable encore 58 minutes
          </div>
        </div>

        <!-- QR Code Display -->
        <div class="glass-card p-4 space-y-2">
          <div class="w-32 h-32 mx-auto bg-white border border-gray-300 rounded-lg p-2 flex items-center justify-center text-xs font-mono">
            [QR Code HDS]
          </div>
          <div class="text-[10px] text-[var(--text-muted)]">
            L'équipe de garde scanne ce code ou saisit les 6 chiffres pour déverrouiller votre dossier de ville en 2 secondes.
          </div>
        </div>

        <button class="btn-secondary w-full text-xs py-2" onclick="PatienteSimulator.render(1)">
          ← Retour à l'accueil
        </button>
      </div>
      ${this.patienteBottomBar(1)}
    `;
  },

  // ===========================================================================
  // MODULE 7 : CARNET POST-PARTUM & DÉPISTAGE EPDS
  // ===========================================================================
  modulePostPartum() {
    return `
      ${this.patienteTopBar('Suivi Bébé & Maman')}
      <div class="p-4 overflow-y-auto flex-1 space-y-4">
        <div>
          <h3 class="font-['Montserrat'] font-bold text-xs text-[var(--text-main)]">Journal de Bord Retour à Domicile</h3>
          <p class="text-[11px] text-[var(--text-muted)]">Suivi de croissance OMS du nouveau-né & bien-être de la maman</p>
        </div>

        <!-- Baby Stats -->
        <div class="glass-card p-4 space-y-3">
          <div class="flex justify-between items-center">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Bébé Léo (Né à 3 280 g)</h4>
            <span class="glass-badge badge-success text-[9px]">J+14</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-2 rounded bg-[var(--c-skin-linen)]">
              <div class="text-[10px] text-[var(--text-muted)]">Dernier Poids Mesuré</div>
              <div class="font-mono font-bold text-[var(--c-navy)] mt-0.5">3 540 g</div>
              <div class="text-[9px] text-emerald-600">+260g (Courbe OMS ok)</div>
            </div>
            <div class="p-2 rounded bg-[var(--c-skin-linen)]">
              <div class="text-[10px] text-[var(--text-muted)]">Alimentation</div>
              <div class="font-bold text-[var(--text-main)] mt-0.5">Allaitement</div>
              <div class="text-[9px] text-[var(--text-muted)]">6 à 8 tétées/24h</div>
            </div>
          </div>
        </div>

        <!-- EPDS Mood Screener Card -->
        <div class="glass-card p-4 space-y-2 border-l-4 border-l-[var(--c-navy)]">
          <div class="flex justify-between items-center">
            <h4 class="font-bold text-xs text-[var(--c-navy)]">Dépistage Bien-Être Maternel (EPDS)</h4>
            <span class="glass-badge badge-pink text-[9px]">Auto-questionnaire</span>
          </div>
          <p class="text-[11px] text-[var(--text-main)] leading-relaxed">
            Les premières semaines peuvent être intenses. Le test EPDS (10 questions validées) permet de dépister précocement le baby blues ou la dépression post-partum.
          </p>
          <button class="btn-primary w-full text-xs py-1.5" onclick="alert('Test EPDS : Score 4/30 (Très bon moral maternel). Aucun signe de dépression post-partum.')">
            Passer le Questionnaire EPDS (2 min)
          </button>
        </div>
      </div>
      ${this.patienteBottomBar(7)}
    `;
  },

  simulateScan() {
    const area = document.getElementById('scanner-area');
    if (!area) return;
    area.classList.remove('hidden');
    setTimeout(() => {
      alert("✅ Document analysé par l'IA SageFlow !\n\nType détecté : Bilan Sanguin Biologie T2.\nConstantes extraites : Glycémie 0.84 g/L, Ferritine 14 µg/L.\nDocument transmis à Clémence Roche.");
      area.classList.add('hidden');
    }, 2500);
  }
};

window.PatienteSimulator = PatienteSimulator;
