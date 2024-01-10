let Sketch = {

    intersect: function (ax, ay, bx, by, cx, cy, dx, dy)
    {
        let d = (ax - bx) * (cy - dy) - (ay - by) * (cx - dx)
        
        if (d == 0)
        {
            console.log('adfkjaklfdj')
            return
        }

        let x = ((ax * by - ay * bx) * ( cx - dx) - (ax - bx) * (cx * dy - cy * dx)) / d
        let y = ((ax * by - ay * bx) * ( cy - dy) - (ay - by) * (cx * dy - cy * dx)) / d

        if (
            (min(ax, bx) <= x <= max(ax, bx)) &&
            (min(cx, dx) <= x <= max(cx, dx)) &&
            (min(ay, by) <= y <= max(ay, by)) &&
            (min(cy, dy) <= y <= max(cy, dy)) 
        ){
            // console.log(x, y)
            // circle(x, y, 5)
            return {x : x, y: y}
        }

        return

        
    },

    line: function (x0, y0, x1, y1)
    {
       
        let dx = x1 - x0
        let dy = y1 - y0

        let d = Math.sqrt(dx * dx + dy * dy);
        let p = 1.1
        let steps = d / 5
        steps = 40

        strokeWeight(1.5)
        stroke(100, 255)
        noFill()

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

    quadri: function (ax, ay, bx, by, cx, cy, dx, dy)
    {
        let ps = [
            {x: ax, y: ay},
            {x: bx, y: by},
            {x: cx, y: cy},
            {x: dx, y: dy},
        ]

        let psc = []

        while(ps.length > 0)
        {
            let p = ps.shift();
            psc.push(p)

            for (let i = 0; i < ps.length; i ++)
            {
                ps[i].t = atan((ps[i].y - p.y)/ (ps[i].x - p.x))
            }

            ps.sort((a,b) => { return a.t > b.t ? 1 : -1})
        }

        for (let i = 0; i < psc.length; i++)
        {
            fill(40, 40 + i * 50)
            circle(psc[i].x, psc[i].y, 10)
            this.line(psc[i].x, psc[i].y, psc[(i + 1) % psc.length].x, psc[(i + 1) % psc.length].y)
        }
        
     

        // ps.sort((a, b) => { return b.y < a.y ? 1 : -1})

        // let p0 = ps.shift()
        
        // // // let p3 = ps.pop();
        
        // // ps.sort((a, b) => { return b.x > a.x ? 1 : -1})
        
        // // this.line(p0.x, p0.y, ps[0].x, ps[0].y)
        // // this.line(p0.x, p0.y, ps[2].x, ps[2].y)
        // // this.line(ps[1].x, ps[1].y, ps[0].x, ps[0].y)
        // // this.line(ps[1].x, ps[1].y, ps[2].x, ps[2].y)

        // //let p0 = {x: ax, y: ay}

        // for (let i = 0; i < 3; i++)
        // {
        //     ps[i].d = (p0.x - ps[i].x) * (p0.x - ps[i].x) + (p0.y - ps[i].y) * (p0.y - ps[i].y) 
        // }

        // ps.sort((a, b) => { return a.d > b.d ? 1 : -1})

        // fill(100, 100, 200)
        // circle(p0.x, p0.y, 10)

          
        // this.line(p0.x, p0.y, ps[0].x, ps[0].y)
        // this.line(p0.x, p0.y, ps[1].x, ps[1].y)
        // this.line(ps[2].x, ps[2].y, ps[0].x, ps[0].y)
        // this.line(ps[2].x, ps[2].y, ps[1].x, ps[1].y)
        // fill(255, 100, 100)
        // circle(ps[2].x, ps[2].y, 10)
        
    },

    hatch: function (x, y, w, h, r)
    {
        // let r = random() * PI 
        //r = HALF_PI * 0.5
        console.log(r)

        //r = 0.25 * PI + 0.01
        r = 0.4 * PI

        if (r > PI * 0.25 && r < PI * 0.75)
        {
            
            let g = 3 * abs(sin(r))
            let ro = cos(r) * h
    
            let ybb = y - (ro > 0 ? ro : 0)
            let yee = y + h + (ro > 0 ? 0 : -ro)
    
            for (let i = ybb; i < yee; i += g)
            {
                let yb = i
                let ye = i + ro
                let xb = x
                let xe = x + w

                let p = null
                let ps = []
    
                p = this.intersect(xb, yb, xe, ye, x, y, x + w, y)

                if (p)
                {
                    ps.push(p)
                }

                p = this.intersect(xb, yb, xe, ye, x, y, x, y + h)

                if (p)
                {
                    ps.push(p)
                }

                p = this.intersect(xb, yb, xe, ye, x + w, y, x + w, y + h)

                if (p)
                {
                    ps.push(p)
                }

                p = this.intersect(xb, yb, xe, ye, x, y + h, x + w, y + h)

                if (p)
                {
                    ps.push(p)
                }

                // Liang–Barsky
                ps.sort((a, b) => { return b.x > a.x ? 1 : -1})
                this.line(ps[1].x, ps[1].y, ps[2].x, ps[2].y)


                // if (yb < y)
                // {
                //    xb = x + (y - i) / tan(r)
                //    yb = y 
                // }
    
                // if (yb > y + h)
                // {
                //     xb = x + (y + h - i) / tan(r)
                //     yb = y + h
                // }
    
                // if (ye < y)
                // {
                //     xe = x + (y - i) / tan(r)
                //     ye = y
                // }
    
                // if (ye > y + h)
                // {
                //    xe = x + (y + h - i) / tan(r)
                //    ye = y + h
                    
                // }
                
                //this.line(xb, yb, xe, ye)
            }

        }
        else
        {
            return
            let g = 2 / abs(cos(r))
            let ro = tan(r) * h
    
            
    
            // if (ro > 0)
            // {
            //     return this.hatch(x, y, w, h)
            // }
    
            let xbb = x - (ro > 0 ? ro : 0)
            let xee = x + w + (ro > 0 ? 0 : -ro)
    
            for (let i = xbb; i < xee; i += g)
            {
                let xb = i
                let xe = i + ro
                let yb = y
                let ye = y + h
    
                if (xb < x)
                {
                    xb = x 
                    yb = y + (x - i) / tan(r)
                  
                }
    
                if (xb > x + w)
                {
                    xb = x + w
                    yb = y + (x + w - i) / tan(r)
                   
                }
    
                if (xe < x)
                {
                    xe = x
                    ye = y + (x - i) / tan(r)
                    
                }
    
                if (xe > x + w)
                {
                    xe = x + w
                    ye = y + (x + w - i) / tan(r)
                }

                this.line(xb, yb, xe, ye)
            }
        }
      
    }
}

function setup()
{
    createCanvas(500, 500)

    for (let i = 0; i < 1; i++)
    {
        // let x = random() * 10 + 50
        // let y = random() * 100 + 50

        // let w = random() * (300 - x) + 100
        // let h = random() * (300 - y) + 100

        // //Sketch.line(x, y, x + w, y + h)
        // Sketch.rect(x, y, w, h)
        // Sketch.hatch(x, y, w, h, random() * 0.5 * PI + 0.25 * PI)
        // // Sketch.hatch(x, y, w, h, - 5 * PI)

        let ax = random() * 400 + 50
        let ay = random() * 400 + 50
        let bx = random() * 400 + 50
        let by = random() * 400 + 50
        let cx = random() * 400 + 50
        let cy = random() * 400 + 50
        let dx = random() * 400 + 50
        let dy = random() * 400 + 50


        Sketch.quadri(ax, ay, bx, by, cx, cy, dx, dy)

        
        // Sketch.line ax, ay, bx, by)
        // Sketch.line(cx, cy, dx, dy)

        // let p = Sketch.intersect(ax, ay, bx, by, cx, cy, dx, dy)

        // if (p != undefined)
        // {
        //     stroke(0, 255)
        //     circle(p.x, p.y, 10)
        // }
    }
}