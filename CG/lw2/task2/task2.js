const fileInput = document.getElementById('file')
const newCanvasButton = document.getElementById('new-canvas')
const exportButton = document.getElementById('export')
const canvas = document.querySelector('canvas')
const colorPicker = document.getElementById('color-picker')

const drawer = new Drawer(canvas)

newCanvasButton.addEventListener('click', () => {
    canvas.width = 800
    canvas.height = 600
    clearRect(canvas)
})

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
        const img = new Image()
        img.src = e.target.result
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            clearRect(canvas)
            canvas.getContext('2d').drawImage(img, 0, 0)
        }
    }
})

exportButton.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `canvas_${new Date().getHours()}_${new Date().getMinutes()}.png`
    link.click()
})

colorPicker.addEventListener('input', (e) => {
    drawer.setColor(e.target.value)
})

function clearRect(canvas) {
    canvas.getContext('2d').fillStyle = 'white'
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)
}