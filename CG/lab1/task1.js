const POSSIBLE_COLORS = ['darkblue', 'blue', 'aquamarine', 'seagreen', 'mediumseagreen', 'dodgerblue', 'mediumspringgreen', 'mediumblue']
const ANIMATION_SPEED_MAX_INCREASE_RADIUS_TIMES = 0.05
const MARGIN = 3

let canvas
let context
let points

load()


function load() {
    points = []
    canvas = document.querySelector('canvas')
    context = canvas.getContext('2d')

    POINTS_COORDS.forEach(element => {
        points.push({
            x: element.x,
            y: element.y,
            color: POSSIBLE_COLORS[Math.floor(Math.random() * POSSIBLE_COLORS.length)],
            radius: 0,
        })
    })
    update()
}

function update() {
    for (let point of points) {
        const isIntersectsWithAnotherPoint = points.some(
            pointComparing => point !== pointComparing && checkPointsIntersection(point, pointComparing)
        )
        if (!isIntersectsWithAnotherPoint) {
            point.x += (Math.random() - 0.5) * 0.4
            point.y += (Math.random() - 0.5) * 0.4
            point.radius += Math.random() * ANIMATION_SPEED_MAX_INCREASE_RADIUS_TIMES
        } else {
            point.radius = Math.max(0, point.radius - Math.random() * ANIMATION_SPEED_MAX_INCREASE_RADIUS_TIMES)
        }
    }

    draw()
    requestAnimationFrame(update)
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    points.forEach(point => drawPoint(point))
}

// HELPERS

function drawPoint(point) {
    context.fillStyle = point.color
    context.beginPath()
    context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
    context.fill()
}

function checkPointsIntersection(point1, point2) {
    return Math.hypot(point1.x - point2.x, point1.y - point2.y) < point1.radius + point2.radius + MARGIN
}