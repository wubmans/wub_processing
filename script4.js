var psystem;

var colors;

function draw()
{
    // clear();
    psystem.update();
    psystem.draw('circle', colors[random() * colors.length | 0])
}

function setup()
{
    createCanvas(500, 500);

    colors = colorsFromUrl('https://coolors.co/648113-646e78-8d98a7-dcccbb-eab464')

    psystem = new Psystem();
    psystem.createParticles(100);
}