/*
 * action types
 */

export const START_GAME = 'START_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const END_GAME = 'START_GAME';

export function startGame() {
    return {type: START_GAME};
}

export function pauseGame() {
    return {type: PAUSE_GAME};
}

export function endGame() {
    return {type: END_GAME};
}

