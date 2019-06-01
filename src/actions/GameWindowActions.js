export const DUCK_HIT = 'DUCK_HIT';
export const NEW_SHOOT = 'NEW_SHOOT';
export const TIME_UPDATED = 'TIME_UPDATED';

export function duckHit(points) {
    return {type: DUCK_HIT, points};
}

export function newShoot() {
    return {type: NEW_SHOOT};
}

export function updateTime(timeChange) {
    return {type: TIME_UPDATED, timeChange};
}