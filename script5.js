var worms = []



class Worm
{
    segments = []

    constructor(position, velocity, n = random() * 8 | 0 + 2)
    {
        this.position = position;
        this.velocity = velocity;
        this.energy = random() * 1000 + 500;

        let p = this.position.copy()
        this.segments[0] = p;
        this.rotations = []

        for (let i = 1; i < n; i++) {
            p = p.copy().add(createVector(randomGaussian(0, 5), randomGaussian(0, 5)))

            p.x = constrain(p.x, 0, 500);
            p.y = constrain(p.y, 0, 500);
            this.segments.push(p)
            this.rotations.push([i * 0.05, random() * 0.1]);
            
        }

        this.maxL = 5.5
        this.minL = 4.5
        this.l = 5
        this.phase = 0
        this.thickness = random() * 6 + 2
        this.color = [color(244, 179, 147)][random() * 0 | 0]
        
    }

    update()
    {

        // if (this.phase == 1)
        // {
            // this.velocity.rotate(noise(this.position.x / 40, this.position.y / 40) * random()* 0.05)
            

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

            for (let i = 0; i < worms.length; i++) {
                const w = worms[i];
                if (w == this)
                {
                    continue;
                }

                let d = w.position.copy().sub(this.position)
                if (d.mag() < 30)
                {
                    this.velocity.sub(d.mult( 1 / (d.mag() * d.mag())))
                }

                
            }

        this.position.add(this.velocity.copy().mult((this.energy / 1000)));

        // }

        this.velocity.x = constrain(this.velocity.x, -0.5, 0.5)
        this.velocity.y = constrain(this.velocity.y, -0.5, 0.5)

        this.segments[0] = this.position;

        
        // if (this.phase == 0)
        // {
        //     this.phase = this.l > this.minL ? 0 : 1
        //     this.l -= 0.1;
        // }
        // else
        // {
        //     this.phase = this.l < this.maxL ? 1 : 0
        //     this.l += 0.1;
        // }

        
      
        for (let i = 0; i < this.segments.length -1; i++) 
        {
            const a = this.segments[i];
            const b = this.segments[i + 1];


            let f = b.copy().sub(a)
            let h = f.mag();

            if (i > 1)
            {

                if (random() * 100 > 10)
                {
                    let r = this.rotations[i][1];
                    this.rotations[i][0] += r
                    // this.rotations[i][0] = constrain(this.rotations[i][0], -0.5, 0.5);

                    if (this.rotations[i][0] >= 0.5)
                    {
                        this.rotations[i][1] = -0.1;
                    }

                    if (this.rotations[i][0] <= -0.5)
                    {
                        this.rotations[i][1] = 0.1;
                    }

                    if (this.rotations[i][0] < 0.5 && this.rotations[i][0] > -0.5)
                    {
                        for (let j = i + 1; j < this.segments.length; j++)
                        {
                            const c = this.segments[j];
                            c.add(f.copy().rotate(r).mult(0.05))                
                        }
                    }
                
                    
                }
            }

            

            //}

            if (h > this.l)
            {
                b.sub(f.setMag(h - this.l))
            }
            else
            {
              // b.add(f.setMag(this.l - h))
            }
            
        }

        this.energy -= 0.01;

        if (this.energy < 0)
        {
            this.energy = 0
        }
        
    }

    draw()
    {
        // beginShape(LINES)
        for (let i = 0; i < this.segments.length - 1; i++) {
            const a = this.segments[i];
            const b = this.segments[i + 1];

            // if (i == 0)
            // {
            //     circle(a.x, a.y, 10)
            // }
          

            // for (let j = 0; j < 20; j++) {
            noFill()

            this.color.setAlpha(this.energy / 1500 * 255)
            
            stroke(40, 40, 40, 40)
            strokeWeight(this.thickness + 3)
            line(a.x, a.y, b.x, b.y)

            let c = color(180, 120, 120, this.energy / 1500 * 255)

            strokeWeight(max(1, this.thickness - 4 + i % 3))
            stroke(c)
            line(a.x, a.y, b.x, b.y)

            stroke(100, 100, 100, 255 )
            strokeWeight(2.1)
            line(a.x, a.y, b.x, b.y)

        }
    }
}



function draw()
{
    clear()
    worms.forEach(worm => {
        worm.update();
        worm.draw();
    });
}

function setup()
{
    createCanvas(500, 500);

    for (let i = 0; i < 50; i++) {
        let worm = new Worm(createVector(random() * 400 + 50, random() * 400 + 50))
        worm.velocity = createVector(random() * 2 -1 , random * 2 - 1)
        worms.push(worm)
    }
}