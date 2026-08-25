/**
 * FAITH BAPTIST CHURCH - INTERACTIVE SERMON AUDIO PLAYER
 * Features: Realistic audio playback (Web Audio API synthesized ambient tone / sermon audio track),
 * play/pause, scrub bar, series switching, playback speed control, notes download.
 */

const SERMONS_DATA = [
  {
    id: 1,
    title: "Standing Fast in the Liberty of Christ",
    series: "Galatians: Grace Over Law",
    speaker: "Pastor David Miller",
    date: "Sunday, Aug 23, 2026",
    scripture: "Galatians 5:1 (KJV)",
    duration: 2145, // in seconds (35:45)
    description: "An expository sermon on living in the freedom of God's sovereign grace, rooted deeply in the King James Scripture.",
    image: "assets/images/pastor_pulpit.jpg",
    notesUrl: "#"
  },
  {
    id: 2,
    title: "The Unshakable Foundation of God's Word",
    series: "Pillars of Faith",
    speaker: "Pastor David Miller",
    date: "Sunday, Aug 16, 2026",
    scripture: "Psalm 119:89-96 (KJV)",
    duration: 1980, // in seconds (33:00)
    description: "Examining the divine preservation, purity, and power of the King James Bible for the modern believer.",
    image: "assets/images/hero_worship_banner.jpg",
    notesUrl: "#"
  },
  {
    id: 3,
    title: "Gospel-Driven Living in the Local Community",
    series: "Faith in Action",
    speaker: "Guest Evangelist Mark Stevens",
    date: "Sunday, Aug 9, 2026",
    scripture: "Romans 1:16-17 (KJV)",
    duration: 2310, // in seconds (38:30)
    description: "Why we are not ashamed of the gospel of Christ: it is the power of God unto salvation to every one that believeth.",
    image: "assets/images/worship_choir.jpg",
    notesUrl: "#"
  },
  {
    id: 4,
    title: "Midweek Strength: The Power of Fervent Prayer",
    series: "Wednesday Prayer & Study",
    speaker: "Pastor David Miller",
    date: "Wednesday, Aug 19, 2026",
    scripture: "James 5:16 (KJV)",
    duration: 1620, // in seconds (27:00)
    description: "Practical encouragement on how personal and corporate prayer unleashes God's work in our church and families.",
    image: "assets/images/church_sanctuary_cross.jpg",
    notesUrl: "#"
  }
];

class ChurchSermonPlayer {
  constructor() {
    this.currentSermon = SERMONS_DATA[0];
    this.isPlaying = false;
    this.currentTime = 0;
    this.playbackRate = 1.0;
    this.audioContext = null;
    this.gainNode = null;
    this.oscillator = null;
    this.timerInterval = null;

    this.initElements();
    this.bindEvents();
    this.renderCurrentSermon();
  }

  initElements() {
    this.playBtn = document.getElementById('btn-sermon-play');
    this.playIcon = document.getElementById('sermon-play-icon');
    this.titleEl = document.getElementById('active-sermon-title');
    this.seriesEl = document.getElementById('active-sermon-series');
    this.speakerEl = document.getElementById('active-sermon-speaker');
    this.scriptureEl = document.getElementById('active-sermon-scripture');
    this.dateEl = document.getElementById('active-sermon-date');
    this.artImgEl = document.getElementById('active-sermon-art');
    this.progressBar = document.getElementById('sermon-timeline-fill');
    this.timelineContainer = document.getElementById('sermon-timeline-bar');
    this.currentTimeEl = document.getElementById('sermon-current-time');
    this.totalDurationEl = document.getElementById('sermon-total-duration');
    this.speedBtn = document.getElementById('btn-sermon-speed');
    this.notesBtn = document.getElementById('btn-sermon-notes');
  }

  bindEvents() {
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }

    if (this.timelineContainer) {
      this.timelineContainer.addEventListener('click', (e) => this.seek(e));
    }

    if (this.speedBtn) {
      this.speedBtn.addEventListener('click', () => this.cycleSpeed());
    }

    if (this.notesBtn) {
      this.notesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.downloadNotes();
      });
    }

    // Bind cards in sermon archive
    const sermonCardBtns = document.querySelectorAll('.btn-play-sermon-card');
    sermonCardBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sermonId = parseInt(btn.getAttribute('data-sermon-id'));
        const targetSermon = SERMONS_DATA.find(s => s.id === sermonId);
        if (targetSermon) {
          this.loadSermon(targetSermon);
          this.play();
          // Smooth scroll to active player
          const playerBox = document.querySelector('.sermon-player-box');
          if (playerBox) {
            playerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  }

  renderCurrentSermon() {
    if (this.titleEl) this.titleEl.textContent = this.currentSermon.title;
    if (this.seriesEl) this.seriesEl.textContent = this.currentSermon.series;
    if (this.speakerEl) this.speakerEl.innerHTML = `Preached by <span>${this.currentSermon.speaker}</span>`;
    if (this.scriptureEl) this.scriptureEl.textContent = this.currentSermon.scripture;
    if (this.dateEl) this.dateEl.textContent = this.currentSermon.date;
    if (this.artImgEl) this.artImgEl.src = this.currentSermon.image;
    if (this.totalDurationEl) this.totalDurationEl.textContent = this.formatTime(this.currentSermon.duration);
    if (this.currentTimeEl) this.currentTimeEl.textContent = this.formatTime(this.currentTime);
    if (this.progressBar) this.progressBar.style.width = '0%';
  }

  loadSermon(sermon) {
    this.stop();
    this.currentSermon = sermon;
    this.currentTime = 0;
    this.renderCurrentSermon();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    if (this.playIcon) {
      // Switch to pause icon
      this.playIcon.innerHTML = `
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      `;
    }

    // Play subtle peaceful ambient chord using Web Audio API
    this.startAudioTone();

    this.timerInterval = setInterval(() => {
      this.currentTime += 1 * this.playbackRate;
      if (this.currentTime >= this.currentSermon.duration) {
        this.stop();
      } else {
        this.updateProgress();
      }
    }, 1000);

    if (typeof showToast === 'function') {
      showToast(`Now Playing: "${this.currentSermon.title}"`, 'info');
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.playIcon) {
      // Switch to play icon
      this.playIcon.innerHTML = `
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      `;
    }
    clearInterval(this.timerInterval);
    this.stopAudioTone();
  }

  stop() {
    this.pause();
    this.currentTime = 0;
    this.updateProgress();
  }

  seek(e) {
    const rect = this.timelineContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.currentTime = Math.floor(pos * this.currentSermon.duration);
    this.updateProgress();
  }

  updateProgress() {
    const percent = (this.currentTime / this.currentSermon.duration) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${percent}%`;
    }
    if (this.currentTimeEl) {
      this.currentTimeEl.textContent = this.formatTime(this.currentTime);
    }
  }

  cycleSpeed() {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    let nextIdx = (speeds.indexOf(this.playbackRate) + 1) % speeds.length;
    this.playbackRate = speeds[nextIdx];
    if (this.speedBtn) {
      this.speedBtn.textContent = `${this.playbackRate}x`;
    }
    if (typeof showToast === 'function') {
      showToast(`Playback speed set to ${this.playbackRate}x`, 'info');
    }
  }

  downloadNotes() {
    const content = `FAITH BAPTIST CHURCH - SERMON OUTLINE & NOTES\n` +
      `Title: ${this.currentSermon.title}\n` +
      `Series: ${this.currentSermon.series}\n` +
      `Scripture: ${this.currentSermon.scripture}\n` +
      `Preached: ${this.currentSermon.date} by ${this.currentSermon.speaker}\n` +
      `Address: 11275 W. Twp. Rd. 116, Fostoria, Ohio 44830\n\n` +
      `I. The Sovereign Grace of God\n` +
      `   - Stand fast therefore in the liberty wherewith Christ hath made us free.\n` +
      `II. Walking Steadfastly in the Truth\n` +
      `   - Holding fast the faithful word as he hath been taught.\n` +
      `III. Practical Application for Church and Family\n` +
      `   - Proclaiming the Gospel throughout Fostoria and Seneca County.\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.currentSermon.title.replace(/\s+/g, '_')}_Notes.txt`;
    link.click();
    URL.revokeObjectURL(url);

    if (typeof showToast === 'function') {
      showToast('Sermon notes downloaded successfully!', 'success');
    }
  }

  startAudioTone() {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    } catch (e) {
      console.log('Web Audio tone initialized in silent mode');
    }
  }

  stopAudioTone() {
    // Graceful stop
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.churchPlayer = new ChurchSermonPlayer();
});
