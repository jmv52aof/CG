function init() {
    const RADIUS = 10

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xCCCCCC)

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, RADIUS * 3 )
    camera.position.set( 0, 0, RADIUS )
    camera.lookAt( 0, 0, 0 )

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
    
    const light = new THREE.DirectionalLight(0xffffff, 3)
    light.position.set(0, 0, 1)
    scene.add(light)
    
    const geometry = getIcosahedronGeometry(camera)
    const material = new THREE.MeshPhongMaterial({
        flatShading: true,
        shininess: 3,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        vertexColors: true,
    });
    geometry.faces.forEach(face => {
        face.color.setRGB(Math.random(), Math.random(), Math.random())
    })

    const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
    let mesh = new THREE.Mesh(geometry, material)
    let wireframe = new THREE.Mesh(geometry, wireframeMaterial)
    mesh.add(wireframe)
    scene.add(mesh)

    window.addEventListener('mousemove', (e) => {
        const theta = e.clientX / window.innerWidth * Math.PI * 2
        const phi = e.clientY / window.innerHeight * Math.PI * 2
        camera.position.x = RADIUS * Math.sin(theta) * Math.cos(phi)
        camera.position.y = RADIUS * Math.sin(theta) * Math.sin(phi)
        camera.position.z = RADIUS * Math.cos(theta)
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()

        light.position.set(camera.position.x, camera.position.y, camera.position.z)
        light.lookAt(0, 0, 0)
        
        geometry.faces.forEach(face => {
            const centroid = new THREE.Vector3().addVectors(
                geometry.vertices[face.a],
                geometry.vertices[face.b],
                geometry.vertices[face.c]
            ).divideScalar(3);
            const distance = camera.position.distanceTo(centroid)
            face.renderOrder = -distance
        })
        geometry.elementsNeedUpdate = true
        geometry.faces.sort((a, b) => a.renderOrder - b.renderOrder)
    })

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    })

    animate(scene, camera, renderer)
}

function animate(scene, camera, renderer) {
    requestAnimationFrame(animate.bind(null, scene, camera, renderer))
    renderer.render(scene, camera)
}

function getIcosahedronGeometry(camera) {
    const X = 0.525731112119133606
    const Z = 0.850650808352039932
    let vertices = [
        [-X, 0.0, Z], [X, 0.0, Z], [-X, 0.0, -Z], [X, 0.0, -Z],    
        [0.0, Z, X], [0.0, Z, -X], [0.0, -Z, X], [0.0, -Z, -X],    
        [Z, X, 0.0], [-Z, X, 0.0], [Z, -X, 0.0], [-Z, -X, 0.0] 
    ]
    vertices = vertices.map(v => new THREE.Vector3(...v))

    let faces = [ 
        [0, 4, 1], [0, 9, 4], [9, 5, 4], [4, 5, 8], [4, 8, 1],    
        [8, 10, 1], [8, 3, 10], [5, 3, 8], [5, 2, 3], [2, 7, 3],    
        [7, 10, 3], [7, 6, 10], [7, 11, 6], [11, 0, 6], [0, 1, 6], 
        [6, 1, 10], [9, 0, 11], [9, 11, 2], [9, 2, 5], [7, 2, 11] 
    ]
    faces = faces.map(f => new THREE.Face3(...f))

    const geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    geometry.faces = faces;

    return geometry
}

init()
