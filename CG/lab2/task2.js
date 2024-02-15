const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const flowers = [
    new Sunflower(10, 10),
    new Sunflower(200, 200),
]

update()

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    flowers.forEach(flower => flower.draw())
    requestAnimationFrame(update)
}