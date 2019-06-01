import React from 'react'
import {connect} from 'react-redux'
import GameWindow from "../components/gamewindow/GameWindow";
import {duckHit, newShoot, updateTime} from "../actions/GameWindowActions";
import {lostGame} from "../actions/GameTooltipActions";

const mapStateToProps = (state) => ({
    gameState: state.gameStateReducer.gameState,
    selectedArcher: state.gameStateReducer.selectedArcher,
    selectedLocation: state.gameStateReducer.selectedLocation,
    points: state.gameStateReducer.points,
    duckHitCount: state.gameStateReducer.duckHitCount,
    shootCount: state.gameStateReducer.shootCount,
    timeLeft: state.gameStateReducer.timeLeft
});

const mapDispatchToProps = dispatch => {
    return {
        duckHit: (points) => {
            dispatch(duckHit(points));
        },
        newShoot: () => {
            dispatch(newShoot());
        },
        updateTime: (timeChange) => {
            dispatch(updateTime(timeChange));
        },
        lostGame: () => {
            dispatch(lostGame());
        }
    }
};

export const GameWindowContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameWindow);