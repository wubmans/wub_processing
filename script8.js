function setup()
{
    let scale = 40
    createCanvas(500, 500)
    stroke(0);
    fill(0)
    for (let k = 0; k < 100; k++)
    {
        let x = random() * 500
        let y = random() * 500
        for (let s = 0; s < 1000; s++)
        {
            let m = noise(x / scale, y / scale) * TWO_PI
            let xn = x + cos(m) * 5
            let yn = y + sin(m) * 5
            line(x, y, xn, yn);
            //noFill()
            //stroke(0, 10)
            circle(x, y, 0.5)
            //rect(x, y, xn, yn)
            x = xn;
            y = yn;
        }
    }
}