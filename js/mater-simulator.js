// =============================================================================
// SAGEFLOW MATERNITÉ SIMULATOR - 5 HOSPITAL MODULES (DESKTOP 1440x900)
// Based on Cahier des Charges v2.3 - Table 6
// =============================================================================

const MaterSimulator = {
  activeModule: 1,

  render(moduleId) {
    this.activeModule = moduleId;
    const container = document.getElementById('screen-viewport');
    if (!container) return;

    let html = '';
    switch(moduleId) {
      case 1: html = this.moduleTableauGarde(); break;
      case 2: html = this.moduleAdmissionRapide(); break;
      case 3: html = this.moduleUrgence1Page(); break;
      case 4: html = this.modulePradoSortie(); break;
      case 5: html = this.moduleTransfertInUtero(); break;
      default: html = this.moduleTableauGarde(); break;
    }

    container.innerHTML = `<div class="screen-fade h-full w-full flex flex-col">${html}</div>`;
    this.afterRender(moduleId);
  },

  afterRender(moduleId) {
    if (document.getElementById('bcf-canvas-mater')) {
      if (window.materBcfMonitor) window.materBcfMonitor.destroy();
      window.materBcfMonitor = new BcfMonitor('bcf-canvas-mater', 'mater-bpm-val');
    }
  },

  // Hospital Top Navigation Bar
  materTopBar(title, subtitle = 'Maternité Hôpital Nord • Pôle Femme-Mère-Enfant (Niveau 2B)') {
    return `
      <header class="glass-header px-6 py-3 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <img src="assets/logo-icon.svg" alt="SageFlow" class="w-7 h-7">
            <span class="font-['Montserrat'] font-bold text-base tracking-tight" style="color: var(--c-navy);">
              Sage<span style="color: var(--c-brown);">Flow</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ml-1" style="background: var(--c-blue-ocean); color: white;">MATER</span>
            </span>
          </div>
          <span class="text-xs text-gray-400">|</span>
          <div>
            <div class="text-xs font-bold text-[var(--text-main)]">${title}</div>
            <div class="text-[10px] text-[var(--text-muted)]">${subtitle}</div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Hospital Bed Occupancy Gauge -->
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--c-skin-linen)] border border-[var(--border-app)] text-xs">
            <span class="text-[var(--text-muted)]">Occupation Salles :</span>
            <span class="font-mono font-bold text-[var(--c-navy)]">5 / 6 (83%)</span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" title="Tension modérée"></span>
          </div>

          <div class="flex items-center gap-2 pl-3 border-l border-[var(--border-app)]">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-[var(--c-blue-ocean)] text-white">
              SF
            </div>
            <div class="text-left text-xs leading-tight">
              <div class="font-bold text-[var(--text-main)]">Garde Obstétrique N°2</div>
              <div class="text-[var(--text-muted)] text-[10px]">Chef de Garde : Dr. B. Moreau</div>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  // ===========================================================================
  // MODULE 1 : TABLEAU DE GARDE PRÉDICTIF
  // ===========================================================================
  moduleTableauGarde() {
    return `
      ${this.materTopBar('Tableau de Garde Prédictif (Salles de Naissance & Travail)')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <!-- Top KPIs -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="glass-card p-4">
            <div class="text-xs text-[var(--text-muted)]">Salles de Travail Occupées</div>
            <div class="text-2xl font-bold font-mono text-[var(--c-navy)] mt-1">5 / 6</div>
            <div class="text-[11px] text-amber-700 font-semibold mt-0.5">1 salle disponible (Salle 3)</div>
          </div>

          <div class="glass-card p-4">
            <div class="text-xs text-[var(--text-muted)]">Accouchements Imminents Prévus</div>
            <div class="text-2xl font-bold font-mono text-[var(--c-terracotta)] mt-1">3</div>
            <div class="text-[11px] text-[var(--c-brown-muted)] mt-0.5">Patientes en fin de travail</div>
          </div>

          <div class="glass-card p-4">
            <div class="text-xs text-[var(--text-muted)]">Flux de Ville Entrant (Prédictif)</div>
            <div class="text-2xl font-bold font-mono text-emerald-700 mt-1">+2</div>
            <div class="text-[11px] text-emerald-600 font-semibold mt-0.5">Patientes signalées par SF libérales</div>
          </div>

          <div class="glass-card p-4">
            <div class="text-xs text-[var(--text-muted)]">Post-Partum / Suites de Couches</div>
            <div class="text-2xl font-bold font-mono text-[var(--c-navy)] mt-1">22 / 24 lits</div>
            <div class="text-[11px] text-[var(--text-muted)] mt-0.5">4 sorties PRADO prévues demain</div>
          </div>
        </div>

        <!-- Room Grid -->
        <div class="glass-card p-5 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-['Montserrat'] font-bold text-sm text-[var(--text-main)]">Statut en Direct des 6 Salles d'Accouchement</h3>
            <div class="flex items-center gap-2">
              <button class="btn-secondary text-xs" onclick="MaterSimulator.render(2)">+ Entrée d'Urgence (OTP)</button>
              <button class="btn-primary text-xs" onclick="MaterSimulator.render(3)">Fiche 1-Page Patiente Active</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Salle 1 -->
            <div class="p-4 rounded-xl border border-[var(--border-app)] bg-[var(--c-skin-linen)] space-y-3 cursor-pointer hover:border-[var(--c-pink)] transition-all" onclick="MaterSimulator.render(3)">
              <div class="flex justify-between items-center">
                <span class="font-bold text-xs text-[var(--c-navy)]">SALLE 1 • PHYSIOLOGIQUE</span>
                <span class="glass-badge badge-danger text-[10px]">Dilat. 8 cm</span>
              </div>
              <div>
                <div class="font-bold text-sm text-[var(--text-main)]">Élodie Martin (31 ans)</div>
                <div class="text-xs text-[var(--text-muted)] mt-0.5">28 SA + 3j • G2P1 • O Positif</div>
                <div class="text-[11px] text-emerald-700 mt-1 font-semibold">Dossier de ville SageFlow connecté</div>
              </div>
              <div class="flex justify-between items-center text-[11px] pt-2 border-t border-[var(--border-app)]">
                <span>BCF : <strong class="text-emerald-700">142 bpm</strong></span>
                <span>SF : Audrey M.</span>
              </div>
            </div>

            <!-- Salle 2 -->
            <div class="p-4 rounded-xl border border-[var(--border-app)] bg-[var(--c-skin-linen)] space-y-3">
              <div class="flex justify-between items-center">
                <span class="font-bold text-xs text-[var(--c-navy)]">SALLE 2 • NATURE</span>
                <span class="glass-badge badge-navy text-[10px]">Dilat. 4 cm</span>
              </div>
              <div>
                <div class="font-bold text-sm text-[var(--text-main)]">Camille Robert (29 ans)</div>
                <div class="text-xs text-[var(--text-muted)] mt-0.5">39 SA + 5j • G1P0 • A Négatif (RAI Nég)</div>
                <div class="text-[11px] text-[var(--text-muted)] mt-1">Travail spontané • Péridurale posée</div>
              </div>
              <div class="flex justify-between items-center text-[11px] pt-2 border-t border-[var(--border-app)]">
                <span>BCF : <strong class="text-emerald-700">138 bpm</strong></span>
                <span>SF : Thomas L.</span>
              </div>
            </div>

            <!-- Salle 3 (Disponible) -->
            <div class="p-4 rounded-xl border-2 border-dashed border-emerald-500/50 bg-emerald-50/30 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <span class="text-2xl">✨</span>
              <div class="font-bold text-xs text-emerald-800">SALLE 3 • DISPONIBLE</div>
              <div class="text-[11px] text-emerald-600">Nettoyée & désinfectée • Prête pour admission</div>
              <button class="btn-primary text-xs py-1 px-3 mt-1" onclick="MaterSimulator.render(2)">Admettre une Patiente</button>
            </div>

            <!-- Salle 4 -->
            <div class="p-4 rounded-xl border border-[var(--border-app)] bg-[var(--c-skin-linen)] space-y-3">
              <div class="flex justify-between items-center">
                <span class="font-bold text-xs text-[var(--c-navy)]">SALLE 4 • SURVEILLANCE</span>
                <span class="glass-badge badge-blue text-[10px]">Pré-travail</span>
              </div>
              <div>
                <div class="font-bold text-sm text-[var(--text-main)]">Fatima Zeroual (34 ans)</div>
                <div class="text-xs text-[var(--text-muted)] mt-0.5">40 SA + 2j • G3P2 • B Positif</div>
                <div class="text-[11px] text-[var(--text-muted)] mt-1">Rupture prématurée des membranes</div>
              </div>
              <div class="flex justify-between items-center text-[11px] pt-2 border-t border-[var(--border-app)]">
                <span>BCF : <strong class="text-emerald-700">145 bpm</strong></span>
                <span>SF : Audrey M.</span>
              </div>
            </div>

            <!-- Salle 5 -->
            <div class="p-4 rounded-xl border border-[var(--border-app)] bg-[var(--c-skin-linen)] space-y-3">
              <div class="flex justify-between items-center">
                <span class="font-bold text-xs text-[var(--c-navy)]">SALLE 5 • EXPULSION</span>
                <span class="glass-badge badge-danger text-[10px] animate-pulse">À dilatation complète</span>
              </div>
              <div>
                <div class="font-bold text-sm text-[var(--text-main)]">Julie Perrin (26 ans)</div>
                <div class="text-xs text-[var(--text-muted)] mt-0.5">41 SA • G1P0 • O Négatif</div>
                <div class="text-[11px] text-[var(--c-terracotta)] mt-1 font-semibold">Présentation engagée station +3</div>
              </div>
              <div class="flex justify-between items-center text-[11px] pt-2 border-t border-[var(--border-app)]">
                <span>BCF : <strong class="text-emerald-700">140 bpm</strong></span>
                <span>Obstétricien présent</span>
              </div>
            </div>

            <!-- Salle 6 -->
            <div class="p-4 rounded-xl border border-[var(--border-app)] bg-[var(--c-skin-linen)] space-y-3">
              <div class="flex justify-between items-center">
                <span class="font-bold text-xs text-[var(--c-navy)]">SALLE 6 • CÉSARIENNE URGENCE</span>
                <span class="glass-badge badge-navy text-[10px]">Bloc Dédié</span>
              </div>
              <div>
                <div class="font-bold text-sm text-[var(--text-main)]">Réserve Urgence Vitale</div>
                <div class="text-xs text-[var(--text-muted)] mt-0.5">Opérationnelle 24h/24 • Anesthésiste sur place</div>
              </div>
              <div class="flex justify-between items-center text-[11px] pt-2 border-t border-[var(--border-app)]">
                <span>Statut : <strong class="text-emerald-700">En veille active</strong></span>
                <span>Équipe de garde</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // MODULE 2 : PASSERELLE D'ADMISSION RAPIDE (OTP & QR)
  // ===========================================================================
  moduleAdmissionRapide() {
    return `
      ${this.materTopBar('Passerelle d\'Admission Rapide & Déverrouillage OTP')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6 max-w-3xl mx-auto">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Admission Sans Couture d'une Patiente de Ville</h3>
            <p class="text-xs text-[var(--text-muted)]">Rapatriement instantané du dossier de suivi libéral en moins de 3 secondes (Suppression du trou noir médical)</p>
          </div>
          <button class="btn-secondary text-xs" onclick="MaterSimulator.render(1)">← Retour Tableau de Garde</button>
        </div>

        <div class="glass-card p-6 space-y-5">
          <div class="p-4 rounded-xl bg-[var(--c-pink-light)] border border-[var(--c-pink-border)] flex items-center gap-4">
            <span class="text-3xl">🔑</span>
            <div>
              <div class="font-bold text-sm text-[var(--c-navy)]">Déverrouillage par Clé OTP ou Scan QR Code</div>
              <p class="text-xs text-[var(--text-muted)] mt-0.5">
                La patiente présente son smartphone avec son <strong>Passeport d'Urgence SageFlow</strong>. Saisissez la clé à 6 chiffres affichée sur son écran.
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <label class="font-bold text-xs text-[var(--text-main)]">Clé d'Accès Éphémère OTP (One-Time Password) :</label>
            <div class="flex items-center gap-3">
              <input type="text" id="otp-input" maxlength="6" value="748291" class="glass-input font-mono text-center text-xl font-bold tracking-widest max-w-[200px]" placeholder="••••••">
              <button class="btn-primary text-xs py-3 px-6" onclick="MaterSimulator.unlockDossier()">
                ⚡ Déverrouiller le Dossier Médical
              </button>
            </div>
            <div class="text-[11px] text-[var(--text-muted)]">Clé valide 60 minutes • Chiffrement Zero-Knowledge de bout en bout HDS</div>
          </div>

          <div id="unlock-preview" class="p-4 rounded-lg bg-[var(--c-skin-linen)] border border-[var(--border-app)] space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                <span>✓</span> Dossier Prêt : Élodie Martin (28 SA + 3j)
              </span>
              <span class="glass-badge badge-success text-[10px]">100% Validé</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-xs text-[var(--text-muted)]">
              <div>Groupe : <strong class="text-[var(--text-main)]">O Positif</strong></div>
              <div>RAI : <strong class="text-emerald-700">Négative</strong></div>
              <div>Allergies : <strong class="text-red-700">Pénicilline</strong></div>
            </div>
            <button class="btn-primary w-full text-xs py-2" onclick="MaterSimulator.render(3)">
              Ouvrir la Fiche Clinique d'Urgence 1-Page
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // MODULE 3 : VISUALISEUR CLINIQUE D'URGENCE 1-PAGE (ZERO SCROLL)
  // ===========================================================================
  moduleUrgence1Page() {
    return `
      ${this.materTopBar('Fiche Clinique d\'Urgence 1-Page (Zero-Scroll)')}
      <div class="p-5 overflow-hidden flex-1 flex flex-col space-y-4">
        <!-- Bandeau Patient & Alertes Vitales (Always On Top) -->
        <div class="glass-card p-4 flex items-center justify-between border-l-4 border-l-[var(--c-terracotta)] shrink-0">
          <div class="flex items-center gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Élodie Martin</span>
                <span class="text-xs text-[var(--text-muted)]">(31 ans • 14/05/1995)</span>
                <span class="glass-badge badge-pink text-[10px] font-bold">G2P1</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
                <span>Terme : <strong class="text-[var(--c-navy)] font-mono text-sm">28 SA + 3j</strong></span>
                <span>• DPA : <strong>24/11/2026</strong></span>
                <span>• Suivie en ville par : <strong>Clémence Roche (SF)</strong></span>
              </div>
            </div>
          </div>

          <!-- Badges de Sécurité Vitale -->
          <div class="flex items-center gap-2">
            <div class="px-3 py-1.5 rounded-lg bg-red-100 text-red-800 font-mono font-bold text-xs border border-red-200 text-center">
              O RHÉSUS POSITIF
            </div>
            <div class="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs border border-emerald-200 text-center">
              RAI NÉGATIVE
            </div>
            <div class="px-3 py-1.5 rounded-lg bg-red-600 text-white font-mono font-bold text-xs shadow-sm text-center">
              ⚠️ ALLERGIE : PÉNICILLINE
            </div>
          </div>
        </div>

        <!-- 3-Column Zero-Scroll Layout -->
        <div class="grid grid-cols-3 gap-4 flex-1 overflow-hidden">
          <!-- Col 1 : Antécédents & Données Obstétriques de Ville -->
          <div class="glass-card p-4 overflow-y-auto space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)] border-b border-[var(--border-app)] pb-2">Données Obstétriques Clés</h4>
            <div class="text-xs space-y-2 text-[var(--text-main)]">
              <div>• <strong>Antécédent d'accouchement :</strong> 2023 (Voie basse, 3350g, pas de complication).</div>
              <div>• <strong>Streptocoque B :</strong> Prélèvement en attente (terme prématuré).</div>
              <div>• <strong>Sérologies :</strong> Toxo Négative • Rubéole Immunisée • VIH/VHB Négatifs.</div>
              <div>• <strong>Diabète gestationnel :</strong> HGPO 75g normal à 26 SA.</div>
              <div>• <strong>Dernière Hauteur Utérine :</strong> 26 cm (conforme au terme).</div>
            </div>
            <div class="pt-2 border-t border-[var(--border-app)]">
              <span class="text-[11px] text-[var(--text-muted)] font-semibold">Dernière visite en ville :</span>
              <p class="text-[11px] text-[var(--text-main)] mt-0.5">Il y a 3 jours chez Clémence Roche. Col long postérieur fermé.</p>
            </div>
          </div>

          <!-- Col 2 : Tracé Cardiotocographique BCF en Direct -->
          <div class="glass-card p-4 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                  <span class="animate-pulse-bcf text-base">💓</span>
                  <h4 class="font-bold text-xs text-[var(--text-main)]">Monitoring Fœtal Salle 1</h4>
                </div>
                <div class="flex items-center gap-1">
                  <span class="font-mono font-bold text-sm px-2 py-0.5 rounded bg-[var(--c-navy)] text-[var(--c-pink)]" id="mater-bpm-val">142</span>
                  <span class="text-[10px] text-[var(--text-muted)]">bpm</span>
                </div>
              </div>
              <div class="rounded-lg overflow-hidden border border-[var(--border-app)]">
                <canvas id="bcf-canvas-mater" class="w-full block"></canvas>
              </div>
            </div>
            <div class="p-2 rounded bg-[var(--c-skin-linen)] text-[11px] text-[var(--text-muted)] mt-2">
              Rythme fœtal réactif sans ralentissement. 2 contractions utérines enregistrées sur les 10 dernières minutes.
            </div>
          </div>

          <!-- Col 3 : Projet de Naissance & Décision Clinique -->
          <div class="glass-card p-4 flex flex-col justify-between">
            <div class="space-y-3">
              <h4 class="font-bold text-xs text-[var(--text-main)] border-b border-[var(--border-app)] pb-2">Projet de Naissance de la Patiente</h4>
              <div class="text-xs space-y-1.5 text-[var(--text-muted)]">
                <div>• Péridurale : <strong>Souhaitée si travail prolongé</strong></div>
                <div>• Liberté de mouvement : <strong>Mobilisation sur ballon</strong></div>
                <div>• Accueil nouveau-né : <strong>Peau-à-peau immédiat (1h min)</strong></div>
                <div>• Clampage cordon : <strong>Tardif (après arrêt battements)</strong></div>
                <div>• Co-parent : <strong>Présent aux côtés de la mère</strong></div>
              </div>
            </div>

            <div class="pt-3 border-t border-[var(--border-app)] space-y-2">
              <button class="btn-primary w-full text-xs py-2" onclick="alert('Dossier injecté dans le logiciel hospitalier de salle !')">
                Injecter dans le DPI Hospitalier
              </button>
              <button class="btn-secondary w-full text-xs py-2" onclick="MaterSimulator.render(5)">
                Envisager Transfert In Utero (Niveau 3)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // MODULE 4 : PRADO & LIAISON DE SORTIE
  // ===========================================================================
  modulePradoSortie() {
    return `
      ${this.materTopBar('Coordination PRADO & Liaison Sortie Maternité')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Passerelle de Sortie vers la Sage-Femme Libérale de Secteur</h3>
            <p class="text-xs text-[var(--text-muted)]">Notification automatique de sortie, transmission du compte-rendu d'accouchement et suivi post-natal précoce à domicile</p>
          </div>
          <button class="btn-secondary text-xs" onclick="MaterSimulator.render(1)">← Retour Tableau de Garde</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="glass-card p-5 space-y-3">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Sage-Femme Libérale Référente</h4>
            <div class="p-3 rounded-lg bg-[var(--c-skin-linen)] text-xs space-y-1.5">
              <div class="font-bold text-[var(--c-navy)]">Clémence Roche</div>
              <div class="text-[var(--text-muted)]">Cabinet Maïeutique 33000 Bordeaux</div>
              <div class="text-[var(--text-muted)]">Distance domicile patiente : 1.2 km</div>
              <span class="glass-badge badge-success text-[10px] mt-1">✓ Accord de prise en charge reçu</span>
            </div>
            <button class="btn-primary w-full text-xs py-2">Transmettre Compte-Rendu HDS</button>
          </div>

          <div class="lg:col-span-2 glass-card p-5 space-y-4">
            <h4 class="font-bold text-xs text-[var(--text-main)]">Synthèse d'Accouchement pour la Sortie</h4>
            <div class="p-4 rounded bg-[var(--c-skin-linen)] text-xs space-y-2 leading-relaxed">
              <div>• <strong>Date d'accouchement :</strong> 14/09/2026 à 14h22 • Voie basse eutocique spontanée.</div>
              <div>• <strong>Nouveau-né :</strong> Garçon (Léo) • Poids naissance : 3 280g • Apgar 10/10 à 5 min.</div>
              <div>• <strong>Périnée :</strong> Intact (Pas d'épisiotomie, pas de déchirure).</div>
              <div>• <strong>Alimentation :</strong> Allaitement maternel exclusif (bonne prise du sein).</div>
              <div>• <strong>Date de sortie prévue :</strong> 16/09/2026 (J+2) • Visite à domicile libérale planifiée à J+3.</div>
            </div>
            <div class="flex justify-end">
              <button class="btn-primary text-xs py-2 px-4" onclick="alert('Liaison PRADO validée ! Notification transmise à Clémence Roche.')">
                Valider la Liaison PRADO
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ===========================================================================
  // MODULE 5 : GESTION DES TRANSFERTS IN UTERO
  // ===========================================================================
  moduleTransfertInUtero() {
    return `
      ${this.materTopBar('Transferts In Utero & Rapprochement Inter-Maternités')}
      <div class="p-6 overflow-y-auto flex-1 space-y-6 max-w-4xl mx-auto">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-['Montserrat'] font-bold text-base text-[var(--text-main)]">Protocole de Transfert In Utero vers CHU Niveau 3</h3>
            <p class="text-xs text-[var(--text-muted)]">Régulation SAMU 15 / SMUR Pédiatrique & transmission du dossier médical complet chiffré HDS</p>
          </div>
          <button class="btn-secondary text-xs" onclick="MaterSimulator.render(1)">← Retour Tableau de Garde</button>
        </div>

        <div class="glass-card p-6 space-y-5 border-l-4 border-l-[var(--c-terracotta)]">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🚑</span>
            <div>
              <div class="font-bold text-sm text-[var(--c-terracotta)]">Menace d'Accouchement Prématuré (28 SA + 3j)</div>
              <div class="text-xs text-[var(--text-muted)] mt-0.5">Indication de transfert du Niveau 2B vers le Niveau 3 (Service de Réanimation Néonatale)</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="p-3 rounded bg-[var(--c-skin-linen)] space-y-1">
              <div class="font-bold text-[var(--c-navy)]">Maternité Émettrice :</div>
              <div>Hôpital Nord (Niveau 2B)</div>
              <div class="text-[11px] text-[var(--text-muted)]">Obstétricien : Dr. B. Moreau</div>
            </div>

            <div class="p-3 rounded bg-[var(--c-blue-sky-bg)] border border-[var(--c-blue-sky)] space-y-1">
              <div class="font-bold text-[var(--c-blue-ocean)]">Maternité Réceptrice :</div>
              <div>CHU Pellegrin (Niveau 3 • Réa Néonatale)</div>
              <div class="text-[11px] text-[var(--text-muted)]">Place en couveuse confirmée par le régulateur</div>
            </div>
          </div>

          <div class="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
            <strong>Traitements en cours pendant le transport SMUR :</strong>
            <div>• Tocolyse intraveineuse par Atosiban (Tractocile) initiée.</div>
            <div>• Corticothérapie anténatale (Célestène 12mg IM) pour maturation pulmonaire fœtale débutée.</div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-[var(--border-app)]">
            <span class="text-xs text-[var(--text-muted)]">Dossier médical numérique ville + hôpital consolidé</span>
            <button class="btn-urgent text-xs py-2 px-6" onclick="alert('Flux de transfert In Utero transmis au SMUR et au CHU !')">
              Transmettre le Dossier de Transfert au SAMU
            </button>
          </div>
        </div>
      </div>
    `;
  },

  unlockDossier() {
    alert("✅ Clé OTP 748291 vérifiée avec succès !\n\nLe dossier médical complet de ville d'Élodie Martin a été rapatrié en 1.8 seconde.");
    this.render(3);
  }
};

window.MaterSimulator = MaterSimulator;
