const WIDTH = 100
const ANIMATION_STEP_SIZE = 0.005
const P0 = { x: 50, y: 50 }
const P1 = { x: -100, y: 15 }
const P2 = { x: 30, y: -50 }
const P3 = { x: 80, y: -10 }

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, WIDTH * 3 )
camera.position.set( 0, 0, WIDTH * 2.5)
camera.lookAt( 0, 0, 0 )

const scene = new THREE.Scene()
drawBaseLines()
drawRulers(WIDTH)
drawPlot(getPlotPoints(P0, P1, P2, P3))

function drawLine(x1, y1, x2, y2, color=0xffffff, style='plain') {
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
    scene.add( line )
}

function drawBaseLines() {
    drawLine(P0.x, P0.y, P1.x, P1.y, 0xff00ff, 'dashed')
    drawLine(P1.x, P1.y, P2.x, P2.y, 0xff00ff, 'dashed')
    drawLine(P2.x, P2.y, P3.x, P3.y, 0xff00ff, 'dashed')
}

function getCubicBezierPoint(t, P0, P1, P2, P3) {
    const x = (1 - t) ** 3 * P0.x + 3 * (1 - t) ** 2 * t * P1.x + 3 * (1 - t) * t ** 2 * P2.x + t ** 3 * P3.x
    const y = (1 - t) ** 3 * P0.y + 3 * (1 - t) ** 2 * t * P1.y + 3 * (1 - t) * t ** 2 * P2.y + t ** 3 * P3.y
    return { x: x, y: y }
}

function getPlotPoints(P0, P1, P2, P3) {
    const points = []
    for (let i = 0; i <= 1; i += ANIMATION_STEP_SIZE) {
        points.push(getCubicBezierPoint(i, P0, P1, P2, P3))
    }
    return points
}

function drawRulers(size, stepSize = 10) {
    drawLine(-size, 0, size, 0)
    drawLine(0, -size, 0, size)
    for (let i = -size; i <= size; i += stepSize) {
        drawLine(i, -1, i, 1)
        drawLine(-1, i, 1, i)
    }
}

function drawPlot(points) {
    const p1 = points.pop()
    const p2 = points[points.length - 1]
    drawLine(p1.x, p1.y, p2.x, p2.y, 0x00ff00)
    camera.position.z -= ANIMATION_STEP_SIZE * WIDTH
    renderer.render(scene, camera)
    if (points.length > 1) {
        requestAnimationFrame(drawPlot.bind(null, points))
    }
}