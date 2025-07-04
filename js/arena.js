// Global Variables
let currentTheme = "light" // default
let score = 0
let currentX = 0
let minDuration = 3
let maxDuration = 4.5
let interval = 2000
let amountToMove = 15

let displayedScore = document.querySelector("#score")
let change = document.querySelector("#change")
let htmlItems = document.querySelectorAll(".item")

const gameOver = document.querySelector(".over")
const paw = document.querySelector(".catcher")

if (htmlItems[0]) htmlItems[0].remove() // to remove initial dummy item in html

displayedScore.innerText = score

class Items {
  constructor(type) {
    this.type = type
    this.setScore()
    this.initHTMLElement()
  }

  setScore() {
    switch (this.type) {
      case "fish":
        this.score = 10
        break
      case "wool":
        this.score = 5
        break
      case "snakePlant":
        this.score = -10
        break
      case "onion":
        this.score = -5
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
    let answer = 0 // change variable name

    htmlItems.forEach((item) => {
      if (item.offsetLeft / 100 === randomPercentage) {
        answer = this.initializePosition
      } else {
        answer = randomPosition + "%"
      }
    })
    return answer
  }

  // A class function to generate a new element and add it to html
  initHTMLElement() {
    const parentElement = document.querySelector(".falling-items")
    const newElement = document.createElement("img")

    const animationDuration =
      Math.ceil(Math.random() * (maxDuration - minDuration) + minDuration) + "s"
    const luckAnimation = "1s"
    const originalPawWidth = paw.style.width

    const color = currentTheme === "dark" ? "white" : "black"
    newElement.setAttribute("src", `images/${color}` + `-` + `${this.type}.png`)
    newElement.setAttribute("class", "item")
    newElement.setAttribute("id", this.type)

    newElement.style.left = this.initializePosition()
    newElement.style.animationDuration = animationDuration

    if (newElement.type === "neko") {
      newElement.style.animationDuration = luckAnimation
    } else {
      newElement.style.animationDuration = animationDuration
    }

    parentElement.append(newElement)
    newElement.addEventListener("animationend", () => {
      if (catched(newElement)) {
        change.style.display = "inline"
        score += this.score
        displayedScore.innerText = score

        if (this.score < 0) {
          change.innerText = this.score
        } else if (score > 0) {
          change.innerText = "+" + this.score
        }

        if (this.type === "neko") {
          paw.style.width = "7vw"
          setTimeout(() => {
            paw.style.width = originalPawWidth
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

// A function to randomly create objects -items out of the Items class
const generateItems = () => {
  let random = Math.ceil(Math.random() * 4)
  let type
  switch (random) {
    case 1:
      type = "fish"
      break
    case 2:
      type = "wool"
      break
    case 3:
      type = "snakePlant"
      break
    case 4:
      type = "onion"
      break
  }

  return new Items(type)
}

// A function to generate luck cats to widen the paw reach
const generateLuck = () => {
  let random = Math.ceil(Math.random() * 70)
  if (random == 7) {
    return new Items("neko")
  }
}

// Check if item is within the reach of the paw +don't foregt to mention the learning material of getBoundingClientRect
const catched = (itemToBeCatched) => {
  let pawWidth = paw.getBoundingClientRect().width
  let pawStart = paw.getBoundingClientRect().x
  let pawEnd = pawStart + pawWidth
  let pawTop =
    paw.getBoundingClientRect().top - paw.getBoundingClientRect().top * 0.1

  let itemWidth = itemToBeCatched.getBoundingClientRect().width
  let itemStart = itemToBeCatched.getBoundingClientRect().x
  let itemEnd = itemStart + itemWidth
  let itemTop = itemToBeCatched.getBoundingClientRect().top

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

// A function to move the paw -catcher- upon user clicks + don't forget to reference the learning materials
const movePaw = (direction) => {
  let arena = document.querySelector(".catcher-area")

  if (
    direction === "right" &&
    paw.getBoundingClientRect().right <
      arena.getBoundingClientRect().width + 164
  ) {
    currentX += amountToMove
  } else if (direction === "left" && paw.getBoundingClientRect().left > 158) {
    currentX -= amountToMove
  }

  paw.style.transform = `translateX(${currentX}px)`
}

let itemInterval = setInterval(runGenerator, interval)

// A function to generate items every -interval- of time and update animation duration and interval based on score
function runGenerator() {
  if (score < 0) {
    htmlItems = document.querySelectorAll(".item")
    htmlItems.forEach((item) => (item.style.display = "none"))
    clearInterval(itemInterval)
    gameOver.style.display = "block"
    paw.style.display = "none"
    change.style.display = "none"
    return
  }

  if (score > 20 && minDuration >= 0.5) {
    minDuration -= 0.5
    maxDuration -= 0.5
  } else {
    minDuration = 2
    maxDuration = 4
  }
  if (interval <= 1700 && amountToMove < 90) {
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
//another event handler is needed as an MVP
