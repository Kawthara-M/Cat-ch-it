let score = 0
let isGameOver = false
let items = []
let paw = document.querySelector(".catcher")

class Items {
  constructor(type, effect) {
    this.type = type
    this.effect = effect
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
        this.score = 10
        break
      case "onion":
        this.score = 5
        break
      default:
        this.score = 0
        break
    }
  }

  initializePosition() {
    let left = Math.ceil(Math.random() * 100)
    left = left + "%"
    // console.log(left)
    //let right= Math.ceil(Math) I dont think we would need both left and right
    return left
  }
  initHTMLElement() {
    let parentElement = document.querySelector(".falling-items")
    let newElement = document.createElement("img")
    // console.log(this.type + "png")
    newElement.setAttribute("src", this.type + ".png")
    newElement.setAttribute("id", "item")

    this.position = this.initializePosition()
    newElement.style.left = "50%" //it should equal position this is just for initial demonstration

    parentElement.append(newElement)
  }
}

const generateItems = () => {
  let random = Math.ceil(Math.random() * 4)
  let type
  let effect

  switch (random) {
    case 1:
      type = "fish"
    case 2:
      type = "wool"
      effect = "good"
      break
    case 3:
      type = "snakePlant"
    case 4:
      type = "onion"
      effect = "bad"
      break
  }
  return new Items(type, effect)
}

const catched = () => {
  let pawWidth = paw.getBoundingClientRect().width
  let pawStart = paw.getBoundingClientRect().x
  let pawEnd = pawStart + pawWidth

  let item = document.querySelector("#item")
  let itemWidth = item.getBoundingClientRect().width
  let itemStart = item.getBoundingClientRect().x
  console.log(itemStart)
  let itemEnd = itemStart + itemWidth

  if (itemStart >= pawStart && itemEnd <= pawEnd) {
    return true
  } else {
    return false
  }
}

const movePaw = (direction) => {
      console.log("reached")

  if(direction==="right"){
    paw.style.left+=(10* paw.getBoundingClientRect().x)
    console.log(paw.getBoundingClientRect().x)
  }
}

let newItem = generateItems()

let htmlitem = document.querySelector("#item")

const removeItem = () => {
  htmlitem.remove()
  newItem = null
  console.log("worked")
}
/*if (catched) {
  htmlitem.addEventListener("animationend", removeItem)
}*/

document.addEventListener(('keydown'), (event) => {
  if (event.key === "ArrowRight") {
    console.log("clicked")
    movePaw("right")
  }
})
