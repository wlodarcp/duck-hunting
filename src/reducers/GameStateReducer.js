import {LOST_GAME, PAUSE_GAME, RESTARTED_GAME, START_GAME} from "../actions/GameTooltipActions";
import {GAME_STATE} from "../components/tooltip/GameTooltip";
import {ARCHER_BOUGHT, ARCHER_PICKED} from "../actions/ArcherPickerPanelActions";
import archers from "../components/util/Archers";
import {DUCK_HIT, NEW_SHOOT, TIME_UPDATED} from "../actions/GameWindowActions";
import locations from "../components/util/Locations";
import {LOCATION_BOUGHT, LOCATION_PICKED} from "../actions/LocationPickerPanelActions";
import {TIME_BOUGHT} from "../actions/ExtraTimeCardActions"

const initialState = {
    gameState: GAME_STATE.NOT_STARTED,
    selectedArcher: archers.archer1,
    selectedLocation: locations.windows,
    points: 100,
    duckHitCount: 0,
    shootCount: 0,
    timeLeft: 60
};

export function gameStateReducer(state = initialState, action) {
    switch (action.type) {
        case START_GAME:
            return {...state, gameState: GAME_STATE.RUNNING};
        case PAUSE_GAME:
            return {...state, gameState: GAME_STATE.PAUSED};
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
        case NEW_SHOOT:
            return {...state, shootCount: state.shootCount + 1};
        case TIME_UPDATED:
            return {...state, timeLeft: state.timeLeft + action.timeChange};
        case LOST_GAME:
            return {...state, gameState: GAME_STATE.LOST};
        case TIME_BOUGHT:
            return {...state, points: state.points - 20, timeLeft: state.timeLeft + 10};
        case RESTARTED_GAME:
            return initialState;
        default:
            return state;
    }
}