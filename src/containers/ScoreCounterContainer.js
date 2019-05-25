import connect from "react-redux/es/connect/connect";
import ScoreCounter from "../components/scorecounter/ScoreCounter";

const mapStateToProps = state => {
    return {
        gameState: state.gameStateReducer.gameState,
        points: state.scoreCounterReducer.points
    }
};

export const ScoreCounterContainer = connect(
    mapStateToProps,
)(ScoreCounter);