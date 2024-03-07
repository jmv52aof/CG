class Krash {

    static SIZE = 100
    static DRAW_SEGMENTS = 256

    constructor(x, y, scene, camera) {
        this._scene = scene
        this._camera = camera

        this._pointer = new THREE.Vector2()
        this._raycaster = new THREE.Raycaster()

        this._bodyObject = undefined
        this._drawObjects = []
        this._x = x
        this._y = y
        this._isDragging = false

        window.addEventListener('mousedown', this._onMouseDown.bind(this))
        window.addEventListener('mousemove', this._onMouseMove.bind(this))
        window.addEventListener('mouseup', this._onMouseUp.bind(this))
    }

    draw() {
        // this._drawBackground( 0xC7DFBA )
        this._drawBody( 0x5CBDD9 )
        this._drawEars( 0x5CBDD9 )
        this._drawEyes( 0x000000 )
        this._drawNose( 0xDE8787 )
        this._drawMouth( 0x000000 )
        this._drawTeeth( 0xFFFFFF )
        this._drawBrows( 0x003B68 )
        this._drawHands( 0x5CBDD9 )
        this._drawLegs( 0x5CBDD9 )
    }

    // _drawBackground(color) {
    //     const geometry = new THREE.PlaneGeometry( Krash.SIZE, Krash.SIZE )
    //     geometry.translate(this._x, this._y, 0)
    //     const material = new THREE.MeshBasicMaterial( { color: color } )
    //     const plane = new THREE.Mesh(geometry, material)
    //     const edgeGeometry = new THREE.EdgesGeometry(geometry)
    //     const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
    //     const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    //     plane.position.set(0, 0, -1)
    //     this._scene.add(plane)
    //     this._scene.add(edges)
    // }

    _drawBody(color) {
        this._bodyObject = this._drawCircle(0, 0, 25, color)
    }

    _drawEars(color) {
        const rightEar = [[-0.43,24.37],[2.56,42.85],[7.27,49.05],[13.84,48.7],[15.81,39],[8.3,32.67],[6.39,22.46]]
        this._drawCurve(rightEar, color)

        const leftEar=[[-5.75,24.16],[-4.92,36.01],[-8.12,46.27],[-14.27,49.9],[-18.81,47.98],[-17.95,42.63],[-14.53,36.44],[-9.15,22.03]]
        this._drawCurve(leftEar, color)
    }

    _drawEyes(color) {
        this._drawEllipse(-3.19, 4.79, 5, 7, 0xFFFFFF)
        this._drawEllipse(0.21, 4.58, 1.5, 1.5, color)

        this._drawEllipse(5.96, 4.36, 4.5, 5.5, 0xFFFFFF)
        this._drawEllipse(3.19, 4.58, 1.5, 1.5, color)
    }

    _drawNose(color) {
        this._drawEllipse(1.49, -0.11, 2.5, 2.5, color)
    }

    _drawMouth(color) {
        const mouth = [[-10,-5],[0.21,-16],[12,-5],[10,-5]]
        const mouth2 = [[-10,-4.9],[0.21,-15.9],[12,-4.9],[10,-4.9]]

        this._drawCubicBezier(mouth, color)
        this._drawCubicBezier(mouth2, color)
    }

    _drawBrows(color) {
        const leftBrow=[[-8.73,16.07],[-2.13,18.62],[-2,18],[-7.24,15.01]]
        const rightBrow=[[3.41,15.92],[8.09,12.45],[8.94,14.37],[4.26,16.5]]

        this._drawCurve(leftBrow, color)
        this._drawCurve(rightBrow, color)

    }

    _drawTeeth(color) {
        const leftTeeth =[[-0.21,-9.88],[0.64,-12.03],[-1.7,-12.03],[-1.58,-9.76]]
        const rightTeeth = [[0.6,-9.89],[1.06,-11.39],[2.55,-11.17],[2.3,-9.71]]
        this._drawCurve(leftTeeth, color)
        this._drawCurve(rightTeeth, color)
    }

    _drawHands(color) {
        const leftHand =[[-24.48,1.38],[-29.37,-1.6],[-32.57,-7.34],[-32.27,-14.43],[-27.78,-16.13],[-26.07,-11.65],[-25.64,-6.52],[-23.41,-1.81]]
        const rightHand =[[24.05,-0.32],[30.01,-4.92],[32.29,-13.73],[27.57,-15.92],[25.86,-10.58],[22.35,-3.3]]
        this._drawCurve(leftHand, color)
        this._drawCurve(rightHand, color)
    }

    _drawLegs(color) {
        const leftFoot = [[-1.5,-25.97],[-1.07,-33.87],[-15.11,-32.89]]
        const rightFoot = [[2.99,-33.87],[15.96,-34.09],[2.56,-25.97]]
        this._drawCurve(leftFoot, color)
        this._drawCurve(rightFoot, color)
    }

    // HELPERS //

    _drawCircle(x, y, radius, color) {
        const geometry = new THREE.CircleGeometry(radius, Krash.DRAW_SEGMENTS)
        geometry.translate(this._x, this._y, 0)
        const material = new THREE.MeshBasicMaterial({ color: color })
        const circle = new THREE.Mesh(geometry, material)
        circle.position.set(x, y, 0)
        
        this._scene.add(circle)
        this._drawObjects.push(circle)
        return circle
    }

    _drawEllipse(x, y, width, height, color) {
        const path = new THREE.Shape()
        path.absellipse( x, y, width, height, 0, 2*Math.PI, false, 0 );
        const geometry = new THREE.ShapeBufferGeometry( path )
        geometry.translate(this._x, this._y, 0)
        const material = new THREE.MeshBasicMaterial( { color: color } )
        const ellipse = new THREE.Mesh( geometry, material )
        this._scene.add(ellipse)
        this._drawObjects.push(ellipse)
        return ellipse
    }

    _drawCurve(points, color) {
        const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector2(point[0], point[1])))
        curve.closed = true
        const bufferPoints = curve.getPoints(Krash.DRAW_SEGMENTS)
        const fillShape = new THREE.Shape()
        fillShape.moveTo(bufferPoints[0].x, bufferPoints[0].y)
        for (let i = 1; i < bufferPoints.length; i++) {
            fillShape.lineTo(bufferPoints[i].x, bufferPoints[i].y)
        }
        const fillGeometry = new THREE.ShapeGeometry(fillShape)
        fillGeometry.translate(this._x, this._y, 0)
        const fillMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
        const fill = new THREE.Mesh(fillGeometry, fillMaterial)
        this._scene.add(fill)
        this._drawObjects.push(fill)
        return fill
    }

    _drawCubicBezier(points, color) {
        const line = new THREE.CubicBezierCurve3(
            new THREE.Vector3(points[0][0], points[0][1], 0),
            new THREE.Vector3(points[1][0], points[1][1], 0),
            new THREE.Vector3(points[2][0], points[2][1], 0),
            new THREE.Vector3(points[3][0], points[3][1], 0)
        )
        const linePoints = line.getPoints(Krash.DRAW_SEGMENTS)
        const geometry = new THREE.BufferGeometry().setFromPoints(linePoints)
        geometry.translate(this._x, this._y, 0)
        const material = new THREE.LineBasicMaterial({ color: color })
        const curve = new THREE.Line(geometry, material)
        this._scene.add(curve)
        this._drawObjects.push(curve)
        return curve
    }

    _onMouseDown(event) {
        if (this._getIntersectedObject() != this._bodyObject) return
        this._isDragging = true
    }

    _onMouseMove(event) {
        this._pointer.x = (event.clientX / window.innerWidth) * 2 - 1
        this._pointer.y = - (event.clientY / window.innerHeight) * 2 + 1

        if (!this._isDragging) return

        const scenePosition = new THREE.Vector3(this._pointer.x, this._pointer.y, this._pointer.z)
        scenePosition.unproject(this._camera)
        const sceneDirection = scenePosition.sub(this._camera.position).normalize()
        const distance = - this._camera.position.z / sceneDirection.z
        const dragPosition = this._camera.position.clone().add(sceneDirection.multiplyScalar(distance))
        this._drawObjects.forEach(object => object.position.set(dragPosition.x - this._x, dragPosition.y - this._y, 0))
    }

    _onMouseUp(event) {
        this._isDragging = false
    }

    _getIntersectedObject() {
        this._raycaster.setFromCamera(this._pointer, this._camera)
        const intersects = this._raycaster.intersectObjects(this._scene.children)
        if (intersects.length > 0) {
            return intersects[0].object
        }
        return undefined
    }
}