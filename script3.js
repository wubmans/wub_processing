class Blob
{
    constructor(x, y, r, color)
    {
        this.p = createVector(x, y);
        this.v = createVector(random() - 0.5, random() - 0.5)
        this.r = r;
        this.color = color

        this.n = (random() * 7 | 0) + 5;
    }

    draw()
    {
        let points = []

        for (let a = 0; a < TWO_PI; a += TWO_PI / this.n) 
        {
            points.push(createVector(this.p.x + sin(a) * this.r, this.p.y + cos(a) * this.r, randomGaussian(0.8, 0.3)))         
        }
        
        blendMode(MULTIPLY);

        let basePoints = []

        for (let i = 0; i < 3; i++) {
            points = iteratePoints(points)            
        }

        basePoints = [...points];

        for (let i = 0; i < 50 ; i++)
        {

            let bp = [...basePoints];

            for (let j = 0; j < 4; j++) {
                bp = iteratePoints(bp);                
            }
           
            fill(this.color[0], this.color[1], this.color[2], 10)
            noStroke()
            beginShape()
            bp.forEach(point => 
                {
                vertex(point.x, point.y);
            });
    
            endShape()
        }

        // 
       
    
    }
}

// var x;
// var y

// function polygon(x, y, r, n)
// {
//     let points = []

//     for (let a = 0; a < TWO_PI; a += TWO_PI /n) {
//         points.push(createVector(x + sin(a) * r, y + cos(a) * r))
        
//     }

//     return points
// }

function iteratePoints(points, debug)
{
    let newPoints = []

    for (let i = 0; i < points.length; i++) {
        // const point = points[i];

        let a;
        let b;

        if (i == points.length - 1)
        {
            a = points[0];
            b = points[i];
        }
        else
        {
            a = points[i + 1];
            b = points[i];
        }

        let d = a.copy().sub(b).mult(constrain(randomGaussian(0.5, 0.3), 0.2, 0.8));
        // let t = randomGaussian(0.5, 0.2);
        
        
       
        // // f.mult(min(t, 1 - t))
        // f.mult(randomGaussian(0.8, 0.3));

        // let da = d.mult(0.5); 
        let f = d.copy().mult(constrain(b.z, 0.0, 0.8)).rotate(HALF_PI + randomGaussian());
        let q = b.copy().add(d).add(f);
        // q.add(f)

        // let p = points[i].copy().add(da).add(f)

        newPoints.push(b)
        newPoints.push(q)
    }

    // newPoints.push(points[points.length - 1])

    return newPoints
}

// var pookie = false

function draw()
{
    // if (pookie)
    // // {
    // //    // return;
    // // }

    // clear();

    // blobs.forEach(blob => {
    //    // blob.p.add(blob.v.copy().mult(5))
    //     blob.draw();
    // })

    // console.log('sadfasdf')

    // pookie = true
}

var blobs = [];

function setup()
{
    createCanvas(500, 500);

    let colors = [
        [218, 215, 205],
        [163, 177, 138],
        [88, 129, 87],
        [58, 90, 64],
        [52, 78, 65],
    ]
  
   
    for (let i = 0; i < 8; i++) {
        blobs.push(new Blob(
            random() * 300 + 100,
            random() * 300 + 100, 
            // random() * 10 + 25, 
            random() * 50 + 25,
            colors[ i % colors.length])
        )
    }

    // blobs[0].draw();

    blobs.forEach(blob => {
       // blob.p.add(blob.v.copy().mult(5))
        blob.draw();
    })
    
}
