async function uploadFile() {
    const form = document.getElementById("uploadForm");
    const formData = new FormData(form);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    })

    const result = await response.json()
    document.getElementById("image").innerHTML 
    = `<img src="${result.path}" alt="Uploaded Image" />`
}

async function getOriginal() {
    const response = await fetch('/original', {
        method: 'GET'
    })
    
    const result = await response.json()
    document.getElementById("image").innerHTML
    = `<img src="${result.path}" alt="Original Image" />`
}

async function getBoundaries() {
    const response = await fetch('/boundaries', {
        method: 'GET'
    })
    
    const result = await response.json()
    document.getElementById("image").innerHTML
    = `<img src="${result.path}" alt="Boundaries" />`
}

async function getLinearContrast() {
    const response = await fetch('/linear_contrast', {
        method: 'GET'
    })
    
    const result = await response.json()
    document.getElementById("image").innerHTML
    = `<img src="${result.path}" alt="Linear Contrast" />`
}

async function getHistogram() {
    const response = await fetch('/histogram', {
        method: 'GET'
    })
    
    const result = await response.json()
    document.getElementById("image").innerHTML
    = `<img src="${result.path}" alt="Histogram equalization" />`
}