import {END_GAME, PAUSE_GAME, START_GAME} from "../actions/GameTooltipActions";
import {GAME_STATE} from "../components/tooltip/GameTooltip";
import {ARCHER_PICKED} from "../actions/ArcherPickerActions";
import archers from "../components/util/Archers";


const initialState = {
    gameState: GAME_STATE.NOT_STARTED,
    selectedArcher: archers.archer1
};

export function gameStateReducer(state = initialState, action) {
    switch (action.type) {
        case START_GAME:
            return {...state, gameState: GAME_STATE.RUNNING};
        case PAUSE_GAME:
            return {...state, gameState: GAME_STATE.PAUSED};
        case END_GAME:
            return {...state, gameState: GAME_STATE.NOT_STARTED};
        case ARCHER_PICKED:
            return {...state, selectedArcher: action.archer};
        default:
            return state;
    }
}