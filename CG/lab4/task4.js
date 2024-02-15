
const possibleWords = [
    {
        word: "ЯБЛОКО",
        hint: "Фрукт"
    },
    {
        word: "МОНИТОР",
        hint: "Электронный прибор"
    },
    {
        word: "СИНИЙ",
        hint: "Самый популярный цвет"
    },
]

const selectedWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]
let wordPreview = selectedWord.word.split('').map(char => '_').join(' ')
let charactersPressed = []

const slider = new Slider()
load()

function load() {
    createButtons()
    update()
}

function update() {
    draw()
    requestAnimationFrame(update)
}

function draw() {
    const ctx = document.querySelector("canvas").getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    slider.draw(ctx)

    ctx.fillStyle = "black"
    ctx.font = "36px monospace"
    ctx.fillText(wordPreview, 20, 550)

    ctx.fillStyle = "blue"
    ctx.font = "24px monospace"
    ctx.fillText(selectedWord.hint, 20, 500)
}

// HELPERS

function createButtons() {
    for (let i = 0; i < 32; i++) {
        const button = document.createElement("button")
        button.innerText = String.fromCharCode('А'.charCodeAt(0) + i)
        button.addEventListener("click", onButtonClick)
        document.body.append(button)
    }
}

function onButtonClick(event) {
    charactersPressed.push(event.target.innerText)
    event.target.disabled = true

    if (selectedWord.word.indexOf(event.target.innerText) === -1) {
        slider.nextSlide()
        return
    }

    wordPreview = selectedWord.word.split('').map(char => {
        if (charactersPressed.indexOf(char) === -1) return '_'
        return char
    }).join(' ')

    if (wordPreview === selectedWord.word.split('').join(' ')) {
        alert("You win!")
    }
}