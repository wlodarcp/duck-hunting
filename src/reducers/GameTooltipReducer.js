import {GAME_STATE} from "../components/tooltip/GameTooltip";

const initialState = {
    gameState: GAME_STATE.RUNNING
};

export function gameTooltipReducer(state = initialState, action) {
    return state;
}