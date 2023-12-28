class System
{
    springs = []
    points = []
    iterations = 15

    constructor()
    {

    }

    constrain(p0, p1, s)
    {
        if (this.points.indexOf(p0) == -1)
        {
            this.points.push(p0)
        }

        if (this.points.indexOf(p1) == -1)
        {
            this.points.push(p1)
        }

        this.springs.push(new Spring(p0, p1, s))
    }

    update()
    {
        for (let i = 0; i < this.points.length; i++)
        {
            for (let j = i + 1; j < this.points.length; j++)
            {
                let p0 = this.points[i]
                let p1 = this.points[j]

                let dx = p0.x - p1.x 
                let dy = p0.y - p1.y

                let d = Math.sqrt(dx * dx + dy * dy) 

                if (d > 5)
                {
                    continue
                }
                
                let m = {x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 }

                let q = 1

                p0.x -= q * (m.x - p0.x)
                p0.y -= q * (m.y - p0.y)

                p1.x -= q * (m.x - p1.x)
                p1.y -= q * (m.y - p1.y)
            }
        }

        for (let i = 0; i < this.iterations; i++) 
        {
            for (let mm = 0; mm < this.springs.length; mm++) 
            {
                this.springs[mm].update()
            }
        

            
        }
    }

    draw()
    {
        // debug

        // for (let i = 0; i < this.points.length; i++) {
        //     const p = this.points[i];
        //     fill(0)
        //     circle(p.x, p.y, 5)
        // }

        // for (let i = 0; i < this.springs.length; i++) {
        //     const s = this.springs[i];
        //     line(s.p0.x, s.p0.y, s.p1.x, s.p1.y)
        // }

       

    }


}

class Spring

{
    p0 = {}
    p1 = {}
    l;
    s;

    constructor(p0, p1, s = 0.05)
    {
       this.p0 = p0;
       this.p1 = p1;
       this.l = this.dist();
       this.s = s;
    }

    dist()
    
    {   
        let dx = this.p0.x - this.p1.x 
        let dy = this.p0.y - this.p1.y
        
        return Math.sqrt(dx * dx + dy * dy)
    }

    update()
    {
        let d = this.dist();
        let m = {x: (this.p0.x + this.p1.x) / 2, y: (this.p0.y + this.p1.y) / 2 }

        let q = (d - this.l) / this.l * this.s;

        this.p0.x += q * (m.x - this.p0.x)
        this.p0.y += q * (m.y - this.p0.y)

        this.p1.x += q * (m.x - this.p1.x)
        this.p1.y += q * (m.y - this.p1.y)

    }
}