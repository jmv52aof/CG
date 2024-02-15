class Sunflower {

    static get canvas() { return document.querySelector('canvas') }
    static get context() { return canvas.getContext('2d') }

    constructor(positionX, positionY) {
        this._width = 300
        this._height = 400
        this.startDragX = 0
        this.startDragY = 0
        this.positionX = positionX
        this.positionY = positionY
        this.isDragging = false

        Sunflower.canvas.addEventListener('mousedown', (event) => this.#onMouseDown(event))
        Sunflower.canvas.addEventListener('mousemove', (event) => this.#onMouseMove(event))
        Sunflower.canvas.addEventListener('mouseup', (event) => this.#onMouseUp(event))
    }

    draw() {
        Sunflower.context.translate(this.positionX, this.positionY)
        this.#drawStem(100, 100)
        this.#drawRightList(200, 250)
        this.#drawLeftList(160, 230)
        this.#drawStick(140, 160, 250, 350)
        Sunflower.context.translate(-this.positionX, -this.positionY)
    }

    #drawStem(x, y) {
        const drawIterations = 800
        const distance = 2.5

        Sunflower.context.translate(x, y)
        Sunflower.context.rotate(drawIterations * 0.3)
        for (let i = 0; i < drawIterations; ++i) {
            let a = i * 137.5
            let radius = distance * Math.sqrt(i)
            let x = radius * Math.cos(a)
            let y = radius * Math.sin(a)

            if (i < 200) {
                Sunflower.context.fillStyle = 'black'
                this.#drawCircle(x, y, 2)
            }
            else {
                Sunflower.context.fillStyle = 'orange'
                this.#drawCircle(x, y, 1.5)
            }
        }
        Sunflower.context.rotate(-drawIterations * 0.3)
        Sunflower.context.translate(-x, -y)
    }

    #drawRightList(x, y) {
        x -= 150
        y -= 300
        Sunflower.context.translate(x, y)
        Sunflower.context.scale(0.8, 0.8)
        Sunflower.context.beginPath();
        Sunflower.context.strokeStyle = "green";
        Sunflower.context.lineWidth = 2;
        Sunflower.context.moveTo(266, 199);
        Sunflower.context.bezierCurveTo(142, 238, 186, 370, 184, 355);
        Sunflower.context.bezierCurveTo(173, 365, 300, 329, 264, 200);
        Sunflower.context.moveTo(186, 350)
        Sunflower.context.lineTo(264, 200)
        Sunflower.context.stroke();
        Sunflower.context.scale(1 / 0.8, 1 / 0.8)
        Sunflower.context.translate(-x, -y)
    }

    #drawLeftList(x, y) {
        x -= -30
        y -= 260
        const angle = 1
        Sunflower.context.translate(x, y)
        Sunflower.context.rotate(angle)
        Sunflower.context.scale(0.8, 0.8)
        Sunflower.context.beginPath();
        Sunflower.context.strokeStyle = "green";
        Sunflower.context.lineWidth = 2;
        Sunflower.context.moveTo(266, 199);
        Sunflower.context.bezierCurveTo(142, 238, 186, 370, 184, 355);
        Sunflower.context.bezierCurveTo(173, 365, 300, 329, 264, 200);
        Sunflower.context.moveTo(186, 350)
        Sunflower.context.lineTo(264, 200)
        Sunflower.context.stroke();
        Sunflower.context.scale(1 / 0.8, 1 / 0.8)
        Sunflower.context.rotate(-angle)
        Sunflower.context.translate(-x, -y)
    }

    #drawStick(x1, y1, x2, y2) {
        Sunflower.context.beginPath()
        Sunflower.context.strokeStyle = 'green'
        Sunflower.context.moveTo(x1, y1)
        Sunflower.context.lineTo(x2, y2)
        Sunflower.context.stroke()
    }

    #onMouseDown(event) {
        if (!this.#checkPointInsideRect(event.clientX, event.clientY, this.positionX, this.positionY, this._width, this._height)) {
            return
        }
        this.startDragX = event.clientX - this.positionX
        this.startDragY = event.clientY - this.positionY
        this.isDragging = true
    }

    #onMouseMove(event) {
        if (!this.isDragging) return
        this.positionX = event.clientX - this.startDragX
        this.positionY = event.clientY - this.startDragY
    }

    #onMouseUp(event) {
        this.isDragging = false
    }

    // HELPERS

    #drawCircle(x, y, radius) {
        Sunflower.context.beginPath()
        Sunflower.context.arc(x, y, radius, 0, Math.PI * 2)
        Sunflower.context.fill()
    }

    #checkPointInsideRect(px, py, rx, ry, rw, rh) {
        return px > rx && px < rx + rw && py > ry && py < ry + rh
    }
}