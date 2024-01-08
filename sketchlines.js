let Sketch = {
    line: function (x0, y0, x1, y1)
    {
       
        let dx = x1 - x0
        let dy = y1 - y0

        let d = Math.sqrt(dx * dx + dy * dy);
        let p = 1.5
        let steps = d / 5
        steps = 40

        strokeWeight(1.0)
        stroke(0, 50)



        let x = x0
        let y = y0

        beginShape();

       
        vertex(x, y)

        for (let i = 0; i < steps; i++)
        {   
            x += dx / steps + randomGaussian(0, p * d / 1000)
            y += dy / steps + randomGaussian(0, p * d / 1000)
            vertex(x, y)
        }

        endShape()

    },

    rect: function (x, y, w, h)
    {
        this.line(x, y, x + w, y)
        this.line(x + w, y, x + w, y + h)
        this.line(x + w, y + h, x, y + h)
        this.line(x, y + h, x, y)
    },

    hatch: function (x, y, w, h)
    {
        let r = random() * PI - HALF_PI
        //r = HALF_PI * 0.5
        console.log(r)
        let g = 6
        for (let i = x - tan(r) * h; i < x + w; i += g)
        {
            let ib = i
            let ie = i + tan(r) * h
            let yb = y
            let ye = y + h

            if (ib < x)
            {
               yb = y + (x - ib) / tan(r)
               ib = x 
            }

            if (ie > x + w)
            {
               ye = y + ((x + w) - i) / tan(r)
               ie = x + w
                
            }
            this.line(ib, yb, ie, ye)
        }
    }
}

function setup()
{
    createCanvas(500, 500)

    for (let i = 0; i < 1; i++)
    {
        let x = random() * 10 + 50
        let y = random() * 100 + 50

        let w = random() * (450 - x) 
        let h = random() * (450 - y)

        //Sketch.line(x, y, x + w, y + h)
        Sketch.rect(x, y, w, h)
        Sketch.hatch(x, y, w, h)
    }
}