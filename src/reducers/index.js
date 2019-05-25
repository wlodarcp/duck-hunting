import {combineReducers} from "redux";
import {gameStateReducer} from "./GameStateReducer";
import {scoreCounterReducer} from "./ScoreCounterReducer"

export const duckHuntReducer = combineReducers({
    gameStateReducer: gameStateReducer,
    scoreCounterReducer: scoreCounterReducer
});
