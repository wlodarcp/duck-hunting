import React from 'react'
import {connect} from 'react-redux'
import Canvas from "../components/canvas/Canvas";
import {duckHit} from "../actions/CanvasActions";

const mapStateToProps = (state) => ({
    gameState: state.gameStateReducer.gameState,
    points: state.scoreCounterReducer.points
});

const mapDispatchToProps = dispatch => {
    return {
        duckHit: (points) => {
            dispatch(duckHit(points));
        }
    }
};

export const CanvasContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);