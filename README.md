<h1>
  <img src="images/paw.gif"  width="30" height="30" style="vertical-align:middle;">
  Cat-ch It!
</h1>

**By:**  Kawthar Mohammad |
**Date:** July / 07/ 2025 


**[GitHub](https://github.com/Kawthara-M)** |
**[LinkedIn](www.linkedin.com/in/kawthar-ahmad-331658361)**

## Description

A cat themed game to catch fallen items; good & bad ones each with corresponding effect on score. Minus score leads to game over. The speed of falling items increases along with the score. Support to touchable devices was considered within development.
<br>

| Deployed version of **[Cat-ch-It](https://cat-ch-it.surge.sh/)** |

## Technologies Used

- HTML
- CSS
- JavaScript

## Pseudocode

The following pseudocode was set as an initial plan. It emphises the need of a class to initiate items, a function to generate instances out of this class, and another to determine if items were catched and update score, all while the game isn't considered over yet.

```
let score = 0
let gameSpeed = startSpeed
let isGameOver = FALSE

CLASS Item
    properties: type, score, position, dimension

FUNCTION generateItem()
    // Create a random item object with properties


FUNCTION removeItem(item)
    IF item is beyond cat's reach
        DELETE item

FUNCTION catched(item, catPaw)
    IF item.position is within cat's paw reach
        return TRUE

WHILE isGameOver = FALSE DO
    generateItem()
    IF catched  THEN
        IF item is good THEN
            INCREASE score
        ELSE IF item is bad THEN
            DECREASE score
        ENDIF
    ELSE
	removeItem()
    ENDIF

    IF score < 0 THEN
        SET isGameOver = TRUE
        DISPLAY "Game Over"
    ELSE
        UPDATE gameSpeed
        UPDATE item fall speed to gameSpeed
    ENDIF

ENDWHILE

END
```

## Wireframes

**Start Preview**
<br>
<img src="images/start.png"  width="50%" height="auto" style="vertical-align:middle;">

**Arena Preview**
<br>
<img src="images/preview.png"  width="50%" height="auto" style="vertical-align:middle;">



### **Future Updates**
---

- More responsiveness to different devices
- Audio to livesh the game



### **Credits**
---
##### Images: [Flaticon](https://www.flaticon.com/search?word=cat)

##### Dark Theme Guide: [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-detect-a-users-preferred-color-scheme-in-javascript-ec8ee514f1ef/)

##### Paw Movement Guide: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX)

##### Touch Events Handlers Guide: [W3School](https://www.w3schools.com/jsref/event_touchstart.asp)


