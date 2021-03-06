import connect from "react-redux/es/connect/connect";
import ScoreCounter from "../components/scorecounter/ScoreCounter";

const mapStateToProps = state => {
    return {
        gameState: state.gameStateReducer.gameState,
        points: state.gameStateReducer.points,
        duckHitCount: state.gameStateReducer.duckHitCount,
        shootCount: state.gameStateReducer.shootCount,
        timeLeft: state.gameStateReducer.timeLeft
    }
};

export const ScoreCounterContainer = connect(
    mapStateToProps,
)(ScoreCounter);