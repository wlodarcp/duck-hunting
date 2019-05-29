import {combineReducers} from "redux";
import {gameStateReducer} from "./GameStateReducer";

export const duckHuntReducer = combineReducers({
    gameStateReducer: gameStateReducer
});
