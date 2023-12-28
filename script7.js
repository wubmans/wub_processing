var animalcules = []
var system;

class Animalcule 
{
   
    points;
    velocity = {}

    constructor(points)
    {
       

        for (let i = 0; i < points.length ; i++) {
            system.constrain(points[i], points[(i + 1) % points.length])
            system.constrain(points[i], points[(i + 2) % points.length])
            system.constrain(points[i], points[(i + 3) % points.length])
        }

        this.points = points;
    }

    checkBounds()
    {
        for (let i = 0; i < this.points.length; i++)
        {
            let point = this.points[i]
        

            if (point.x > 450)
            {
                let dx = 500 - point.x
                point.x  += - 100 / (dx * dx  + 1)
                this.velocity.x +=  - 100 / (dx * dx  + 1)
            }

            if (point.x < 50)
            {
                let dx = point.x
                point.x  += 100 / (dx * dx + 1)
                this.velocity.x +=  100 / (dx * dx + 1)
            }

            if (point.y > 450)
            {
                let dy = 500 - point.y
                point.y  += - 100 / (dy * dy + 1)
                this.velocity.y += - 100 / (dy * dy + 1)
            }

            if (point.y < 50)
            {
                let dy = point.y
                point.y  += 100 / (dy * dy + 1)
                this.velocity.y += 100 / (dy * dy + 1)
            }
        }

    }

    update()
    {
        this.checkBounds();
        this.checkEntities();
        
        let point = this.points[0]
        point.x += this.velocity.x
        point.y += this.velocity.y

        
        
    }

    draw()
    {

        for (let i = 0; i < this.points.length; i++) 
        {
            circle(this.points[i].x, this.points[i].y, 3)
        }

        strokeWeight(2.3)
        fill(255)

        beginShape()
        for (let i = 0; i < this.points.length + 3; i++) 
        {
            curveVertex(this.points[i % this.points.length].x, this.points[i % this.points.length].y)
        }
        // curveVertex(this.points[0].x, this.points[0].y)
        endShape()
    }

    checkEntities()
    {
        // for (let i = 0; i < animalcules.length; i++) 
        // {
        //     const animalcule = animalcules[i];
        //     if (animalcule == this)
        //     {
        //         continue;
        //     }

        //     for (let j = 0; j < animalcule.points.length; j++) {
        //         let p0 = animalcule.points[j];
            
        //         for (let k = 0; k < this.points.length; k++)
        //         {
        //             let p1 = this.points[k]

        //             let d = (p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y)

        //             if (d < 10)
        //             {
        //                 let m = {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 }

        //                 let q = (d - 10) / 6
        //                 // let q = 10

        //                 p0.x += q * (m.x - p0.x)
        //                 p0.y += q * (m.y - p0.y)

        //                 p1.x += q * (m.x - p1.x)
        //                 p1.y += q * (m.y - p1.y)
        //             }
        //         }

        //         // element = animalcule.segments[j][1];
            
        //         // d = element.copy().sub(this.position)
        //         // if (d.mag() < 20)
        //         // {
        //         //     this.velocity.sub(d.mult( 0.1 / (d.mag() * d.mag())))
        //         // }
        //     }
        // }
    }
}


function draw()
{
    
    system.update()
    clear()


    for (let i = 0; i < animalcules.length; i++) 
    {
        const animalcule = animalcules[i];
        animalcule.update()
        animalcule.draw()    
    }
    
}



// function mouseDragged()
// {
//     let p;
//     let minD = -1;

//     points.forEach(point => 
//     {
//         let d = (mouseX - point.x) * (mouseX - point.x) + (mouseY - point.y) * (mouseY - point.y)
//         if (d < minD || minD == -1)
//         {
//             p = point
//             minD = d
//         }
//     })

//     p.x = mouseX
//     p.y = mouseY

//     system.update()
// }

function setup()
{



   
    createCanvas(500, 500)
    system = new System();

    for (let i = 0; i < 20; i++) 
    {
        let points = []
        let p = { x: random() * 230 + 100, y: random() * 230 + 100 }
        let r = random() * 20 + 4 
        let f = random() * 0.7 + 0.3 
        let n = 20

        
        for (let i = 0; i < n; i++) {
            points.push({ x: p.x + cos(TWO_PI / n * i) * r, y: p.y + sin(TWO_PI / n * i) * r * f })
        }

        animalcule = new Animalcule(points)
        animalcule.velocity = { x: random() * 20 - 10, random, y: random() * 20 - 10 }

        animalcules.push(animalcule)
    }

}

