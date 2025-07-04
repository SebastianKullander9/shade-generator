type ColorData = {
    model: string;
    color: [number, number, number];
    valpha: number;
}

export default function generateShades() {
    const colorString = localStorage.getItem("color");
    let colorObject: ColorData = {model: "", color: [0, 0 ,0], valpha: 0};

    if (colorString) {
        colorObject = JSON.parse(colorString);

        //console.log(colorObject["color"]);
    }

    const numberOfShades = 10;
    const start = 10;
    const end = 90;
    const range = end - start;
    const increment = range / numberOfShades;
    const shades = [];

    for (let i = 1; i < numberOfShades + 1; i++) {
        const tempArray = [...colorObject["color"]];

        tempArray.splice(2, 1, increment * i);

        shades.push(tempArray);
        console.log(shades)

    }

    return shades;
}