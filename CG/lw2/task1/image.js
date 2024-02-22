class Image {
    
    constructor(imageMetadata) {
        const imageElement = document.createElement('img')
        imageElement.src = URL.createObjectURL(imageMetadata)
        imageElement.draggable = false;
        this.imageElement = imageElement;

        this._dragStartX = 0;
        this._dragStartY = 0;
        this._isDragging = false;

        this._setX(100);
        this._setY(100);

        this.imageElement.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
    }

    _onMouseDown(event) {
        this._dragStartX = event.clientX - this._x;
        this._dragStartY = event.clientY - this._y;
        this._isDragging = true;
    }

    _onMouseMove(event) {
        if (!this._isDragging) return;
        this._setX(event.clientX - this._dragStartX);
        this._setY(event.clientY - this._dragStartY);
    }

    _onMouseUp() {
        this._isDragging = false;
    }

    _setX(x) {
        this._x = x;
        this.imageElement.style.left = x + 'px';
    }

    _setY(y) {
        this._y = y;
        this.imageElement.style.top = y + 'px';
    }
}