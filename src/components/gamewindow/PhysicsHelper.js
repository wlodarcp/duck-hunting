import superduck from "../../images/ducks/superduck.png";

class PhysicsHelper {
    canvasHeight = 800;
    canvasWidth = 1200;
    archerX = this.canvasWidth / 2;
    archerY = this.canvasHeight - 100;
    archerCorrection = 200;
    arrowSpeedRatio = 0.2;
    duckSpeedRatio = 10;
    arrowSpeed = 150;

    moveArrows(arrows, newArrows) {
        arrows.forEach(arrow => {
            let updatedArrow = arrow;
            if (updatedArrow.xDir >= this.canvasWidth / 2) {
                updatedArrow.xPos = this.canvasWidth / 2 + arrow.v0 * Math.cos(arrow.angle) * arrow.time;
                updatedArrow.yPos = this.canvasHeight - this.archerCorrection + (arrow.v0 * Math.sin(arrow.angle) + 10 * arrow.time) * arrow.time;

            } else {
                updatedArrow.xPos = this.canvasWidth / 2 - arrow.v0 * Math.cos(arrow.angle) * arrow.time;
                updatedArrow.yPos = this.canvasHeight - this.archerCorrection + (arrow.v0 * Math.sin(arrow.angle) + 10 * arrow.time) * arrow.time;
            }
            updatedArrow.time = updatedArrow.time + this.arrowSpeedRatio;
            if (this.isArrowOnScreen(updatedArrow)) {
                newArrows.push(updatedArrow);
            }
        })
    }

    isArrowOnScreen(arrow) {
        return arrow.xPos <= this.canvasWidth && arrow.xPos >= 0 && arrow.yPos <= this.canvasHeight && arrow.yPos >= 0;
    }

    moveDuck(duck) {
        if (duck.image === superduck) {
            duck.x += this.duckSpeedRatio * duck.direction * 4;
        } else {
            duck.x += this.duckSpeedRatio * duck.direction;
        }
    }

    generateArrow(e, ammo, archerRotation) {
        return {
            xDir: e.clientX,
            yDir: e.clientY,
            xPos: this.archerX,
            yPos: this.archerY,
            arrowImg: ammo,
            angle: archerRotation,
            time: 0,
            v0: this.arrowSpeed
        }
    }

    calculateArcherRotation(e) {
        if (e.clientX < (this.canvasWidth / 2)) {
            return Math.atan((this.canvasHeight - e.clientY - this.archerCorrection) / (e.clientX - (this.canvasWidth / 2)));
        } else {
            return Math.atan((this.canvasHeight - e.clientY - this.archerCorrection) / ((this.canvasWidth / 2) - e.clientX));
        }
    }

    checkIfShouldBeScaled(e) {
        return e.clientX < (this.canvasWidth / 2)
    }

    isDuckOnScreen(duck) {
        return duck.x <= this.canvasWidth && duck.x >= 0;
    }

    checkIfDuckHit(arrow, duck) {
        const sizeRatio = duck.size > 40 ? 4 : 2;
        return Math.abs(arrow.xPos - duck.x) < duck.size / sizeRatio
            && Math.abs(arrow.yPos - duck.y) < duck.size / sizeRatio
            && !duck.isHit
    }

    generateDuck(image) {
        const duckPos = this.getRandomDuckPosition();
        return {
            image: image,
            x: duckPos.x,
            y: duckPos.y,
            size: image === superduck ? 130 : duckPos.size,
            direction: duckPos.direction,
            isHit: false,
            explosionVisibleCount: 0,
            points: this.calculatePoints(image, duckPos.size)
        }
    }

    calculatePoints(image, duckSize) {
        return image === superduck ? 40 : Math.floor(10 * (0.05 * this.canvasHeight) / duckSize);
    }

    getRandomDuckPosition() {
        const direction = this.getRandomDirection();
        let duckSize = this.getRandomSize();
        let x = (direction === DIRECTION.RIGHT) ? 0 : this.canvasWidth;
        let y = this.getRndInteger(0, this.canvasHeight * 0.7);
        return {x: x, y: y, size: duckSize, direction: direction};
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

export default PhysicsHelper;