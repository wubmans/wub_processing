colors = 
[
"#7bebff",
"#54e5ff",
"#2cdfff",
"#0cd4f7",
"#06b6d4",
"#0c9eb8",
"#10889d",
"#127283",
"#135d6a",
"#124a53"
]

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

const numberOfCircles = 300
circles = []
points = []

function draw()
{
    clear()
    
    circles.forEach(element => {
        noStroke()
        
        fill(componentToHex(colors[ (element.p) % colors.length | 0]))

        if (random() * 10000 < 3)
        {
            element.q = random() * 4 | 0
        }

        element.r += 0.01 * element.c
        arc(element.x, element.y, 60, 60, 0 + element.r, HALF_PI + element.r)

        switch(element.q)
        {
            case 0:
               
                break;
            // case 1:
            //     arc(element.x + 30, element.y, 60, 60, HALF_PI, PI)
            //     break
            // case 2:
            //     arc(element.x + 30, element.y + 30, 60, 60, HALF_PI * 2, HALF_PI * 3)
            //     break
            // case 3:
            //     arc(element.x, element.y + 30, 60, 60, HALF_PI * 3, HALF_PI * 4)
            //     break
        }
       
    });

    fill(255)
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 8; j++) {
            // circle(30 + i * 60, 30 + j * 60, 30)
            circle(60 + i * 60, 60 + j * 60, 30)
        }
        
        
    }
}


function setup()
{
    createCanvas(900, 600);
    rectMode(CENTER);
    background(255);
    stroke(0);
    
    for (let i = 1; i < 15; i++) {
        for (let j = 1; j < 9; j++) {
            circles.push({
                x: i * 60,
                y: j * 60,
                r: random() * 4 | 0,
                c: random(),
                p: random() * 8 | 0
            })

            circles.push({
                x: i * 60,
                y: j * 60,
                r: random() * 4 | 0,
                c: random(),
                p: random() * 8 | 0
            })
        }
        
    }

    for (let i = 0; i < 30; i++) {
        points.push({
            x: random(600),
            y: random(600),
            vx: random() - 0.5,
            vy: random() - 0.5
        })
        
    }
}