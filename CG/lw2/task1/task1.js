const fileInput = document.getElementById('file')
const deleteAllButton = document.getElementById('remove')
const imageContainer = document.getElementById('image-container')

fileInput.addEventListener('change', (e) => {
    for (const imageMetadata of e.target.files) {
        const image = new Image(imageMetadata)
        imageContainer.appendChild(image.imageElement)
    }
})

deleteAllButton.addEventListener('click', () => {
    imageContainer.innerHTML = ''
})