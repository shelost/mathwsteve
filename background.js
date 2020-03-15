const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var CX, CY, Q


function Resize(){

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    CX = canvas.width/2
    CY = canvas.height/2
    Q = canvas.width/200
}

Resize()

/*
function Particle(x,y,speed){

    this.x = x
    this.y = y
    this.r = 1

    this.xspeed = speed
    this.yspeed = speed
    
    this.draw = function(){

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()
    }
}

var Particles = []

for (let i=0;i<100;i++){

    Particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()>0.5?Math.random()*1+1:Math.random()*-1-1))
}
*/

var Grid = []

for (let i=0;i<150;i++){

    var row = []

    for (let j=0;j<200;j++){
        row.push(0)
    }

    Grid.push(row)
}


for (let q=0;q<500;q++){

    Grid[Math.floor(Math.random()*60)+20][Math.floor(Math.random()*100)+50] = 1
}

for (let q=0;q<300;q++){

    Grid[Math.floor(Math.random()*60)+40][Math.floor(Math.random()*50)] = 1
}

for (let q=0;q<500;q++){

    Grid[Math.floor(Math.random()*100)][Math.floor(Math.random()*50)+150] = 1
}



function Conway(){

    console.log('got it')

    for (let i=0;i<Grid.length;i++){

        for (let j=0;j<Grid[0].length;j++){

            var Count = [false, false, false, false, false, false, false, false]

            // Check Conditions

            
            if (i < Grid.length-1 && i>0){

               if (Grid[i+1][j] == 1) {  Count[0] = true  }
               if (Grid[i-1][j] == 1) {  Count[1] = true  }
            }

            if (j < Grid[0].length-1 && j>0){

                if (Grid[i][j+1] == 1) {  Count[2] = true  }
                if (Grid[i][j-1] == 1) {  Count[3] = true  }
             }

             if (i>0 && j>0){
                if (Grid[i-1][j-1] == 1) {  Count[4] = true  }
             }

             if (i>0 && j<Grid[0].length){
                if (Grid[i-1][j+1] == 1) {  Count[5] = true  }
             }

             if (i<Grid.length-1 && j>0){
                if (Grid[i+1][j-1] == 1) {  Count[6] = true  }
             }

             if (i<Grid.length-1 && j<Grid[0].length){
                if (Grid[i+1][j+1] == 1) {  Count[7] = true  }
             }


           var Neighbors = Count.filter(value => !!value)


           if (Grid[i][j] == 1){

                if (Neighbors.length < 2 ||
                    Neighbors.length > 3){

                    Grid[i][j] = 0

                }


           }

           if (Grid[i][j] == 0){

                if (Neighbors.length == 3){

                    Grid[i][j] = 1
                }

            }
        }

    }
}



const loop = () => {

    Resize()


    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width, canvas.height)

    for (let i=0;i<Grid.length;i++){

        for (let j=0;j<Grid[0].length;j++){

            switch (Grid[i][j]){

                case 0:
                    ctx.fillStyle = 'black'
                    ctx.fillRect(j*Q, i*Q, Q, Q)
            }
        }
    }



    /*
    for (let i=0;i<Particles.length;i++){

        var p = Particles[i]

        var one, two

        if (Particles[i+1]){
            one = Particles[i+1]
        }else{
            one = Particles[0]
        }

        if (Particles[i+2]){
            two= Particles[i+2]
        }else{
            two = Particles[0]
        }
        

        ctx.fillStyle = 'white'
        p.draw()

        p.x += p.xspeed
        p.y += p.yspeed

        if (p.x < p.r || p.x > canvas.width-p.r){

            p.xspeed *= -1
        }

        if (p.y < p.r || p.y > canvas.height-p.r){

            p.yspeed *= -1
        }

        ctx.beginPath()
        ctx.strokeStyle = '#090909'
        ctx.lineWidth = 2
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(one.x, one.y)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = '#101010'
        ctx.lineWidth = 2
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(two.x, two.y)
        ctx.stroke()
        ctx.closePath()



    
    }*/



    window.requestAnimationFrame(loop)
}
setInterval(Conway, 200)

window.requestAnimationFrame(loop)


