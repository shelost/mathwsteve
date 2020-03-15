const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var CX, CY

const loop = () => {

    Resize()

    ctx.fillStyle = 'blue'
    ctx.fillRect(0,0,canvas.width, canvas.height)


    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)

function Resize(){

    canvas.width = window.innerWidth
    canvas.height = window,innerHeight
    CX = canvas.width/2
    CY = canvas.height/2
}