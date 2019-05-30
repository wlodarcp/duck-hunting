import {END_GAME, PAUSE_GAME, START_GAME} from "../actions/GameTooltipActions";
import {GAME_STATE} from "../components/tooltip/GameTooltip";
import {ARCHER_BOUGHT, ARCHER_PICKED} from "../actions/ArcherPickerPanelActions";
import archers from "../components/util/Archers";
import {DUCK_HIT} from "../actions/GameWindowActions";
import locations from "../components/util/Locations";
import {LOCATION_BOUGHT, LOCATION_PICKED} from "../actions/LocationPickerPanelActions";


const initialState = {
    gameState: GAME_STATE.NOT_STARTED,
    selectedArcher: archers.archer1,
    selectedLocation: locations.windows,
    points: 0,
    duckHitCount: 0
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
        case ARCHER_BOUGHT:
            return {...state, points: state.points - action.cost};
        case LOCATION_PICKED:
            return {...state, selectedLocation: action.location};
        case LOCATION_BOUGHT:
            return {...state, points: state.points - action.cost};
        case DUCK_HIT:
            return {...state, points: state.points + action.points, duckHitCount: state.duckHitCount + 1};
        default:
            return state;
    }
}