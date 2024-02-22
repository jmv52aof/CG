class Drawer {

    static #LINE_WIDTH = 4

    constructor(canvas) {
        this._canvas = canvas
        this._color = 'mediumseagreen'
        this._ctx = canvas.getContext('2d')
        this._isDrawing = false

        canvas.addEventListener('mousedown', this._onMouseDown.bind(this))
        window.addEventListener('mousemove', this._onMouseMove.bind(this))
        window.addEventListener('mouseup', this._onMouseUp.bind(this))
    }

    setColor(color) {
        this._color = color
    }

    _drawTo(x, y) {
        this._ctx.lineCap = 'round'
        this._ctx.lineJoin = 'round'
        this._ctx.lineTo(x, y)
        this._ctx.lineWidth = Drawer.#LINE_WIDTH
        this._ctx.strokeStyle = this._color
        this._ctx.stroke()
    }

    _onMouseDown(e) {
        this._isDrawing = true
        this._ctx.moveTo(e.offsetX, e.offsetY)
        this._drawTo(e.offsetX, e.offsetY)

    }

    _onMouseMove(e) {
        if (!this._isDrawing) return
        this._drawTo(e.offsetX, e.offsetY)
    }

    _onMouseUp(e) {
        this._isDrawing = false
        this._ctx.beginPath()
    }
}