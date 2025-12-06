<template>
  <div class="music-player" ref="playerContainer">
    <div class="album-art-container">
      <div class="album-art" ref="albumArt">
        <div class="vinyl-record" ref="vinylRecord">
          <div class="vinyl-inner">
            <div class="vinyl-center"></div>
          </div>
        </div>
        <div class="album-cover" ref="albumCover">
          <div class="album-overlay"></div>
        </div>
      </div>
      <div class="visualizer" ref="visualizer">
        <div class="bar" v-for="i in 32" :key="i" :ref="'bar' + i"></div>
      </div>
    </div>
    
    <div class="player-controls">
      <div class="track-info">
        <h2 class="track-title" ref="trackTitle">{{ currentTrack.title }}</h2>
        <p class="artist-name">{{ currentTrack.artist }}</p>
        <p class="album-name">{{ currentTrack.album }}</p>
      </div>
      
      <div class="progress-container">
        <div class="progress-bar" ref="progressBar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          <div class="progress-handle" :style="{ left: progress + '%' }"></div>
        </div>
        <div class="time-display">
          <span class="current-time">{{ formatTime(currentTime) }}</span>
          <span class="total-time">{{ formatTime(totalTime) }}</span>
        </div>
      </div>
      
      <div class="control-buttons">
        <button class="control-btn" @click="previousTrack" title="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="19 20 9 12 19 4 19 20"></polygon>
            <line x1="5" y1="19" x2="5" y2="5"></line>
          </svg>
        </button>
        
        <button class="control-btn play-pause-btn" @click="togglePlay" title="Play/Pause" ref="playButton">
          <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="play-icon">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pause-icon">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        
        <button class="control-btn" @click="nextTrack" title="Next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </button>
      </div>
      
      <div class="volume-container">
        <button class="volume-icon" @click="toggleMute" title="Mute/Unmute">
          <svg v-if="volume > 0.5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <svg v-else-if="volume > 0 && volume <= 0.5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        </button>
        <div class="volume-slider-container">
          <input 
            type="range" 
            min="0" 
            max="100" 
            v-model="volume" 
            class="volume-slider" 
            @input="updateVolume"
          />
          <div class="volume-level" :style="{ width: volume + '%' }"></div>
        </div>
      </div>
      
      <div class="playlist">
        <h3>Playlist</h3>
        <div class="playlist-tracks">
          <div 
            v-for="(track, index) in playlist" 
            :key="index" 
            class="playlist-track" 
            :class="{ active: currentTrackIndex === index }"
            @click="selectTrack(index)"
          >
            <div class="track-number">{{ index + 1 }}</div>
            <div class="track-details">
              <div class="track-title-small">{{ track.title }}</div>
              <div class="track-artist-small">{{ track.artist }}</div>
            </div>
            <div class="track-duration">{{ track.duration }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'MusicPlayer',
  data() {
    return {
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      totalTime: 213, // 3:33 in seconds
      volume: 80,
      isMuted: false,
      currentTrackIndex: 0,
      playlist: [
        { title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: "4:04" },
        { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:22" },
        { title: "Take on Me", artist: "a-ha", album: "Hunting High and Low", duration: "3:47" },
        { title: "Sweet Dreams", artist: "Eurythmics", album: "Sweet Dreams", duration: "4:53" },
        { title: "Running Up That Hill", artist: "Kate Bush", album: "Hounds of Love", duration: "5:00" }
      ],
      playInterval: null,
      visualizerInterval: null
    };
  },
  computed: {
    currentTrack() {
      return this.playlist[this.currentTrackIndex];
    }
  },
  mounted() {
    this.initAnimations();
  },
  beforeUnmount() {
    this.clearIntervals();
  },
  methods: {
    initAnimations() {
      // Initial animations for album art and title
      gsap.from(this.$refs.albumArt, { 
        duration: 1.2, 
        scale: 0.8, 
        opacity: 0, 
        rotationY: -30,
        ease: "back.out(1.7)" 
      });
      
      gsap.from(this.$refs.trackTitle, { 
        duration: 0.8, 
        y: 20, 
        opacity: 0, 
        delay: 0.3 
      });
      
      // Create visualizer bars
      this.$nextTick(() => {
        this.createVisualizer();
      });
    },
    
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      
      if (this.isPlaying) {
        this.startPlayback();
        this.animatePlayButton();
        this.startVisualizer();
        this.rotateVinyl();
      } else {
        this.pausePlayback();
        this.stopVisualizer();
        this.pauseVinyl();
      }
    },
    
    startPlayback() {
      // Simulate playback progress
      this.playInterval = setInterval(() => {
        if (this.currentTime < this.totalTime) {
          this.currentTime += 1;
          this.progress = (this.currentTime / this.totalTime) * 100;
        } else {
          this.nextTrack();
        }
      }, 1000);
    },
    
    pausePlayback() {
      if (this.playInterval) {
        clearInterval(this.playInterval);
        this.playInterval = null;
      }
    },
    
    animatePlayButton() {
      const playButton = this.$refs.playButton;
      
      if (this.isPlaying) {
        gsap.to(playButton, {
          duration: 0.3,
          scale: 1.1,
          boxShadow: "0 0 0 10px rgba(106, 17, 203, 0.3)",
          ease: "power2.out"
        });
        
        gsap.to(playButton, {
          duration: 0.3,
          scale: 1,
          boxShadow: "0 0 0 0 rgba(106, 17, 203, 0)",
          delay: 0.3,
          ease: "power2.in"
        });
      }
    },
    
    rotateVinyl() {
      if (this.$refs.vinylRecord) {
        gsap.to(this.$refs.vinylRecord, {
          rotation: 360,
          duration: 4,
          repeat: -1,
          ease: "linear"
        });
      }
    },
    
    pauseVinyl() {
      if (this.$refs.vinylRecord) {
        gsap.killTweensOf(this.$refs.vinylRecord);
      }
    },
    
    createVisualizer() {
      // Initialize visualizer bars with random heights
      if (this.$refs.bar1) {
        this.$refs.bar1.forEach((bar, index) => {
          gsap.set(bar, {
            height: `${Math.random() * 20 + 5}px`,
            backgroundColor: this.getBarColor(index)
          });
        });
      }
    },
    
    startVisualizer() {
      this.stopVisualizer();
      
      this.visualizerInterval = setInterval(() => {
        if (this.$refs.bar1) {
          this.$refs.bar1.forEach((bar, index) => {
            gsap.to(bar, {
              duration: 0.3,
              height: `${Math.random() * 40 + 10}px`,
              backgroundColor: this.getBarColor(index),
              ease: "power2.out"
            });
          });
        }
      }, 150);
    },
    
    stopVisualizer() {
      if (this.visualizerInterval) {
        clearInterval(this.visualizerInterval);
        this.visualizerInterval = null;
      }
    },
    
    getBarColor(index) {
      const colors = ['#6a11cb', '#2575fc', '#7ee8fa', '#ff9a9e', '#a18cd1'];
      return colors[index % colors.length];
    },
    
    nextTrack() {
      this.clearIntervals();
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
      this.resetPlayback();
      
      // Animate track change
      gsap.from(this.$refs.trackTitle, {
        duration: 0.5,
        x: 30,
        opacity: 0,
        ease: "power2.out"
      });
      
      if (this.isPlaying) {
        setTimeout(() => {
          this.startPlayback();
          this.startVisualizer();
          this.rotateVinyl();
        }, 300);
      }
    },
    
    previousTrack() {
      this.clearIntervals();
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
      this.resetPlayback();
      
      // Animate track change
      gsap.from(this.$refs.trackTitle, {
        duration: 0.5,
        x: -30,
        opacity: 0,
        ease: "power2.out"
      });
      
      if (this.isPlaying) {
        setTimeout(() => {
          this.startPlayback();
          this.startVisualizer();
          this.rotateVinyl();
        }, 300);
      }
    },
    
    selectTrack(index) {
      this.clearIntervals();
      this.currentTrackIndex = index;
      this.resetPlayback();
      
      if (this.isPlaying) {
        setTimeout(() => {
          this.startPlayback();
          this.startVisualizer();
          this.rotateVinyl();
        }, 300);
      }
    },
    
    resetPlayback() {
      this.currentTime = 0;
      this.progress = 0;
      this.pauseVinyl();
    },
    
    clearIntervals() {
      this.pausePlayback();
      this.stopVisualizer();
    },
    
    updateVolume() {
      // Volume change animation
      gsap.to('.volume-level', {
        duration: 0.2,
        width: `${this.volume}%`,
        ease: "power2.out"
      });
    },
    
    toggleMute() {
      this.isMuted = !this.isMuted;
      const savedVolume = this.volume;
      
      if (this.isMuted) {
        this.volume = 0;
      } else {
        this.volume = savedVolume || 80;
      }
    },
    
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  }
};
</script>

<style scoped>
.music-player {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.album-art-container {
  position: relative;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-art {
  width: 250px;
  height: 250px;
  position: relative;
  margin-bottom: 25px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.vinyl-record {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(45deg, #111 0%, #333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.vinyl-inner {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: linear-gradient(45deg, #222 0%, #000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.vinyl-center {
  width: 20%;
  height: 20%;
  border-radius: 50%;
  background: #6a11cb;
  box-shadow: 0 0 10px rgba(106, 17, 203, 0.7);
}

.album-cover {
  position: absolute;
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.album-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
}

.visualizer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  height: 50px;
  width: 100%;
  max-width: 400px;
}

.bar {
  width: 8px;
  height: 20px;
  border-radius: 4px;
  background-color: #6a11cb;
  transition: height 0.3s ease;
}

.player-controls {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.track-info {
  text-align: center;
}

.track-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #7ee8fa, #6a11cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.artist-name {
  font-size: 1.2rem;
  color: #a0a0c0;
  margin-bottom: 4px;
}

.album-name {
  font-size: 1rem;
  color: #7a7a9a;
  font-style: italic;
}

.progress-container {
  margin: 10px 0;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  position: relative;
  margin-bottom: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border-radius: 3px;
  transition: width 0.5s linear;
  position: absolute;
  left: 0;
  top: 0;
}

.progress-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  box-shadow: 0 0 10px rgba(106, 17, 203, 0.7);
  z-index: 2;
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #a0a0c0;
}

.control-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 10px 0;
}

.control-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.control-btn:active {
  transform: translateY(0);
}

.play-pause-btn {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  box-shadow: 0 10px 20px rgba(106, 17, 203, 0.4);
}

.play-pause-btn:hover {
  background: linear-gradient(135deg, #5a0db9, #1c68f0);
  transform: scale(1.05);
}

.volume-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;
}

.volume-icon {
  background: transparent;
  border: none;
  color: #a0a0c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.volume-icon:hover {
  color: #fff;
}

.volume-slider-container {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.volume-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.volume-level {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border-radius: 3px;
  left: 0;
  top: 0;
  width: 80%;
  transition: width 0.2s ease;
}

.playlist {
  margin-top: 10px;
}

.playlist h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #7ee8fa;
}

.playlist-tracks {
  max-height: 220px;
  overflow-y: auto;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px;
}

.playlist-track {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.playlist-track:hover {
  background: rgba(255, 255, 255, 0.05);
}

.playlist-track.active {
  background: rgba(106, 17, 203, 0.2);
  border-left: 3px solid #6a11cb;
}

.track-number {
  width: 30px;
  font-size: 0.9rem;
  color: #a0a0c0;
}

.track-details {
  flex: 1;
}

.track-title-small {
  font-weight: 500;
  color: #fff;
  margin-bottom: 2px;
}

.track-artist-small {
  font-size: 0.85rem;
  color: #a0a0c0;
}

.track-duration {
  font-size: 0.85rem;
  color: #a0a0c0;
}

/* Scrollbar styling */
.playlist-tracks::-webkit-scrollbar {
  width: 6px;
}

.playlist-tracks::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.playlist-tracks::-webkit-scrollbar-thumb {
  background: rgba(106, 17, 203, 0.5);
  border-radius: 10px;
}

.playlist-tracks::-webkit-scrollbar-thumb:hover {
  background: rgba(106, 17, 203, 0.7);
}

@media (min-width: 768px) {
  .album-art-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
  
  .visualizer {
    width: 45%;
    margin-bottom: 20px;
  }
}
</style>