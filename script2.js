let particles = []
let attractors = []


function draw()
{
    
    blendMode(SUBTRACT)
    fill(255, 64)
    rect(0, 0, 700, 700)
    blendMode(BLEND);  

    stroke(.05)
    fill(234, 100, 49)
    attractors.forEach((attractor) => {
        circle(attractor.x, attractor.y, 10)
    })
    
    particles.forEach((particle) => {
        angle = noise(particle.p.x / 400, particle.p.y / 400) 
        particle.ox = particle.p.x
        particle.oy = particle.p.y

        // // particle.v.x += 4 / Math.pow(attractor.x - particle.x + 0.1, 2)
        // // particle.v.y += 4 / Math.pow(attractor.y - particle.y + 0.1, 2)

        attractors.forEach((attractor) => {

            dist = particle.p.copy().sub(createVector(attractor.x, attractor.y))

            particle.v.add(dist.mult(- 4 / (dist.magSq() + 0.1)))

        })

        particle.v.rotate(angle * (random() - 0.5))
       
        if (particle.v.mag() > 5)
        {
            particle.v.mult(0.9)
        }

        particle.p.add(particle.v)

       
        line(particle.ox, particle.oy, particle.p.x, particle.p.y)

        fill(128)
        circle(particle.p.x, particle.p.y, 4 / min(max(particle.v.mag(), 0.5), 60))
    })

    
}

function setup()
{
    createCanvas(700, 700);

    for (let i = 0; i < 100; i++) {
        
        particles.push({
            ox: null,
            oy: null,
            v: createVector(random(), random()),
            p: createVector(random() * 700, random() * 700)
        })
    
    }

     attractors = [
        { x: random() * 500 + 100, y: random() * 500 + 100 },
        { x: random() * 500 + 100, y: random() * 500 + 100 }
    ]
}