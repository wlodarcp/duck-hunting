import {connect} from "react-redux";
import {pauseGame, restartGame, startGame} from "../actions/GameTooltipActions";
import GameTooltip from "../components/tooltip/GameTooltip";

const mapStateToProps = (state) => ({
    gameState: state.gameStateReducer.gameState,
});

const mapDispatchToProps = dispatch => {
    return {
        startGame: () => {
            dispatch(startGame());
        },
        pauseGame: () => {
            dispatch(pauseGame());
        },
        restartGame: () => {
            dispatch(restartGame());
        }
    }
};

export const GameTooltipContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameTooltip);