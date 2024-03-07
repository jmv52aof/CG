function init() {
    const WIDTH = 100
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, WIDTH * 3 )
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    camera.position.set( 0, 0, WIDTH * 2.5)
    camera.lookAt( 0, 0, 0 )
    
    scene.background = new THREE.Color(0xCCCCCC)

    const objects = [
        new Krash(-10, -10, scene, camera),
        new Krash(50, 50, scene, camera)
    ]
    objects.forEach(object => object.draw())

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    animate(scene, camera, renderer, objects)
}

function animate(scene, camera, renderer, objects) {
    // objects.forEach(object => object.draw())
    renderer.render(scene, camera)
    // renderer.renderLists.dispose()
    // scene.children.forEach(child => { scene.remove(child) ; child.material.dispose() ; child.geometry.dispose() })
    // scene.children = []
    requestAnimationFrame(animate.bind(this, scene, camera, renderer, objects))
}

init()