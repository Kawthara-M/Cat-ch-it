// code provided by "https://www.freecodecamp.org/news/how-to-detect-a-users-preferred-color-scheme-in-javascript-ec8ee514f1ef/"
const DARK = "(prefers-color-scheme: dark)"
const LIGHT = "(prefers-color-scheme: light)"

const changeWebsiteTheme = (scheme) => {
  currentTheme = scheme
  document.documentElement.setAttribute("data-theme", scheme)
}

const detectColorScheme = () => {
  if (!window.matchMedia) return

  const listener = (e) => {
    if (!e.matches) return

    if (e.media === DARK) {
      changeWebsiteTheme("dark")
    } else if (e.media === LIGHT) {
      changeWebsiteTheme("light")
    }
  }

  const mqDark = window.matchMedia(DARK)
  const mqLight = window.matchMedia(LIGHT)

  mqDark.addEventListener("change", listener)
  mqLight.addEventListener("change", listener)


  if (mqDark.matches) {
    changeWebsiteTheme("dark")
  } else {
    changeWebsiteTheme("light")
  }
}

detectColorScheme()
