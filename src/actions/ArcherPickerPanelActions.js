export const ARCHER_PICKED = 'ARCHER_PICKED';
export const ARCHER_BOUGHT = 'ARCHER_BOUGHT';

export function archerPicked(archer) {
    return {type: ARCHER_PICKED, archer};
}

export function archerBought(cost) {
    return {type: ARCHER_BOUGHT, cost};
}