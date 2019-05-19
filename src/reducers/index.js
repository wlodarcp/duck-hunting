import {combineReducers} from "redux";
import undoable, { distinctState } from 'redux-undo'

const chartsApp = combineReducers({

});

export const undoableChartsApp = undoable(chartsApp, {
    filter: distinctState()
});