// Global Variables
let score = 0
let currentX = 0
const paw = document.querySelector(".catcher")
const displayedScore = document.querySelector("#score")

// Remove initial item
let htmlItems = document.querySelectorAll(".item")
if (htmlItems[0]) htmlItems[0].remove()

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

  // A class function to randomize the new element position from left
  initializePosition() {
    return Math.ceil(Math.random() * 99) + "%"
  }

  // A class function to generate a new element and add it to html
  initHTMLElement() {
    const parentElement = document.querySelector(".falling-items")
    const newElement = document.createElement("img")
    const animationDuration = Math.ceil(Math.random() * (6 - 3) + 3) + "s"  // min and max should be variable based on user score

    newElement.setAttribute("src", this.type + ".png")
    newElement.setAttribute("class", "item")

    newElement.style.left = this.initializePosition()
    newElement.style.animationDuration = animationDuration

    parentElement.append(newElement)
    newElement.addEventListener("animationend", () => {
      if (catched(newElement)) {
        console.log("catched") //should be deleted
        score += this.score
        displayedScore.innerText = score
      }
      removeItem(newElement)
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

// Check if item is within the reach of the paw +don't foregt to mention the learning material of getBoundingClientRect
const catched = (itemToBeCatched) => {
  let pawWidth = paw.getBoundingClientRect().width
  let pawStart = paw.getBoundingClientRect().x
  let pawEnd = pawStart + pawWidth
  let pawTop =
    paw.getBoundingClientRect().top - (paw.getBoundingClientRect().top * 0.1) 

  let itemWidth = itemToBeCatched.getBoundingClientRect().width
  let itemStart = itemToBeCatched.getBoundingClientRect().x
  let itemEnd = itemStart + itemWidth
  let itemTop = itemToBeCatched.getBoundingClientRect().top

  /*console.log("paw Top:" + pawTop)  // things are currently working so they have been commented and should be later deleted
  console.log("paw start: " + pawStart)
  console.log("paw end:" + pawEnd)

  console.log("item top: " + itemTop)
  console.log("item start: " + itemStart)
  console.log("item end:" + itemEnd)*/

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
  if (direction === "right") {
    currentX += 10
  } else if (direction === "left") {
    currentX -= 10
  }

  paw.style.transform = `translateX(${currentX}px)`
}

// A function to remove items
const removeItem = (element) => {
  element.remove()
  console.log("deleted")  //should be deleted later
}

// generate items
const itemInterval = setInterval(() => {
  if (score < 0) {
    clearInterval(itemInterval)
    console.log("Game Over")  //should be on screen, this is just to ensure it's working
    return
  }

  generateItems() // items fall independently
}, 2000)

// Event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") movePaw("right")
  else if (event.key === "ArrowLeft") movePaw("left")
})
