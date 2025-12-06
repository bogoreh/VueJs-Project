<template>
  <div class="leaderboard-container">
    <div class="leaderboard-header">
      <h2 class="leaderboard-title">🏆 Leaderboard 🏆</h2>
      <p class="leaderboard-subtitle">Top 10 Scores</p>
    </div>

    <div class="current-score-banner" v-if="currentScore">
      <div class="banner-content">
        <span class="banner-text">Your Score:</span>
        <span class="banner-score">{{ currentScore }}</span>
        <div class="banner-rank">
          <span class="rank-label">Rank</span>
          <span class="rank-value">#{{ playerRank }}</span>
        </div>
      </div>
      <div class="banner-fireworks">
        <div class="firework" v-for="n in 5" :key="n"></div>
      </div>
    </div>

    <div class="leaderboard-content">
      <div class="table-container">
        <div class="table-header">
          <div class="header-cell rank">Rank</div>
          <div class="header-cell name">Player</div>
          <div class="header-cell score">Score</div>
          <div class="header-cell date">Date</div>
          <div class="header-cell badge">Badge</div>
        </div>

        <transition-group name="list" tag="div" class="table-body">
          <div 
            v-for="(player, index) in sortedScores" 
            :key="player.id"
            class="table-row"
            :class="{
              'current-player': currentScore && player.score === currentScore,
              'top-three': index < 3
            }"
          >
            <div class="cell rank">
              <span class="rank-number">{{ index + 1 }}</span>
              <div class="medal" v-if="index < 3">
                {{ ['🥇', '🥈', '🥉'][index] }}
              </div>
            </div>
            <div class="cell name">
              <span class="player-name">{{ player.name }}</span>
            </div>
            <div class="cell score">
              <span class="score-value">{{ player.score }}</span>
            </div>
            <div class="cell date">
              <span class="date-value">{{ player.date }}</span>
            </div>
            <div class="cell badge">
              <span class="badge-icon" :class="getBadgeClass(player.score)">
                {{ getBadgeIcon(player.score) }}
              </span>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="leaderboard-stats">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-info">
            <div class="stat-label">Average Score</div>
            <div class="stat-value">{{ averageScore }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-info">
            <div class="stat-label">Highest Score</div>
            <div class="stat-value">{{ highestScore }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎮</div>
          <div class="stat-info">
            <div class="stat-label">Total Players</div>
            <div class="stat-value">{{ scores.length }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <button class="play-again-button" @click="playAgain">
        <span class="button-icon">🔄</span>
        Play Again
      </button>
      <button class="share-button" @click="shareLeaderboard">
        <span class="button-icon">📤</span>
        Share
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Leaderboard',
  props: {
    scores: {
      type: Array,
      required: true
    },
    currentScore: {
      type: Number,
      default: 0
    }
  },
  emits: ['play-again'],
  setup(props, { emit }) {
    const sortedScores = computed(() => {
      return [...props.scores].sort((a, b) => b.score - a.score).slice(0, 10)
    })

    const playerRank = computed(() => {
      if (!props.currentScore) return '-'
      const sorted = [...props.scores].sort((a, b) => b.score - a.score)
      const rank = sorted.findIndex(player => player.score === props.currentScore) + 1
      return rank > 10 ? '10+' : rank
    })

    const averageScore = computed(() => {
      if (props.scores.length === 0) return 0
      const total = props.scores.reduce((sum, player) => sum + player.score, 0)
      return Math.round(total / props.scores.length)
    })

    const highestScore = computed(() => {
      if (props.scores.length === 0) return 0
      return Math.max(...props.scores.map(player => player.score))
    })

    const getBadgeClass = (score) => {
      if (score >= 900) return 'badge-platinum'
      if (score >= 800) return 'badge-gold'
      if (score >= 700) return 'badge-silver'
      if (score >= 600) return 'badge-bronze'
      return 'badge-iron'
    }

    const getBadgeIcon = (score) => {
      if (score >= 900) return '👑'
      if (score >= 800) return '⭐'
      if (score >= 700) return '🌟'
      if (score >= 600) return '🔥'
      return '🎯'
    }

    const playAgain = () => {
      gsap.to('.leaderboard-container', {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        onComplete: () => {
          emit('play-again')
        }
      })
    }

    const shareLeaderboard = () => {
      const text = `🏆 I scored ${props.currentScore} points on Quiz Challenge! Can you beat my score? 🎯`
      if (navigator.share) {
        navigator.share({
          title: 'Quiz Challenge Leaderboard',
          text: text,
          url: window.location.href
        })
      } else {
        navigator.clipboard.writeText(text)
        alert('Leaderboard info copied to clipboard!')
      }
    }

    onMounted(() => {
      // Animate leaderboard entries
      gsap.from('.leaderboard-header', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      })

      gsap.from('.current-score-banner', {
        scale: 0,
        rotation: 360,
        duration: 1,
        delay: 0.4,
        ease: "back.out(1.7)"
      })

      gsap.from('.table-row', {
        x: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.6
      })

      gsap.from('.stat-card', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.8
      })

      gsap.from('.action-buttons', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: 1
      })

      // Animate fireworks
      gsap.to('.firework', {
        y: -100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        repeat: -1,
        ease: "power2.out"
      })
    })

    return {
      sortedScores,
      playerRank,
      averageScore,
      highestScore,
      getBadgeClass,
      getBadgeIcon,
      playAgain,
      shareLeaderboard
    }
  }
}
</script>

<style scoped>
.leaderboard-container {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 1000px;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.leaderboard-header {
  text-align: center;
  margin-bottom: 2rem;
}

.leaderboard-title {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.leaderboard-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
}

.current-score-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.banner-text {
  font-size: 1.2rem;
  opacity: 0.9;
}

.banner-score {
  font-size: 3rem;
  font-weight: bold;
}

.banner-rank {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rank-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.rank-value {
  font-size: 2rem;
  font-weight: bold;
}

.banner-fireworks {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.firework {
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  bottom: 0;
}

.firework:nth-child(1) { left: 10%; }
.firework:nth-child(2) { left: 30%; }
.firework:nth-child(3) { left: 50%; }
.firework:nth-child(4) { left: 70%; }
.firework:nth-child(5) { left: 90%; }

.table-container {
  background: #f9fafb;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 2px solid #e5e7eb;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px 80px;
  background: #374151;
  color: white;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.header-cell {
  padding: 0.5rem;
}

.table-body {
  min-height: 300px;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px 80px;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
  transition: all 0.3s ease;
}

.table-row:hover {
  background: #f3f4f6;
}

.table-row.current-player {
  background: linear-gradient(135deg, #dbeafe 0%, #d1fae5 100%);
  border-left: 4px solid #3b82f6;
}

.table-row.top-three {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 0.5rem;
}

.rank {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: #374151;
}

.rank-number {
  font-size: 1.2rem;
}

.medal {
  font-size: 1.5rem;
}

.player-name {
  font-weight: 600;
  color: #1f2937;
}

.score-value {
  font-weight: bold;
  font-size: 1.2rem;
  color: #059669;
}

.date-value {
  color: #6b7280;
  font-size: 0.9rem;
}

.badge-icon {
  display: inline-block;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 10px;
}

.badge-platinum {
  background: linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%);
}

.badge-gold {
  background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%);
}

.badge-silver {
  background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
}

.badge-bronze {
  background: linear-gradient(135deg, #fde68a 0%, #f59e0b 100%);
}

.badge-iron {
  background: linear-gradient(135deg, #6b7280 0%, #374151 100%);
  color: white;
}

.leaderboard-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1f2937;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.play-again-button, .share-button {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.play-again-button {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.share-button {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.play-again-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.share-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.button-icon {
  font-size: 1.2rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

@media (max-width: 768px) {
  .leaderboard-container {
    padding: 1rem;
  }
  
  .leaderboard-title {
    font-size: 1.8rem;
  }
  
  .table-header {
    display: none;
  }
  
  .table-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    border: 2px solid #e5e7eb;
  }
  
  .table-row.current-player {
    border-left: 4px solid #3b82f6;
  }
  
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .cell:last-child {
    border-bottom: none;
  }
  
  .cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
  }
  
  .cell.rank::before { content: 'Rank'; }
  .cell.name::before { content: 'Player'; }
  .cell.score::before { content: 'Score'; }
  .cell.date::before { content: 'Date'; }
  .cell.badge::before { content: 'Badge'; }
  
  .leaderboard-stats {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .play-again-button,
  .share-button {
    justify-content: center;
  }
  
  .banner-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .banner-score {
    font-size: 2.5rem;
  }
}
</style>