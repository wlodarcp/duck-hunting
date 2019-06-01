import React from "react";
import windowsBackground from "../../images/location/windows.jpg"
import explosion from "../../images/explosion/explosion.png"
import {GAME_STATE} from "../tooltip/GameTooltip";
import welcomeScreen from "../../images/welcomescreen/welcomescreen.png"

class GameWindow extends React.Component {

    constructor(props) {
        super(props);
        this.canvasHeight = 800;
        this.canvasWidth = 1200;
        this.archerX = this.canvasWidth / 2;
        this.archerY = this.canvasHeight - 100;
        this.cref = React.createRef();
        this.state = {
            speed: 100,
            moveCounter: 0,
            newDuckRate: 30,
            background: windowsBackground,
            ducks: [],
            archerRotation: Math.PI / 180.,
            shouldBeScaled: false,
            arrows: [],
            isMousePressed: false,
            timeCounter: 0
        };
    }

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

    repaint() {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        console.log(this.props);
        this.setBackground(ctx, this.props.selectedLocation.url);
        this.drawArcher(ctx);
        this.state.ducks.forEach(duck => this.drawDuck(duck));
        this.state.arrows.forEach(arrow => this.drawArrow(ctx, arrow))
    }

    startGame = () => {
        setTimeout(() => {
            if (this.props.gameState === GAME_STATE.NOT_STARTED) {
                this.drawWelcomeScreen();
            }
            if (this.props.gameState === GAME_STATE.LOST) {
                this.drawLoseScreen();
            }
            if (this.props.gameState === GAME_STATE.PAUSED) {
                this.drawPausedScreen();
            }
            if (this.props.gameState === GAME_STATE.RUNNING) {
                let updatedDucks = [];
                let updatedArrows = [];
                this.state.ducks.forEach(duck => {
                    this.moveDuck(duck);
                    this.checkIfDuckShouldBeOnScreen(duck, updatedDucks);
                });
                this.generateDuckIfItIsTime(updatedDucks);
                this.moveArrows(updatedArrows);
                this.checkIfAnyDuckHit(updatedArrows, updatedDucks);
                this.updateStateAfterMove(updatedDucks, updatedArrows);
                this.updateTimeIfOneSecondLeft();
                this.checkIfNotLost();
            }
            window.requestAnimationFrame(this.startGame);
        }, this.state.speed);
    };

    updateStateAfterMove(newDucks, newArrows) {
        this.setState(prevState => ({
            ...prevState,
            moveCounter: prevState.moveCounter + 1,
            ducks: newDucks,
            arrows: newArrows,
            timeCounter: prevState.timeCounter + 1
        }));
    }

    moveArrows(newArrows) {
        this.state.arrows.forEach(arrow => {
            let updatedArrow = arrow;
            if (updatedArrow.xDir >= this.canvasWidth / 2) {
                updatedArrow.xPos = this.canvasWidth / 2 + arrow.v0 * Math.cos(arrow.angle) * arrow.time;
                updatedArrow.yPos = this.canvasHeight - 200 + (arrow.v0 * Math.sin(arrow.angle) + 10 * arrow.time) * arrow.time;

            } else {
                updatedArrow.xPos = this.canvasWidth / 2 - arrow.v0 * Math.cos(arrow.angle) * arrow.time;
                updatedArrow.yPos = this.canvasHeight - 200 + (arrow.v0 * Math.sin(arrow.angle) + 10 * arrow.time) * arrow.time;
            }
            updatedArrow.time = updatedArrow.time + 0.3;
            if (this.isArrowOnScreen(updatedArrow)) {
                newArrows.push(updatedArrow);
            }
        })
    }

    handleMouseDown() {
        if (this.props.gameState === GAME_STATE.RUNNING) {
            this.setState(prevState => ({
                ...prevState,
                isMousePressed: true
            }));
        }
    }

    handleMouseMove(e) {
        if (this.state.isMousePressed && this.props.gameState === GAME_STATE.RUNNING) {
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
        if (this.props.gameState === GAME_STATE.RUNNING) {
            let newArrow = this.generateArrow(e);
            let arrows = [];
            arrows.push(newArrow);
            this.props.newShoot();
            this.state.arrows.forEach(arr => arrows.push(arr));
            this.setState(prevState => ({
                ...prevState,
                isMousePressed: false,
                arrows: arrows
            }));
        }
    }

    generateArrow(e) {
        return {
            xDir: e.clientX,
            yDir: e.clientY,
            xPos: this.archerX,
            yPos: this.archerY,
            arrowImg: this.props.selectedArcher.ammo,
            angle: this.state.archerRotation,
            time: 0,
            v0: 150
        }
    }


    calculateArcherRotation(e) {
        if (e.clientX < (this.canvasWidth / 2)) {
            return Math.atan((this.canvasHeight - e.clientY - 200) / (e.clientX - (this.canvasWidth / 2)));
        } else {
            return Math.atan((this.canvasHeight - e.clientY - 200) / ((this.canvasWidth / 2) - e.clientX));
        }
    }

    checkIfShouldBeScaled(e) {
        return e.clientX < (this.canvasWidth / 2)
    }

    isDuckOnScreen(duck) {
        return duck.x <= this.canvasWidth && duck.x >= 0;
    }

    isArrowOnScreen(arrow) {
        return arrow.xPos <= this.canvasWidth && arrow.xPos >= 0 && arrow.yPos <= this.canvasHeight && arrow.yPos >= 0;
    }

    moveDuck(duck) {
        duck.x += 10 * duck.direction;
    }

    generateDuckIfItIsTime(newState) {
        if (this.state.moveCounter % this.state.newDuckRate === 0) {
            newState.push(this.generateDuck(this.props.selectedLocation.duck))
        }
    }

    checkIfDuckShouldBeOnScreen(duck, updatedDucks) {
        if (this.isDuckOnScreen(duck) && duck.explosionVisibleCount < 10) {
            updatedDucks.push(duck);
        } else {
            this.props.updateTime(-1);
        }
    }

    drawArrow(ctx, arrow) {
        const imageToDraw = new Image();
        imageToDraw.src = arrow.arrowImg;
        imageToDraw.onload = () => {
            ctx.drawImage(imageToDraw,
                arrow.xPos,
                arrow.yPos,
                30,
                30);
        };
    }

    checkIfAnyDuckHit(arrows, ducks) {
        arrows.forEach(arrow => {
            ducks.forEach(duck => {
                if (this.checkIfDuckHit(arrow, duck)) {
                    duck.isHit = true;
                    duck.image = explosion;
                    this.props.duckHit(duck.points);
                    this.props.updateTime(1);
                }
                if (duck.isHit) {
                    duck.explosionVisibleCount = duck.explosionVisibleCount + 1;
                }
            })
        })
    }

    checkIfDuckHit(arrow, duck) {
        return Math.abs(arrow.xPos - duck.x) < duck.size / 2 && Math.abs(arrow.yPos - duck.y) < duck.size / 2 && !duck.isHit
    }

    drawArcher(ctx) {
        var archer = new Image();
        archer.src = this.props.selectedArcher.url;
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

    drawLoseScreen() {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        ctx.font = "140px Arial";
        ctx.textAlign = "center";
        can.fillStyle = "#ff3c00";
        ctx.strokeText("YOU LOST!", this.canvasWidth / 2, this.canvasHeight / 2);
    }

    drawPausedScreen() {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        ctx.font = "70px Arial";
        ctx.textAlign = "center";
        can.fillStyle = "#ff3c00";
        ctx.strokeText("GAME PAUSED", this.canvasWidth / 2, this.canvasHeight / 2);
    }

    drawWelcomeScreen() {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        this.setBackground(ctx, welcomeScreen);
    }

    setBackground(ctx, image) {
        var background = new Image();
        background.src = image || welcomeScreen;
        background.onload = function () {
            ctx.drawImage(background, 0, 0);
        }
    }

    drawDuck(duck) {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        const imageToDraw = new Image();
        imageToDraw.src = !duck.isHit ? duck.image : this.props.selectedLocation.explosion;
        let size = duck.isHit ? duck.size * 3 : duck.size;
        imageToDraw.onload = () => {
            ctx.drawImage(imageToDraw,
                duck.x,
                duck.y,
                size,
                size);
            if (duck.isHit) {
                ctx.font = "40px Arial";
                ctx.textAlign = "center";
                can.fillStyle = "#ff3c00";
                ctx.strokeText("+" + duck.points, duck.x - 50, duck.y + 30);
            }
        };
    }

    generateDuck(image) {
        const duckPos = this.getRandomDuckPosition();
        return {
            image: image,
            x: duckPos.x,
            y: duckPos.y,
            size: duckPos.size,
            direction: duckPos.direction,
            isHit: false,
            explosionVisibleCount: 0,
            points: Math.floor(10 * (0.05 * this.canvasHeight) / duckPos.size)
        }
    }

    getRandomDuckPosition() {
        const direction = this.getRandomDirection();
        let duckSize = this.getRandomSize();
        let x = (direction === DIRECTION.RIGHT) ? 0 : this.cref.current.width;
        let y = this.getRndInteger(0, this.cref.current.height * 0.7);
        return {x: x, y: y, size: duckSize, direction: direction};
    }

    updateTimeIfOneSecondLeft() {
        if (this.state.timeCounter % 10 === 0) {
            this.props.updateTime(-1);
        }
        this.changeNewDuckRate();
    }

    changeNewDuckRate() {
        if (this.state.newDuckRate > 5 && this.state.timeCounter % 30 === 0) {
            this.setState(prevState => ({
                ...prevState,
                newDuckRate: prevState.newDuckRate - 1
            }));
        }
    }

    checkIfNotLost() {
        if (this.props.timeLeft <= 0) {
            this.props.lostGame();
        }
    }

    getRandomSize() {
        return this.canvasHeight * 0.05 + this.getRndInteger(-20, 50);
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

export default GameWindow;