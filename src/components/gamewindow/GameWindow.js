import React from "react";
import {GAME_STATE} from "../tooltip/GameTooltip";
import welcomeScreen from "../../images/welcomescreen/welcomescreen.png"
import PhysicsHelper from "./PhysicsHelper";
import bullet from "../../images/bullet/bullet.png"
import superduck from "../../images/ducks/superduck.png"

class GameWindow extends React.Component {
    initialState = {
        speed: 100,
        moveCounter: 0,
        newDuckRate: 30,
        ducks: [],
        archerRotation: Math.PI / 180.,
        shouldBeScaled: false,
        arrows: [],
        isMousePressed: false,
        timeCounter: 0
    };

    constructor(props) {
        super(props);
        this.physicsHelper = new PhysicsHelper();
        this.cref = React.createRef();
        this.state = this.initialState;
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
                    width={this.physicsHelper.canvasWidth}
                    height={this.physicsHelper.canvasHeight}
                    onMouseDown={() => this.handleMouseDown()}
                    onMouseMove={(e) => this.handleMouseMove(e)}
                    onMouseUp={(e) => this.handleMouseUp(e)}
                />
            </div>
        );
    }

    repaint() {
        this.setBackground(this.props.selectedLocation.url);
        this.drawArcher();
        this.drawBullets();
        this.state.ducks.forEach(duck => this.drawDuck(duck));
        this.state.arrows.forEach(arrow => this.drawArrow(arrow))
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
                    this.physicsHelper.moveDuck(duck);
                    this.checkIfDuckShouldBeOnScreen(duck, updatedDucks);
                });
                this.generateDuckIfItIsTime(updatedDucks);
                this.physicsHelper.moveArrows(this.state.arrows, updatedArrows);
                this.checkIfAnyDuckHit(updatedArrows, updatedDucks);
                this.updateStateAfterMove(updatedDucks, updatedArrows);
                this.updateTimeIfOneSecondLeft();
                this.checkIfNotLost();
            }
            window.requestAnimationFrame(this.startGame);
        }, this.state.speed);
    };

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
            const newArcherRotation = this.physicsHelper.calculateArcherRotation(e);
            const shouldBeScaled = this.physicsHelper.checkIfShouldBeScaled(e);
            this.setState(prevState => ({
                ...prevState,
                archerRotation: newArcherRotation,
                shouldBeScaled: shouldBeScaled
            }));
        }
    }

    handleMouseUp(e) {
        if (this.props.gameState === GAME_STATE.RUNNING) {
            let newArrow = this.physicsHelper.generateArrow(e, this.props.selectedArcher.ammo, this.state.archerRotation);
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

    drawWelcomeScreen() {
        this.setBackground(welcomeScreen);
        this.resetStateIfItIsNotInitial();
    }


    drawLoseScreen() {
        let ctx = this.cref.current.getContext("2d");
        ctx.font = "140px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff3c00";
        ctx.fillText("YOU LOST!", this.physicsHelper.canvasWidth / 2, this.physicsHelper.canvasHeight / 2);
    }

    drawPausedScreen() {
        let ctx = this.cref.current.getContext("2d");
        ctx.font = "70px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "magenta";
        ctx.fillText("GAME PAUSED", this.physicsHelper.canvasWidth / 2, this.physicsHelper.canvasHeight / 2);
    }

    drawArrow(arrow) {
        let ctx = this.cref.current.getContext("2d");
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

    drawArcher() {
        let ctx = this.cref.current.getContext("2d");
        var archer = new Image();
        archer.src = this.props.selectedArcher.url;
        const x = this.physicsHelper.archerX;
        const y = this.physicsHelper.archerY;
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

    drawDuck(duck) {
        let ctx = this.cref.current.getContext("2d");
        const imageToDraw = new Image();
        imageToDraw.src = !duck.isHit ? duck.image : this.props.selectedLocation.explosion;
        let size = duck.isHit ? duck.size * 2 : duck.size;
        imageToDraw.onload = () => {
            ctx.drawImage(imageToDraw,
                duck.x,
                duck.y,
                size,
                size);
            if (duck.isHit) {
                this.drawPointsInfo(ctx, duck);
            }
        };
    }

    drawBullets() {
        const i = this.props.shootCount % 6 === 0 ? 5 : 5 - this.props.shootCount % 6;
        for (let n = 0; n < i; n++) {
            this.drawBullet(n);
        }
    }

    drawBullet(counter) {
        let can = this.cref.current;
        let ctx = can.getContext("2d");
        const imageToDraw = new Image();
        imageToDraw.src = bullet;
        imageToDraw.onload = () => {
            ctx.drawImage(imageToDraw,
                this.physicsHelper.canvasWidth - 160 + counter * 15,
                this.physicsHelper.canvasHeight - 100,
                70,
                70);
        }
    }

    drawPointsInfo(ctx, duck) {
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff3c00";
        ctx.fillText("+" + duck.points, duck.x - 50, duck.y + 30);
    }

    updateStateAfterMove(newDucks, newArrows) {
        this.setState(prevState => ({
            ...prevState,
            moveCounter: prevState.moveCounter + 1,
            ducks: newDucks,
            arrows: newArrows,
            timeCounter: prevState.timeCounter + 1
        }));
    }

    generateDuckIfItIsTime(newState) {
        if (this.state.moveCounter % this.state.newDuckRate === 0) {
            newState.push(this.physicsHelper.generateDuck(this.props.selectedLocation.duck))
        }
        if (this.state.moveCounter % 60 === 0) {
            newState.push(this.physicsHelper.generateDuck(superduck))
        }
    }

    checkIfDuckShouldBeOnScreen(duck, updatedDucks) {
        if (this.physicsHelper.isDuckOnScreen(duck) && duck.explosionVisibleCount < 10) {
            updatedDucks.push(duck);
        } else {
            this.props.updateTime(-1);
        }
    }

    checkIfAnyDuckHit(arrows, ducks) {
        arrows.forEach(arrow => {
            ducks.forEach(duck => {
                if (this.physicsHelper.checkIfDuckHit(arrow, duck)) {
                    duck.isHit = true;
                    this.props.duckHit(duck.points);
                    this.props.updateTime(1);
                }
                if (duck.isHit) {
                    duck.explosionVisibleCount = duck.explosionVisibleCount + 1;
                }
            })
        })
    }

    resetStateIfItIsNotInitial() {
        if (this.state.timeCounter > 0) {
            this.setState(this.initialState);
        }
    }

    setBackground(image) {
        let ctx = this.cref.current.getContext("2d");
        const background = new Image();
        background.src = image || welcomeScreen;
        background.onload = function () {
            ctx.drawImage(background, 0, 0);
        }
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
            this.setState(this.initialState);
        }
    }
}

export default GameWindow;