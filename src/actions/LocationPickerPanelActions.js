export const LOCATION_PICKED = 'LOCATION_PICKED';
export const LOCATION_BOUGHT = 'LOCATION_BOUGHT';

export function locationPicked(location) {
    return {type: LOCATION_PICKED, location};
}

export function locationBought(cost) {
    return {type: LOCATION_BOUGHT, cost};
}