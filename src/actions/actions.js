export const QUERY_ALL = 'QUERY_ALL';

export function queryAll(tab) {
    return {
        type: QUERY_ALL,
        tab,
    }
}