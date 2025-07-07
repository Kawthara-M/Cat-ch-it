const help = document.querySelector("#help")
const header = document.querySelector("header")
const intro = document.querySelector(".intro")

header.addEventListener("click", () => {
  if (header.innerText === "X") {
    help.innerText = "help"
    intro.innerHTML = `      <h1>Cat-ch It!</h1>
      <a href="arena.html">
        <img src="images/paw.gif" id="start" title="Start" alt="Cat Paw gif"  
      /></a>`
    header.innerText = ``
  }
})
help.addEventListener("click", () => {
  intro.innerHTML = ` <div class="conatiner">
      <div class="flex-container">
        <div class="item-container">
          <div class="img-container"><img src="images/black-box.png" /></div>
          <section>
            <h5>Boxes</h5>
            <p>Cats favorite place to be!</p>
            <p>Score +30</p>
          </section>
        </div>
      </div>
      <div class="flex-container">
        <div class="item-container">
          <div class="img-container">
            <img src="images/black-chocolate.png" />
          </div>
          <section>
            <h5>Chocolate</h5>
            <p>Toxic, not a tasty treat! Gotta keep it for yourself.</p>
            <p>Score -30</p>
          </section>
        </div>
      </div>
      <div class="flex-container">
        <div class="item-container">
          <div class="img-container">
            <img src="images/black-snakePlant.png" />
          </div>
          <section>
            <h5>Snake Plant</h5>
            <p>Uh-oh! This plant is pretty but poisonous for cats.</p>
            <p>Score -10</p>
          </section>
        </div>
      </div>
      <div class="flex-container">
        <div class="item-container">
          <div class="img-container">
            <img src="images/black-fish.png" />
          </div>
          <section>
            <h5>Fish</h5>
            <p>Delicious and full of flavor — a cat's favorite treat!</p>
            <p>Score +10</p>
          </section>
        </div>
      </div>
      <div class="flex-container">
        <div class="item-container">
          <div class="img-container">
            <img src="images/black-onion.png" />
          </div>
          <section>
            <h5>Onion</h5>
            <p>Dangerous! Cats should steer clear of onions.</p>
            <p>Score -20</p>
          </section>
        </div>
      </div>
      <div class="flex-container">
        <div class="item-container">
          <div class="img-container">
            <img src="images/black-wool.png" />
          </div>
          <section>
            <h5>Wool Balls</h5>
            <p>Thread it, chase it, tangle in it! classic cat fun!</p>
            <p>Score +20</p>
          </section>
        </div>
      </div>
    </div>`

  header.innerText = `X`
  help.innerText = ""
})
