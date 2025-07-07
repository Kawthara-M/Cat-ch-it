// Global Variables
let currentTheme = "light" // default
let score = 0
let currentX = 0
let minDuration = 3
let maxDuration = 4.5
let interval = 2000
let amountToMove = 15
let startTouch = 0
let isTouching = false

let displayedScore = document.querySelector("#score")
let change = document.querySelector("#change")
let htmlItems = document.querySelectorAll(".item")
let arena = document.querySelector(".catcher-area")

const gameOver = document.querySelector(".over")
const win = document.querySelector(".win")
const paw = document.querySelector(".catcher")
const arenaDimension = arena.getBoundingClientRect()
let pawDimension = paw.getBoundingClientRect()

if (htmlItems[0]) htmlItems[0].remove() // to remove initial dummy item in html

displayedScore.innerText = score

class Items {
  constructor(type) {
    this.type = type
    this.setScore()
    this.initHTMLElement()
  }

  // A class function to set the score of each item
  setScore() {
    switch (this.type) {
      case "fish":
        this.score = 10
        break
      case "wool":
        this.score = 20
        break
      case "box":
        this.score = 30
        break
      case "snakePlant":
        this.score = -10
        break
      case "onion":
        this.score = -20
        break
      case "chocolate":
        this.score = -30
        break
      default:
        this.score = 0
    }
  }

  // A class function to randomize the new element position from left and ensure each item is differently positioned
  initializePosition() {
    htmlItems = document.querySelectorAll(".item")
    let randomPosition = Math.ceil(Math.random() * 99)
    let randomPercentage = randomPosition / 100
    let position = 0

    htmlItems.forEach((item) => {
      if (item.getBoundingClientRect().left / 100 === randomPercentage) {
        position = this.initializePosition
      } else {
        position = randomPosition + "%"
      }
    })
    return position
  }

  // A class function to generate a new element and add it to html
  initHTMLElement() {
    const parentElement = document.querySelector(".falling-items")
    const newElement = document.createElement("img")

    const animationDuration =
      Math.ceil(Math.random() * (maxDuration - minDuration) + minDuration) + "s"
    const luckAnimation = "1s"
    const originalPawWidth = pawDimension.width

    newElement.setAttribute("src", `images/black-` + `${this.type}.png`)
    newElement.setAttribute("alt", this.type)
    newElement.setAttribute("class", "item")

    newElement.style.left = this.initializePosition()

    if (newElement.type === "neko") {
      newElement.style.animationDuration = luckAnimation
    } else {
      newElement.style.animationDuration = animationDuration
    }

    parentElement.append(newElement)
    newElement.addEventListener("animationend", () => {
      if (catched(newElement)) {
        change.style.display = "inline"
        if (currentTheme === "light") {
          change.style.color = "#1e1e1e"
        } else {
          change.style.color = "rgb(50, 217, 223)"
        }
        score += this.score
        displayedScore.innerText = score

        if (this.score < 0) {
          change.innerText = this.score
        } else if (score > 0) {
          change.innerText = "+" + this.score
        }

        if (this.type === "neko") {
          paw.style.width = originalPawWidth + originalPawWidth * 0.4 + "px"
          setTimeout(() => {
            paw.style.width = originalPawWidth+"px"
          }, 60000)
        }

        setTimeout(() => {
          change.style.display = "none"
        }, 400)
      }
      newElement.remove()
    })
  }
}

// A function to randomly create objects -items- out of the Items class
const generateItems = () => {
  let random = Math.floor(Math.random() * 6)
  let types = ["fish", "wool", "box", "snakePlant", "onion", "chocolate"]
  return new Items(types[random])
}

// A function to generate luck cats to widen the paw reach
const generateLuck = () => {
  let random = Math.ceil(Math.random() * 70)
  if (random == 7) {
    return new Items("neko")
  }
}

// Check if item is within the reach of the paw, getBoundingClientRect() use is guided by "https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect"
const catched = (itemToBeCatched) => {
  pawDimension = paw.getBoundingClientRect()
  let pawWidth = pawDimension.width
  let pawStart = pawDimension.x
  let pawEnd = pawStart + pawWidth
  let pawTop = pawDimension.top - pawDimension.top * 0.1

  let itemDimensions = itemToBeCatched.getBoundingClientRect()
  let itemWidth = itemDimensions.width
  let itemStart = itemDimensions.x
  let itemEnd = itemStart + itemWidth
  let itemTop = itemDimensions.top

  if (
    ((itemStart >= pawStart && itemEnd <= pawEnd) ||
      (itemStart < pawStart && itemEnd >= pawStart) ||
      (itemStart <= pawEnd && itemEnd > pawEnd)) &&
    itemTop >= pawTop
  ) {
    return true
  } else {
    return false
  }
}

// A function to move the paw -catcher- upon user clicks; guided by "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX"
const movePaw = (direction) => {
  pawDimension = paw.getBoundingClientRect()

  if (
    direction === "right" &&
    pawDimension.right < arenaDimension.width + arenaDimension.x
  ) {
    currentX += amountToMove
  } else if (direction === "left" && pawDimension.left > arenaDimension.x) {
    currentX -= amountToMove
  }

  paw.style.transform = `translateX(${currentX}px)`
}

//A function to move th paw by touch, guided by "https://www.w3schools.com/jsref/event_touchstart.asp"
const movePawByTouch = (distance) => {
  pawDimension = paw.getBoundingClientRect()
  const newX = currentX + distance

  if (
    pawDimension.left + distance >= arenaDimension.left &&
    pawDimension.right + distance <= arenaDimension.right
  ) {
    currentX = newX
    paw.style.transform = `translateX(${currentX}px)`
  }
}

let itemInterval = setInterval(runGenerator, interval)

// A function to generate items every -interval- of time and update animation duration and interval based on score
// as long as the game isn't over
function runGenerator() {
  if (score < 0 || score >= 500) {
    htmlItems = document.querySelectorAll(".item")
    htmlItems.forEach((item) => (item.style.display = "none"))
    clearInterval(itemInterval)

    paw.style.display = "none"
    change.style.display = "none"

    if (score < 0) {
      gameOver.style.display = "block"
    } else {
      win.style.display = "block"
    }
    return
  }

  if (score > 20 && minDuration >= 0.5) {
    minDuration -= 0.5
    maxDuration -= 0.5
  } else {
    minDuration = 2
    maxDuration = 4
  }
  if (interval <= 1700 && amountToMove < 80) {
    amountToMove += 5
  }

  if (score > 25 && interval >= 350) {
    interval -= 50
    clearInterval(itemInterval)
    itemInterval = setInterval(runGenerator, interval)
  }
  if (score > 25) {
    generateLuck()
  }

  generateItems()
}

// Event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") movePaw("right")
  else if (event.key === "ArrowLeft") movePaw("left")
})

// The following event listeners were written with guide of "https://www.w3schools.com/jsref/event_touchstart.asp"
document.addEventListener("touchstart", (event) => {
  const x = event.touches[0].clientX
  pawDimension = paw.getBoundingClientRect()

  if (x >= pawDimension.left && x <= pawDimension.right) {
    startTouch = x
    isTouching = true
  }
})

document.addEventListener("touchmove", (event) => {
  if (!isTouching) return

  const currentTouch = event.touches[0].clientX
  const distance = currentTouch - startTouch

  movePawByTouch(distance)
  startTouch = currentTouch
})

document.addEventListener("touchend", () => {
  isTouching = false
})
