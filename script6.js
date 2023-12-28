var animalcules = []

class Animalcule
{
    segments = []
    points = []

    constructor(position, velocity, n = 5)
    {
        this.position = position;
        this.velocity = velocity;
        this.energy = random() * 1000 + 500;

        let p = this.position.copy()
        this.rotations = []

        this.l = 16

        // this.points = []

        for (let i = 0; i < n; i++) 
        {
            this.points.push(p.copy())
            let d = createVector(randomGaussian(0, this.l), randomGaussian(0, this.l))
            p.add(d)
        }

        // for (let i = 0; i < n - 1; i++) 
        // {
        //     this.segments.push([lpoints[i], rpoints[i],     1 ]);
        //     // this.segments.push([lpoints[i], lpoints[i + 1],    1    ]);
        //     // this.segments.push([rpoints[i], rpoints[i + 1],    1    ]);

        //     // this.segments.push([lpoints[i], rpoints[i + 1], Math.sqrt(2) ]);
        //     // this.segments.push([lpoints[i + 1], rpoints[i], Math.sqrt(2) ]);
        // }

        // this.segments.push([lpoints[n - 1], rpoints[n - 1], 1 ])
    }

    checkBounds()
    {
        if (this.position.x > 450)
        {
            let dx = 500 - this.position.x
            this.velocity.add(createVector(- 100 / (dx * dx  + 1), 0))
        }

        if (this.position.x < 50)
        {
            let dx = this.position.x
            this.velocity.add(createVector(100 / (dx * dx + 1), 0))
        }

        if (this.position.y > 450)
        {
            let dy = 500 - this.position.y
            this.velocity.add(createVector(0, - 100 / (dy * dy + 1)))
        }

        if (this.position.y < 50)
        {
            let dy = this.position.y
            this.velocity.add(createVector(0, 100 / (dy * dy + 1)))
        }

    }

    checkEntities()
    {
        for (let i = 0; i < animalcules.length; i++) 
        {
            const animalcule = animalcules[i];
            if (animalcule == this)
            {
                continue;
            }

            for (let j = 0; j < animalcule.points.length - 2; j++) {
                let element = animalcule.points[j];
            
                let d = element.copy().sub(this.position)
                if (d.mag() < 50)
                {
                    this.velocity.sub(d.mult( 0.1 / (d.mag() * d.mag())))
                }

                // element = animalcule.segments[j][1];
            
                // d = element.copy().sub(this.position)
                // if (d.mag() < 20)
                // {
                //     this.velocity.sub(d.mult( 0.1 / (d.mag() * d.mag())))
                // }
            }
        }
    }

    processBody()
    {
        this.position.add(this.velocity)
        this.points[0] = this.position
        // return

        // for (let i = 0; i < this.segments.length -1; i++) 
        // {
        //     // const a = this.segments[i];
        //     // a.add(this.velocity.copy().mult(0.5))
            
        // }

        let l = 6
        let iterations = 15

        for (let ii = 0; ii < iterations; ii++) 
        {

            for (let i = 0; i < this.points.length - 1; i++) 
            {
                let a = this.points[i]

                for (let j = i + 1; j < this.points.length; j ++)
                {
                    let b = this.points[j]
                
                    let ax = a.x;
                    let ay = a.y;

                    let bx = b.x;
                    let by = b.y;

                    let mx = (a.x + b.x) * 0.5;
                    let my = (a.y + b.y) * 0.5;

                    let dx = (a.x - b.x);
                    let dy = (a.y - b.y);

                    let d = Math.sqrt(dx * dx + dy * dy)
                    let q = (d - l  ) / l  * 0.6

                    if ((j - i != 1) && d > l)
                    {
                        continue
                    }

                    if (i != 0)
                    {
                        a.x += q * (mx - ax)
                        a.y += q * (my - ay)
                    }

                    b.x += q * (mx - bx)
                    b.y += q * (my - by)
                }
            }                    
        }
        // for (let i = 0; i < this.segments.length - 1; i++) 
        // {
        //     const a = this.segments[i];
        //     const b = this.segments[i + 1];

        //     let x = b.copy().sub(a)
        //     let p0 = a.copy().add(x.copy().rotate(HALF_PI).mult(0.5))
        //     let p1 = a.copy().add(x.copy().rotate(- HALF_PI).mult(0.5))
            
        //     //line(p0.x, p0.y, p1.x, p1.y)

        //     lpoints.push(p0)
        //     rpoints.push(p1)
            
        // }

        // let points = lpoints.concat(rpoints.reverse())

        // for (let i = 0; i < points.length -1; i++) 
        // {
        //     const a = points[i];
        //     const b = points[i + 1];

        //     let f = b.copy().sub(a)
        //     let h = f.mag();

        //     if (h > 10)
        //     {
        //         b.sub(f.setMag(h - 10))
        //     }
        //     else if (h < 10)
        //     {
        //         b.add(f.setMag(10 - h))
        //     }
            
        // }

        // beginShape()
        // stroke(0)
        // strokeWeight(2)
        // for (let k = 0; k < points.length; k++) {
        //     const p = points[k];
        //     curveVertex(p.x, p.y)
        // }
        // endShape(CLOSE)
    }

    update()
    {

        this.checkBounds();
        this.checkEntities()

        this.position.add(this.velocity.copy().mult((this.energy / 1000)));

        this.velocity.x = constrain(this.velocity.x, -0.5, 0.5)
        this.velocity.y = constrain(this.velocity.y, -0.5, 0.5)


        this.processBody();

        this.energy -= 0.01;

        if (this.energy < 0)
        {
            this.energy = 0
        }
        
    }

    draw()
    {
        // beginShape()
        // stroke(0)
        // strokeWeight(2)

        // for (let i = 0; i < this.segments.length - 1; i++) 
        // {
        //     //const a = this.segments[i][0];
        //     let p = this.segments[i][0];
        //     curveVertex(p.x, p.y)
        // }

        // for (let i = this.segments.length - 1; i >= 0; i--) 
        // {
        //     //const a = this.segments[i][0];
        //     let p = this.segments[i][1];
        //     curveVertex(p.x, p.y)
        // }

        // endShape(CLOSE)

       

     
        for (let i = 0; i < this.points.length - 1; i++) 
        {
            // strokeWeight(13);
            // fill(255, 30)
            // stroke(0, 30);
            // line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y)

            strokeWeight(9);
            noFill()
            stroke(1240, 20);
            line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y)

            strokeWeight(8);
            stroke(0, 20);
            line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y)

            strokeWeight(6);
            stroke(255, 40, 40, 60);
            line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y)

            strokeWeight(3);
            fill(80, 255)
            stroke(80, 40, 40, 255);
            line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y)
        }

        strokeWeight(1);
        stroke(128, 20)
        fill(255, 10)
        this.points.forEach(point => 
        {
            circle(point.x, point.y, 3)
        })
    }

}



function draw()
{
    clear()
    animalcules.forEach(animalcule => {
        animalcule.update();
        animalcule.draw();
    });
}

function setup()
{
    createCanvas(500, 500);

    for (let i = 0; i < 50; i++) {
        let animalcule = new Animalcule(createVector(random() * 400 + 50, random() * 400 + 50))
        animalcule.velocity = createVector(random() * 2 -1 , random * 2 - 1)
        animalcules.push(animalcule)
    }
}

function setup()
{
    createCanvas(500, 500);

    for (let i = 0; i < 50; i++) {
        let animalcule = new Animalcule(createVector(random() * 400 + 50, random() * 400 + 50))
        animalcule.velocity = createVector(random() * 2 -1 , random * 2 - 1)
        animalcules.push(animalcule)
    }
}