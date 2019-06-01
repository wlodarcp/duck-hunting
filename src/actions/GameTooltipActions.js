/*
 * action types
 */

export const START_GAME = 'START_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const RESTARTED_GAME = 'RESTARTED_GAME';
export const LOST_GAME = 'LOST_GAME';

export function startGame() {
    return {type: START_GAME};
}

export function pauseGame() {
    return {type: PAUSE_GAME};
}

export function restartGame() {
    return {type: RESTARTED_GAME};
}

export function lostGame() {
    return {type: LOST_GAME};
}
