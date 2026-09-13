// =============================================================================
// SAGEFLOW BCF & CARDIOTOCOGRAPHY (CTG) REAL-TIME CANVAS ANIMATOR
// Generates physiological FHR (135-155 bpm) and Uterine Contractions (TOCO)
// =============================================================================

class BcfMonitor {
  constructor(canvasId, bpmElementId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.bpmEl = document.getElementById(bpmElementId);
    
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 500;
    this.height = this.canvas.height = 140;
    
    this.dataPoints = [];
    this.maxPoints = Math.floor(this.width / 2.5);
    this.currentBpm = 142;
    this.phase = 0;
    this.tocoVal = 12;
    this.isRunning = true;

    // Fill initial baseline points
    for (let i = 0; i < this.maxPoints; i++) {
      this.dataPoints.push({ bpm: 140 + Math.sin(i * 0.1) * 3, toco: 15 });
    }

    this.resizeHandler = () => {
      if (!this.canvas || !this.canvas.parentElement) return;
      this.width = this.canvas.width = this.canvas.parentElement.clientWidth;
      this.maxPoints = Math.floor(this.width / 2.5);
    };
    window.addEventListener('resize', this.resizeHandler);

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  animate() {
    if (!this.isRunning) return;
    this.phase += 0.05;

    // Physiological micro-variability & occasional acceleration
    const noise = (Math.random() - 0.5) * 4;
    const accel = Math.sin(this.phase * 0.12) > 0.7 ? 12 : 0;
    this.currentBpm = Math.round(140 + Math.sin(this.phase * 0.4) * 4 + noise + accel);

    // Update BPM readout
    if (this.bpmEl) {
      this.bpmEl.textContent = this.currentBpm;
    }

    // Gentle TOCO contraction every ~40s
    this.tocoVal = 14 + Math.max(0, Math.sin(this.phase * 0.05) * 45);

    // Push new point
    this.dataPoints.push({ bpm: this.currentBpm, toco: this.tocoVal });
    if (this.dataPoints.length > this.maxPoints) {
      this.dataPoints.shift();
    }

    this.draw();
    requestAnimationFrame(this.animate);
  }

  draw() {
    const isDark = document.documentElement.classList.contains('dark');
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Clear background
    ctx.fillStyle = isDark ? '#14202F' : '#FBF7F4';
    ctx.fillRect(0, 0, w, h);

    // Medical grid lines
    ctx.strokeStyle = isDark ? 'rgba(44, 66, 93, 0.45)' : 'rgba(240, 185, 189, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Horizontal baselines (120, 140, 160 bpm)
    for (let y = 20; y < h; y += 25) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    // Vertical time bars
    for (let x = 0; x < w; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.stroke();

    // Scale mapping for BCF (top 75% of canvas)
    // 120 bpm = y: 75, 140 bpm = y: 45, 160 bpm = y: 15
    const getBpmY = (bpm) => {
      const minBpm = 100;
      const maxBpm = 180;
      return 85 - ((bpm - minBpm) / (maxBpm - minBpm)) * 70;
    };

    // Draw FHR (BCF) curve
    ctx.strokeStyle = isDark ? '#F0B9BD' : '#1C375C';
    ctx.lineWidth = 2.2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();

    const step = w / this.maxPoints;
    for (let i = 0; i < this.dataPoints.length; i++) {
      const x = i * step;
      const y = getBpmY(this.dataPoints[i].bpm);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw current cursor dot
    if (this.dataPoints.length > 0) {
      const lastX = (this.dataPoints.length - 1) * step;
      const lastY = getBpmY(this.dataPoints[this.dataPoints.length - 1].bpm);
      ctx.fillStyle = isDark ? '#FFFFFF' : '#DE6349';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Lower TOCO line (bottom 25%)
    ctx.strokeStyle = isDark ? 'rgba(168, 211, 238, 0.6)' : 'rgba(82, 62, 48, 0.5)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i < this.dataPoints.length; i++) {
      const x = i * step;
      const tocoY = h - 6 - (this.dataPoints[i].toco / 100) * 28;
      if (i === 0) ctx.moveTo(x, tocoY);
      else ctx.lineTo(x, tocoY);
    }
    ctx.stroke();
  }

  destroy() {
    this.isRunning = false;
    window.removeEventListener('resize', this.resizeHandler);
  }
}

window.BcfMonitor = BcfMonitor;
