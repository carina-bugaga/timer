const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const timerEl = document.querySelector('span')

//Идентификатор таймера, используемый для отмены предыдущего выполнения
let timerId

// Реализация таймера
const createTimerAnimator = () => {
  return (seconds) => {
    timerId = setInterval(() => {
      //Проверка на трёхзначное значения в часах
      if (seconds > 359999) {
        seconds = 359999
      }
      //Проверка на нулевое значение таймера
      if (seconds < 0) {
        clearInterval()
      } else {
        const hour = Math.floor(seconds / 3600).toString()
        const minutes = Math.floor((seconds / 60) % 60).toString()
        const sec = (seconds % 60).toString()

        timerEl.textContent = `${hour.padStart(2, '0')}:${minutes.padStart(
          2,
          '0'
        )}:${sec.padStart(2, '0')}`
      }
      --seconds
    }, 1000)
  }
}

const animateTimer = createTimerAnimator()

inputEl.addEventListener('input', (event) => {
  // Очищаем input, оставляя в значении только цифры
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
})

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value)

  //Сброс времени таймера
  clearInterval(timerId)

  animateTimer(seconds)

  inputEl.value = ''
})
