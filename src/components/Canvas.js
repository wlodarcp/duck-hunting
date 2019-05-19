import React from "react";
import windowsBackground from "../images/location/windows.jpg"
import duck1 from "../images/ducks/duck1.png"

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.cref = React.createRef();
        this.state = {
            moveCounter: 0,
            newDuckRate: 10,
            background: windowsBackground,
            ducks: []
        };
    }

    componentDidMount() {
        let duck = this.generateDuck();
        console.log("duck: ");
        console.log(duck);
        this.setState({
            moveCounter: 0,
            newDuckRate: 10,
            background: windowsBackground,
            ducks: [duck]
        });
        this.startMovingDuck();
    }

    componentDidUpdate() {
        console.log(this.state);
        this.repaint();
    }

    render() {
        return (
            <canvas
                style={{border: "1px solid gray"}}
                ref={this.cref}
                width={800}
                height={800}
            />
        );
    }

    startMovingDuck = () => {
        this.timerID = setTimeout(() => {
            let currentDucks = this.state.ducks;
            var newState = [];
            currentDucks.forEach(duck => {
                duck.x += 20 * duck.direction;
                if (duck.x > this.cref.current.width || duck.x < 0) {
                    console.log("inside clear");
                } else {
                    newState.push(duck);
                    console.log("inside clear" + duck.x + " " + this.cref.current.width);
                }
            });
            if (this.state.moveCounter % this.state.newDuckRate === 0) {
                console.log("Duck generated");
                newState.push(this.generateDuck())
            }
            this.setState(prevState => ({
                moveCounter: prevState.moveCounter + 1,
                newDuckRate: prevState.newDuckRate,
                background: windowsBackground,
                ducks: newState
            }));
            window.requestAnimationFrame(this.startMovingDuck);
        }, 100);
    };

    repaint() {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        this.setBackground(ctx, this.state.background);
        this.state.ducks.forEach(duck => this.drawDuck(duck));
    }

    setBackground(ctx, image) {
        var background = new Image();
        background.src = image;
        background.onload = function () {
            ctx.drawImage(background, 0, 0);
        }
    }

    drawDuck(duck) {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        const imageToDraw = new Image();
        imageToDraw.src = duck.image;
        imageToDraw.onload = () => {
            ctx.drawImage(imageToDraw,
                duck.x,
                duck.y,
                duck.size,
                duck.size);
        };
    }

    generateDuck() {
        const duckPos = this.getRandomDuckPosition();
        return {image: duck1, x: duckPos.x, y: duckPos.y, size: duckPos.size, direction: duckPos.direction}
    }

    getRandomDuckPosition() {
        const direction = this.getRandomDirection();
        let duckSize = this.cref.current.height * 0.05;
        let x = (direction === DIRECTION.RIGHT) ? 0 : this.cref.current.width;
        let y = this.getRndInteger(0, this.cref.current.height * 0.7);
        return {x: x, y: y, size: duckSize, direction: direction};
    }

    getRandomDirection() {
        return Math.floor((Math.random() * 10) / 2) % 2
            ? DIRECTION.RIGHT
            : DIRECTION.LEFT;
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

const DIRECTION = {
    RIGHT: 1,
    LEFT: -1
};


export default Canvas;