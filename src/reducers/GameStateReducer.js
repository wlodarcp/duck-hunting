import {END_GAME, PAUSE_GAME, START_GAME} from "../actions/GameTooltipActions";
import {GAME_STATE} from "../components/tooltip/GameTooltip";

const initialState = {
    gameState: GAME_STATE.NOT_STARTED
};

export function gameStateReducer(state = initialState, action) {
    switch (action.type) {
        case START_GAME:
            return {...state, gameState: GAME_STATE.RUNNING};
        case PAUSE_GAME:
            return {gameState: GAME_STATE.PAUSED};
        case END_GAME:
            return {...state, gameState: GAME_STATE.NOT_STARTED};
        default:
            return state;
    }
}