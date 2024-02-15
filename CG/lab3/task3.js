class Circle {

    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }

    draw() {
        const n = Math.max(15, Math.round(this.r / 2))
        context.textAlign = 'center'
        context.fillText(n, this.x, this.y)

        const borderIntersections = []

        if (canvas.height - this.y < this.r) {
            borderIntersections.push(...this.#getWithLineIntersections(0, canvas.height, canvas.width, canvas.height))
        }
        if (this.y - this.r < 0) {
            borderIntersections.push(...this.#getWithLineIntersections(0, 0, canvas.width, 0))
        }
        if (canvas.width - this.x < this.r) {
            borderIntersections.push(...this.#getWithLineIntersections(canvas.width, 0, canvas.width, canvas.height))
        }
        if (this.x - this.r < 0) {
            borderIntersections.push(...this.#getWithLineIntersections(0, 0, 0, canvas.height))
        }
        for (const [x, y] of borderIntersections) {
            context.beginPath()
            context.arc(x, y, 4, 0, 2 * Math.PI)
            context.fill()
            context.stroke()
            context.closePath()
        }
        
        const intersectedPointsAngles = borderIntersections
                                            .map(pair => 
                                                pair.reduce((x, y) => Math.atan2(y - this.y, x - this.x)))
                                            .sort((a, b) => a[0] - b[0])
        const deltaAngle = 2 * Math.PI / n
        const intersectedAnglesIterator = intersectedPointsAngles[Symbol.iterator]()
        
        const angleStart = intersectedAnglesIterator.next().value ?? 0
        let angle = angleStart
        context.beginPath()
        context.moveTo(this.x + this.r * Math.cos(angle - deltaAngle), this.y + this.r * Math.sin(angle - deltaAngle))
        while (angle < angleStart + 2 * Math.PI) {
            const nextPoint = [this.x + this.r * Math.cos(angle), this.y + this.r * Math.sin(angle)]
            if (nextPoint[0] >= 0 && nextPoint[0] <= canvas.width && nextPoint[1] >= 0 && nextPoint[1] <= canvas.height) {
                context.lineTo(nextPoint[0], nextPoint[1])
                angle += deltaAngle
            } else {
                const nextValue = intersectedAnglesIterator.next()
                angle = nextValue.value
                context.moveTo(this.x + this.r * Math.cos(angle), this.y + this.r * Math.sin(angle))
                if (nextValue.done) {
                    break
                }
            }
        }
        context.stroke()
    }

    #getWithLineIntersections(x1, y1, x2, y2) {
        const dx = x2 - x1
        const dy = y2 - y1
        const a = dx * dx + dy * dy
        const b = 2 * (dx * (x1 - this.x) + dy * (y1 - this.y))
        const c = (x1 - this.x) * (x1 - this.x) + (y1 - this.y) * (y1 - this.y) - this.r * this.r
        const d = b * b - 4 * a * c
        if (d < 0) {
            return []
        }

        const t1 = (-b + Math.sqrt(d)) / (2 * a)
        const t2 = (-b - Math.sqrt(d)) / (2 * a)
        return [
            [x1 + t1 * dx, y1 + t1 * dy],
            [x1 + t2 * dx, y1 + t2 * dy]
        ].filter(pair => pair[0] >= 0 && pair[0] <= canvas.width && pair[1] >= 0 && pair[1] <= canvas.height)
    }
}

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
update()

function update() {
    draw()
    requestAnimationFrame(update)
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'mediumspringgreen'

    const circles = [new Circle(0, 0, 50), new Circle(200, 200, 420), new Circle(300, 300, 150), new Circle(400, 400, 10), new Circle(500, 500, 250)]
    circles.forEach(circle => circle.draw())   
}