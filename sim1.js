const MOVE = 0
const IDLE = 1
const PURSUE = 2
const FLEE = 3

let animals = []

class StateMachine
{

    state = IDLE
    states = {}

    addState(state, callback)
    {
        this.states[state] = callback
    }

    getState()
    {
        return this.state
    }

    setState(state)
    {
        if (typeof this.states[state] == 'function' && !this.states[state]())
        {
            return false
        }

        this.state = state
    }
}

class Animal
{
    stateMachine;
    v = { x: 0, y: 0}
    p = { x: 0, y : 0 }
    g = null

    energy = 10;

    borderThreshold = 10;
    width = 500;
    height = 500;

    maxV = 4

    constructor(states = { MOVE: null })
    {
        animals.push(this);
        this.stateMachine = new StateMachine();
        for (let state in states)
        {
            this.stateMachine.addState(state);
        }
    }

    update()
    {
        switch(this.stateMachine.getState())
        {
            case PURSUE:
            case MOVE:
            case FLEE:
                this.updatePosition()
                break

            case IDLE:
              //  this.setGoal(random() * 400 + 50, random() * 400 + 50)
                break

        }

      
        
    }

    draw()
    {
        stroke(0)
        noFill();
        circle(this.p.x, this.p.y, 5)

        stroke(0)
        fill(0);
        if (this.g != null)
        {
            circle(this.g.x, this.g.y, 4)
        }
    }

    setPosition(x, y)
    {
        this.p = {x: x, y: y}
    }

    setGoal(g)
    {
        this.g = g
        if (this.stateMachine.getState() == IDLE)
        {
            this.stateMachine.setState(MOVE)
        }
    }
    
    goalReached()
    {
        this.g = null;
        this.v = {x: 0, y: 0};
        this.stateMachine.setState(IDLE)
    }

    updatePosition()
    {

        if (this.g == null)
        {
            return
        }

        if (this.g != null)
        {
            this.v.x = this.g.x - this.p.x
            this.v.y = this.g.y - this.p.y
        }

        let m = Math.sqrt(this.v.x * this.v.x + this.v.y * this.v.y);
        let p = 1

        if (m < 0.01)
        {
            this.goalReached();
            return;
        }

        let mx = this.energy > 5 ? this.maxV : 0.5

        if (m > mx)
        {
            p = mx / m
        }

       

        this.v.x *= p
        this.v.y *= p

        this.p.x += (this.v && this.v.x) ?? 0
        this.p.y += (this.v && this.v.y) ?? 0

        if (this.p.x < this.borderThreshold) 
        {
            this.p.x = this.borderThreshold;
        }

        if (this.p.x > this.width - this.borderThreshold) 
        {
            this.p.x = this.width - this.borderThreshold;
        }

        if (this.p.y< this.borderThreshold) 
        {
            this.p.y = this.borderThreshold;
        }

        if (this.p.y > this.height - this.borderThreshold) 
        {
            this.p.y = this.height - this.borderThreshold;
        }
    }

}

class Predator extends Animal
{
	preyTreshold = 2500
    target = null
    energy = 10;
    maxV = 3
   
	constructor()
	{
		super();
	}

	update()
	{
		super.update();

		switch(this.stateMachine.state)
		{
			case IDLE:
                if (this.energy >= 10)
                {
				    this.findPrey();
                }
                else 
                {
                    this.energy += 0.1 
                    this.setGoal({ x: random() * 400 + 50, y: random() * 400 + 50 })
                }
				break
            case PURSUE:
                this.pursue();
		}
	}

	findPrey()
	{
		let closest = null
		let distance = -1
		for (let i = 0; i < animals.length; i++)
		{
			let animal = animals[i]
			if (animal.constructor.name == "Prey")
			{
				let dx = this.p.x - animal.p.x
				let dy = this.p.y - animal.p.y
                let d = dx * dx + dy * dy


				if (d > this.preyTreshold)
				{
					continue
					
				}

				if (distance == -1 || d < distance)
				{
					closest = animal
                    distance = d 
				}


				
			}
		}

		if (closest != null)
		{
			
            this.setTarget(closest)
		}
	}

    setTarget(animal)
    {
        this.target = animal;
        this.stateMachine.setState(PURSUE)

    }

    pursue()
    {
        this.energy -= 1;
        
        if (this.energy <= 0)
        {
            this.target = null
            this.stateMachine.setState(IDLE)
            return;
        }

        let dx = this.p.x - this.target.p.x
        let dy = this.p.y - this.target.p.y
        let d = dx * dx + dy * dy

        if (d > this.preyTreshold)
        {
            this.target = null
            this.stateMachine.setState(IDLE)
            return;
        }

        this.setGoal(this.target.p)
    }
}

class Prey extends Animal
{
    preyTreshold = 4000
    target = null
    maxV = 1


	constructor()
	{
		super();
	}  

	update()
	{
		super.update();

        switch (this.stateMachine.getState())
        {
            case FLEE: 
                this.flee();
                break

            case IDLE:
                this.findPredators()
                break;
        }
        
	}

    findPredators()
    {
        let closest = null
		let distance = -1
		for (let i = 0; i < animals.length; i++)
		{
			let animal = animals[i]
			if (animal.constructor.name == "Predator")
			{
				let dx = this.p.x - animal.p.x
				let dy = this.p.y - animal.p.y
                let d = dx * dx + dy * dy

				if (d > this.preyTreshold)
				{
					continue
					
				}

				if (distance == -1 || d < distance)
				{
					closest = animal
                    distance = d 
				}
			}
		}

        if (closest != null)
        {
            this.fleePredator(closest)
        }
    }

    fleePredator(predator)
    {
        this.stateMachine.setState(FLEE)
        this.target = predator
    }

    flee()
    {
        let dx = this.p.x - this.target.p.x
        let dy = this.p.y - this.target.p.y
        let d = dx * dx + dy * dy

        if (d > this.preyTreshold)
        {
            this.target = null
            this.stateMachine.setState(IDLE)
            return;
        }

        this.setGoal({ x: this.p.x + dx, y : this.p.y + dy })
    }

	draw()
	{
		stroke(200, 0, 0)
		fill(200, 4, 4, 120)
		rect(this.p.x - 2, this.p.y - 2, 4, 4)
	}
}