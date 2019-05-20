import {connect} from "react-redux";
import {endGame, pauseGame, startGame} from "../actions/GameTooltipActions";
import GameTooltip from "../components/tooltip/GameTooltip";

const mapStateToProps = state => {
    return {gameState: state.gameState}
};

const mapDispatchToProps = dispatch => {
    return {
        startGame: () => {
            dispatch(startGame());
        },
        pauseGame: () => {
            dispatch(pauseGame());
        },
        endGame: () => {
            dispatch(endGame());
        }
    }
};

export const GameTooltipContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameTooltip);