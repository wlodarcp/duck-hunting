import React from 'react'
import {connect} from 'react-redux'
import Canvas from "../components/canvas/Canvas";

const mapStateToProps = (state) => ({
    gameState: state.gameStateReducer.gameState
});

export const CanvasContainer = connect(
    mapStateToProps
)(Canvas);