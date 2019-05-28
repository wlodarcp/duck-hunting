export const ARCHER_PICKED = 'ARCHER_PICKED';

export function archerPicked(archer) {
    return {type: ARCHER_PICKED, archer};
}