import React from "react";
import windowsBackground from "../../images/location/windows.jpg"
import duck1 from "../../images/ducks/duck1.png"
import archer1 from "../../images/archer/archer.png"
import {GAME_STATE} from "../tooltip/GameTooltip";

class Canvas extends React.Component {

    cref = React.createRef();
    state = {
        speed: 50,
        moveCounter: 0,
        newDuckRate: 10,
        background: windowsBackground,
        ducks: [],
        archerRotation: Math.PI / 180.
    };


    componentDidMount() {
        this.startGame();
    }

    componentDidUpdate() {
        this.repaint();
    }

    render() {
        return (
            <div>
                <canvas
                    style={{border: "1px solid gray"}}
                    ref={this.cref}
                    width={800}
                    height={800}
                    onMouseDown={(e) => this.handleMouseDown(e)}
                />
            </div>
        );
    }

    startGame = () => {
        this.timerID = setTimeout(() => {
            if (this.props.gameState === GAME_STATE.RUNNING) {
                let newState = [];
                this.state.ducks.forEach(duck => {
                    this.moveDuck(duck);
                    if (this.isDuckOnScreen(duck)) {
                        newState.push(duck);
                    }
                });
                this.generateDuckIfItIsTime(newState);
                this.updateStateAfterMove(newState);
            }
            window.requestAnimationFrame(this.startGame);
        }, this.state.speed);
    };

    updateStateAfterMove(newDucks) {
        this.setState(prevState => ({
            speed: prevState.speed,
            moveCounter: prevState.moveCounter + 1,
            newDuckRate: prevState.newDuckRate,
            background: windowsBackground,
            ducks: newDucks,
            archerRotation: prevState.archerRotation
        }));
    }

    handleMouseDown(e) {
        let can = this.cref.current;
        console.log("x: " + can.width / 2 - e.clientX + " y: " + can.height - e.clientY);
        const newArcherRotation =
            Math.atan((can.height - e.clientY) / (can.width / 2 - e.clientX));
        console.log(newArcherRotation);
        this.setState(prevState => ({
            speed: prevState.speed,
            moveCounter: prevState.moveCounter,
            newDuckRate: prevState.newDuckRate,
            background: windowsBackground,
            ducks: prevState.ducks,
            archerRotation: newArcherRotation
        }));
    }

    isDuckOnScreen(duck) {
        return duck.x <= this.cref.current.width && duck.x >= 0;
    }

    moveDuck(duck) {
        duck.x += 10 * duck.direction;
    }

    generateDuckIfItIsTime(newState) {
        if (this.state.moveCounter % this.state.newDuckRate === 0) {
            newState.push(this.generateDuck())
        }
    }

    repaint() {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        this.setBackground(ctx, this.state.background);
        this.drawArcher(ctx);
        this.state.ducks.forEach(duck => this.drawDuck(duck));
    }

    drawArcher(ctx) {
        var archer = new Image();
        archer.src = archer1;
        const x = this.cref.current.width / 2;
        const y = this.cref.current.height - 100;
        const x1 = this.cref.current.width / 2;
        const y2 = this.cref.current.height / 2;
        const rotation = this.state.archerRotation;
        archer.onload = function () {
            ctx.save();
            console.log(rotation);
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.drawImage(archer, -100, -100, 200, 200);
            ctx.restore();
        }
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