import {combineReducers} from "redux";
import undoable, { distinctState } from 'redux-undo'
import {canvasReducer} from "./CanvasReducer";
import {gameTooltipReducer} from "./GameTooltipReducer";

const chartsApp = combineReducers({
    canvas: canvasReducer,
    gameTooltip: gameTooltipReducer
});

export const undoableChartsApp = undoable(chartsApp, {
    filter: distinctState()
});