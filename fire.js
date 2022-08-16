const firePixelsArray = []
const fireWidth = 40
const fireHeigth = 40  
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":31},{"r":47,"g":15,"b":31},{"r":71,"g":15,"b":67},{"r":87,"g":23,"b":87},{"r":103,"g":31,"b":103},{"r":119,"g":31,"b":119},{"r":143,"g":39,"b":143},{"r":159,"g":47,"b":159},{"r":175,"g":63,"b":175},{"r":191,"g":71,"b":161},{"r":199,"g":71,"b":199},{"r":223,"g":79,"b":203},{"r":223,"g":87,"b":180},{"r":223,"g":87,"b":209},{"r":215,"g":95,"b":209},{"r":215,"g":95,"b":209},{"r":215,"g":103,"b":209},{"r":207,"g":111,"b":209},{"r":207,"g":119,"b":209},{"r":207,"g":127,"b":209},{"r":207,"g":135,"b":189},{"r":199,"g":135,"b":189},{"r":199,"g":143,"b":189},{"r":199,"g":151,"b":181},{"r":191,"g":159,"b":181},{"r":191,"g":159,"b":181},{"r":191,"g":167,"b":177},{"r":191,"g":167,"b":177},{"r":191,"g":175,"b":177},{"r":183,"g":175,"b":177},{"r":183,"g":183,"b":177},{"r":183,"g":55,"b":183},{"r":207,"g":111,"b":207},{"r":223,"g":159,"b":223},{"r":239,"g":199,"b":239},{"r":255,"g":255,"b":255}]

function start(){
    createFireDataStructure()
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure(){
    const numberOfPixels = fireWidth * fireHeigth
    for(let i = 0;i < numberOfPixels; i++){
        firePixelsArray[i] = 0
    }
}

function calculateFirePropagation(){
    for(let column = 0; column < fireWidth; column++){
        for(let row = 0; row < fireHeigth; row++){
            const pixelIndex = column + ( fireWidth * row)

            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth

    if(belowPixelIndex >= fireWidth * fireHeigth) {
        return
    }

    const decay = Math.floor(Math.random()* 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = 
        belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity 
}

function renderFire(){
    const debug = false
    let html = '<table cellpadding= 0 cellspacing=0>'
    for(let row = 0; row <fireHeigth; row++){
        html += '<tr>'
        for (let column = 0; column <fireWidth; column++){
            const pixelIndex = column + (fireWidth * row)
            const fireIntensity = firePixelsArray[pixelIndex]

            if(debug === true) {
            html += '<td>'
            html += `<div class="pixel-index">${pixelIndex}</div>`
            html += fireIntensity
            html += '</td>'
            } else {
                const color = fireColorsPalette[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
    
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('div#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++){
        const overflowPixelIndex = fireWidth * fireHeigth
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 36
    }
}

start()