class Plot {
    static WIDTH = 100
    static BEZIER_STEP_SIZE = 0.01
    
    constructor() {
        this._scene = new THREE.Scene()
        this._camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, Plot.WIDTH * 3 )
        this._renderer = new THREE.WebGLRenderer({ antialias: true })
        this._handles = []

        const P0 = { x: 50, y: 50 }
        const P1 = { x: -100, y: 15 }
        const P2 = { x: 30, y: -50 }
        const P3 = { x: 80, y: -10 }
    
        this._renderer.setSize( window.innerWidth, window.innerHeight )
        document.body.appendChild( this._renderer.domElement )
        
        this._camera.position.set( 0, 0, Plot.WIDTH * 2.5)
        this._camera.lookAt( 0, 0, 0 )
        
        for (const point of [P0, P1, P2, P3]) {
            const handle = new Handle( point, this._renderer, this._scene, this._camera )
            this._handles.push(handle)
        }
    
        this._drawPlot(P0, P1, P2, P3)
    }
    
    _drawLine(x1, y1, x2, y2, color=0xFFFFFF, style='plain') {
        let material = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.75 })
        if (style === 'dashed') {
            material = new THREE.LineDashedMaterial( {
                color: color,
                linewidth: 1,
                scale: 1,
                dashSize: 3,
                gapSize: 1,
            } );
        }
    
        const points = []
        points.push( new THREE.Vector3( x1, y1, 0 ) )
        points.push( new THREE.Vector3( x2, y2, 0 ) )
        const geometry = new THREE.BufferGeometry().setFromPoints( points )
        const line = new THREE.Line( geometry, material )
        line.computeLineDistances()
        this._scene.add( line )
    }
    
    _drawBaseLines(P0, P1, P2, P3) {
        this._drawLine(P0.x, P0.y, P1.x, P1.y, 0xff00ff, 'dashed')
        this._drawLine(P1.x, P1.y, P2.x, P2.y, 0xff00ff, 'dashed')
        this._drawLine(P2.x, P2.y, P3.x, P3.y, 0xff00ff, 'dashed')
    }
    
    _getCubicBezierPoint(t, P0, P1, P2, P3) {
        const x = (1 - t) ** 3 * P0.x + 3 * (1 - t) ** 2 * t * P1.x + 3 * (1 - t) * t ** 2 * P2.x + t ** 3 * P3.x
        const y = (1 - t) ** 3 * P0.y + 3 * (1 - t) ** 2 * t * P1.y + 3 * (1 - t) * t ** 2 * P2.y + t ** 3 * P3.y
        return { x: x, y: y }
    }
    
    _getPlotPoints(P0, P1, P2, P3) {
        const points = []
        for (let i = 0; i <= 1; i += Plot.BEZIER_STEP_SIZE) {
            points.push(this._getCubicBezierPoint(i, P0, P1, P2, P3))
        }
        return points
    }
    
    _drawRulers(size, stepSize = 10) {
        this._drawLine(-size, 0, size, 0)
        this._drawLine(0, -size, 0, size)
        for (let i = -size; i <= size; i += stepSize) {
            this._drawLine(i, -1, i, 1)
            this._drawLine(-1, i, 1, i)
        }
    }
    
    _drawPlot(P0, P1, P2, P3) {
        const points = this._getPlotPoints(P0, P1, P2, P3)
        this._scene.children.filter(child => child.type === 'Line').forEach(child => { this._scene.remove(child) ; child.material.dispose() ; child.geometry.dispose() })
        this._drawRulers(Plot.WIDTH)
        this._drawBaseLines(P0, P1, P2, P3)
    
        while (points.length > 1) {
            const p1 = points.pop()
            const p2 = points[points.length - 1]
            this._drawLine(p1.x, p1.y, p2.x, p2.y, 0x00ff00)
        }
    
        this._renderer.render(this._scene, this._camera)
        requestAnimationFrame(this._drawPlot.bind(this, P0, P1, P2, P3))
    }
}

const plot = new Plot()