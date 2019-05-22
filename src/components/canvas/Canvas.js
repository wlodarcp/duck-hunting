import React from "react";
import windowsBackground from "../../images/location/windows.jpg"
import duck1 from "../../images/ducks/duck1.png"
import archer1 from "../../images/archer/archer.png"
import {GAME_STATE} from "../tooltip/GameTooltip";

class Canvas extends React.Component {

    canvasHeight = 800;
    canvasWidth = 800;
    archerX = this.canvasWidth / 2;
    archerY = this.canvasHeight - 100;

    cref = React.createRef();
    state = {
        speed: 100,
        moveCounter: 0,
        newDuckRate: 10,
        background: windowsBackground,
        ducks: [],
        archerRotation: Math.PI / 180.,
        shouldBeScaled: false,
        arrows: [],
        isMousePressed: false
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
                    width={this.canvasWidth}
                    height={this.canvasHeight}
                    onMouseDown={() => this.handleMouseDown()}
                    onMouseMove={(e) => this.handleMouseMove(e)}
                    onMouseUp={(e) => this.handleMouseUp(e)}
                />
            </div>
        );
    }

    startGame = () => {
        this.timerID = setTimeout(() => {
            if (this.props.gameState === GAME_STATE.RUNNING) {
                let newState = [];
                let newArrows = [];
                this.state.ducks.forEach(duck => {
                    this.moveDuck(duck);
                    if (this.isDuckOnScreen(duck)) {
                        newState.push(duck);
                    }
                });
                this.generateDuckIfItIsTime(newState);
                this.moveArrows(newArrows);
                this.updateStateAfterMove(newState, newArrows);
            }
            window.requestAnimationFrame(this.startGame);
        }, this.state.speed);
    };

    updateStateAfterMove(newDucks, newArrows) {
        this.setState(prevState => ({
            ...prevState,
            moveCounter: prevState.moveCounter + 1,
            ducks: newDucks,
            arrows: newArrows
        }));
    }

    moveArrows(newArrows) {
        this.state.arrows.forEach(arrow => {
            let updatedArrow = arrow;
            updatedArrow.xPos = updatedArrow.xPos + 20;
            updatedArrow.yPos = updatedArrow.yPos - 20;
            newArrows.push(updatedArrow);
        })
    }

    handleMouseDown() {
        this.setState(prevState => ({
            ...prevState,
            isMousePressed: true
        }));
    }

    handleMouseMove(e) {
        if (this.state.isMousePressed) {
            const newArcherRotation = this.calculateArcherRotation(e);
            const shouldBeScaled = this.checkIfShouldBeScaled(e);
            this.setState(prevState => ({
                ...prevState,
                archerRotation: newArcherRotation,
                shouldBeScaled: shouldBeScaled
            }));
        }
    }

    handleMouseUp(e) {
        let newArrows = [];
        console.log("MOUSE UPPP");
        newArrows.push(this.generateArrow(e));
        this.setState(prevState => ({
            ...prevState,
            isMousePressed: false,
            arrows: newArrows
        }));
    }

    generateArrow(e) {
        return {xDir: e.clientX - 200, yDir: e.clientY, xPos: this.archerX, yPos: this.archerY}
    }

    calculateArcherRotation(e) {
        if (true) {
            return Math.atan((this.canvasHeight - e.clientY) / (this.canvasWidth / 2 - e.clientX));
        } else {
            return Math.atan((this.canvasHeight - e.clientY) / (e.clientX - this.canvasWidth / 2));
        }
    }


    checkIfShouldBeScaled(e) {
        return e.clientX - this.canvasWidth / 2 < this.canvasWidth / 2
    }

    isDuckOnScreen(duck) {
        return duck.x <= this.canvasWidth && duck.x >= 0;
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
        console.log(this.state.arrows);
        this.state.arrows.forEach(arrow => this.drawArrow(ctx, arrow))
    }

    drawArrow(ctx, arrow) {
        console.log(arrow);
        ctx.beginPath();
        ctx.arc(arrow.xPos, arrow.yPos, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

    drawArcher(ctx) {
        var archer = new Image();
        archer.src = archer1;
        const x = this.archerX;
        const y = this.archerY;
        const rotation = this.state.archerRotation;
        const shouldBeScaled = this.state.shouldBeScaled;
        archer.onload = function () {
            ctx.save();
            ctx.translate(x, y);
            if (shouldBeScaled) {
                ctx.scale(-1, 1);
            }
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