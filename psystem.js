class Psystem
{

    particles = []

    constructor()
    {

    }

    createParticles(number)
    {
        for (let i = 0; i < number; i++) {
            this.add(new Particle(
                createVector(randomGaussian(250, 100), randomGaussian(250, 100)),
                createVector(randomGaussian(0, 4), randomGaussian(0, 4))
            ))
        }
    }

    update()
    {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            particle.position.add(particle.velocity);
        }
    }

    add(particle)
    {
        this.particles.push(particle)
    }

    draw(callback, _stroke, _fill)
    {
        for (let i = 0; i < this.particles.length; i++) 
        {
            const particle = this.particles[i];


            if (typeof callback == "function")
            {   
                callback(particle)
            }   

            if (typeof callback == "string")
            {
                if (callback == 'circle')
                {
                    stroke(_stroke || 0);
                    fill(_fill || 255);
                    circle(particle.position.x, particle.position.y, 15);
                }
            }
        }
    }
}


class Particle
{
    constructor(position, velocity)
    {
        this.position = position;
        this.velocity = velocity;
    }
}