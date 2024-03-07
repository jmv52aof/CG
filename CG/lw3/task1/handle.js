class Handle {

    static HANDLE_COLOR = 0xFFFFFF
    static HANDLE_SIZE = 1.5

    constructor( point, renderer, scene, camera ) {
        this._x = point.x
        this._y = point.y
        this._point = point
        this._scene = scene
        this._camera = camera
        this._renderer = renderer

        this._pointer = new THREE.Vector2()
        this._raycaster = new THREE.Raycaster()
        this._isDragging = false

        const geometry = new THREE.CircleGeometry( Handle.HANDLE_SIZE, 64 )
        const material = new THREE.MeshBasicMaterial( { color: Handle.HANDLE_COLOR } )
        const circle = new THREE.Mesh( geometry, material )
        circle.position.set(point.x, point.y, 0)
        scene.add(circle)
        this._mesh = circle

        window.addEventListener('pointermove', this.#onPointerMove.bind(this))
        window.addEventListener('pointerdown', this.#onPointerDown.bind(this))
        window.addEventListener('pointerup', this.#onPointerUp.bind(this))
    }
 
    #onPointerMove(event) {
        this._pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        this._pointer.y = - (event.clientY / window.innerHeight) * 2 + 1

        if (this.#isIntersectsWithPointer() || this._isDragging) {
            this._mesh.material.color.setHex(0x0000FF)
        } else {
            this._mesh.material.color.setHex(Handle.HANDLE_COLOR)
        }
        if (!this._isDragging) return

        const scenePosition = new THREE.Vector3(this._pointer.x, this._pointer.y, this._pointer.z)

        scenePosition.unproject(this._camera)
        const direction = scenePosition.sub(this._camera.position).normalize()
        const distance = - this._camera.position.z / direction.z
        scenePosition.copy(this._camera.position.clone().add(direction.multiplyScalar(distance)))

        this._mesh.position.x = scenePosition.x
        this._mesh.position.y = scenePosition.y
        this._point.x = scenePosition.x
        this._point.y = scenePosition.y
        this._mesh.position.z = 0
    }

    #onPointerDown(event) {
        this._pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        this._pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
        if (!this.#isIntersectsWithPointer()) return
        this._isDragging = true
    }

    #onPointerUp() {
        this._isDragging = false
    }

    #isIntersectsWithPointer() {
        this._raycaster.setFromCamera(this._pointer, this._camera)
        const intersects = this._raycaster.intersectObjects(this._scene.children)
        return intersects.filter(intersect => intersect.object === this._mesh).length
    }
}