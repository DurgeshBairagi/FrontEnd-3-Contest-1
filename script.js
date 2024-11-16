
document.addEventListener('DOMContentLoaded', () => {
    const timersContainer = document.getElementById('timers-container');
    const startTimerButton = document.getElementById('start-timer');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
  
    let timers = [];
  
    startTimerButton.addEventListener('click', () => {
      const hours = parseInt(hoursInput.value) || 0;
      const minutes = parseInt(minutesInput.value) || 0;
      const seconds = parseInt(secondsInput.value) || 0;
  
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds <= 0) {
        alert('Please enter a valid time!');
        return;
      }
  
      addTimer(totalSeconds);
    });
  
    function addTimer(duration) {
      const timerId = Date.now();
      const timerElement = document.createElement('div');
      timerElement.classList.add('timer');
      timerElement.setAttribute('data-id', timerId);
  
      timerElement.innerHTML = `
        <span>${formatTime(duration)}</span>
        <button class="stop-timer">Stop Timer</button>
      `;
  
      timersContainer.appendChild(timerElement);
  
      const interval = setInterval(() => {
        duration--;
        timerElement.querySelector('span').textContent = formatTime(duration);
  
        if (duration <= 0) {
          clearInterval(interval);
          timerElement.classList.add('ended');
          timerElement.querySelector('span').textContent = 'Time’s up!';
          playAlarm();
        }
      }, 1000);
  
      timers.push({ id: timerId, interval });
  
      timerElement.querySelector('.stop-timer').addEventListener('click', () => {
        clearInterval(interval);
        timerElement.remove();
        timers = timers.filter(t => t.id !== timerId);
      });
    }
  
    function formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  
    function playAlarm() {
      const audio = new Audio('alarm.mp3'); 
      audio.play();
    }
  });
  