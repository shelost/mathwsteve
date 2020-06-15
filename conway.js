const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var CX, CY, Q


function Resize(){

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    CX = canvas.width/2
    CY = canvas.height/2
    if (canvas.width>canvas.height){
        Q = canvas.width/200
    }else{
        Q = canvas.height/200
    }

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

for (let i=0;i<200;i++){

    var row = []

    for (let j=0;j<200;j++){
        row.push(0)
    }

    Grid.push(row)
}


for (let q=0;q<4000;q++){

    Grid[Math.floor(Math.random()*200)][Math.floor(Math.random()*200)] = 1
}



/*
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
*/

function Conway(){
    var newGrid = []
    for (let i=0;i<200;i++){

        var row = []

        for (let j=0;j<200;j++){
            row.push(0)
        }

        newGrid.push(row)
    }
    for (let i=0;i<Grid.length;i++){

        for (let j=0;j<Grid[0].length;j++){

            //var Count = [false, false, false, false, false, false, false, false]
            var Count = 0
            // Check Conditions


            if (i < Grid.length-1 && i>0){

               if (Grid[i+1][j] == 1) {  Count++  }
               if (Grid[i-1][j] == 1) {  Count++  }
            }

            if (j < Grid[0].length-1 && j>0){

                if (Grid[i][j+1] == 1) {  Count++  }
                if (Grid[i][j-1] == 1) {  Count++  }
             }

             if (i>0 && j>0){
                if (Grid[i-1][j-1] == 1) {  Count++  }
             }

             if (i>0 && j<Grid[0].length){
                if (Grid[i-1][j+1] == 1) {  Count++  }
             }

             if (i<Grid.length-1 && j>0){
                if (Grid[i+1][j-1] == 1) {  Count++  }
             }

             if (i<Grid.length-1 && j<Grid[0].length){
                if (Grid[i+1][j+1] == 1) {  Count++  }
             }

             var Neighbors = []
           for (var tele = 0; tele < Count; tele++){
               Neighbors.push(0)
           }


           if (Grid[i][j] == 1){

                if (Neighbors.length > 1 &&
                    Neighbors.length < 4){

                    newGrid[i][j] = 1
                    }
           }

           if (Grid[i][j] == 0){

                if (Neighbors.length == 3){

                    newGrid[i][j] = 1
                }


            }
        }

    }
    Grid = newGrid.copyWithin()
}



const loop = () => {

    Resize()


    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width, canvas.height)

    for (let i=0;i<Grid.length;i++){

        for (let j=0;j<Grid[0].length;j++){

            switch (Grid[i][j]){

                case 0:
                    break;
                 case 1:
                    ctx.fillStyle = '#a0a0a0'
                    ctx.fillRect(j*Q, i*Q, Q, Q)
            }
        }
    }



    window.requestAnimationFrame(loop)
}
setInterval(Conway, 200)

window.requestAnimationFrame(loop)


