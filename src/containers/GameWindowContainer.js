import React from 'react'
import {connect} from 'react-redux'
import GameWindow from "../components/gamewindow/GameWindow";
import {duckHit} from "../actions/GameWindowActions";

const mapStateToProps = (state) => ({
    gameState: state.gameStateReducer.gameState,
    points: state.gameStateReducer.points,
    selectedArcher: state.gameStateReducer.selectedArcher,
    selectedLocation: state.gameStateReducer.selectedLocation
});

const mapDispatchToProps = dispatch => {
    return {
        duckHit: (points) => {
            dispatch(duckHit(points));
        }
    }
};

export const GameWindowContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameWindow);