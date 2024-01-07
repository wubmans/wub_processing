

function setup() 
{
	createCanvas(500, 500);
	let animal = new Predator();

	//animal.setGoal(random() * 200, random() * 200)
	animal.setPosition(random() * 400 + 50, random() * 400 + 50)

	for (let i = 0; i < 40; i++) 
	{
		let prey = new Prey();
		prey.setPosition(random() * 400 + 50, random() * 400 + 50)
	}

}

function draw() 
{
	background(220);

	for (let i = 0; i < animals.length; i++) 
	{
		const animal = animals[i];
		animal.update();
		animal.draw();
	}
}
