import React from 'react'
import {connect} from 'react-redux'
import Canvas from "../components/canvas/Canvas";

const mapStateToProps = (state) => ({
    gameState: state.gameState
});

export const CanvasContainer = connect(
    mapStateToProps,
    null
)(Canvas);