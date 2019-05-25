import {DUCK_HIT} from "../actions/CanvasActions";

const initialState = {
    points: 0
};

export function scoreCounterReducer(state = initialState, action) {
    switch (action.type) {
        case DUCK_HIT:
            return {points: state.points + action.points};
        default:
            return state;
    }
}