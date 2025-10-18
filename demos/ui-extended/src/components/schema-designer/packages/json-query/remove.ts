import {
    remove as removePointer,
    removeUndefinedItems,
} from "#json-pointer";
import { get, ReturnType } from "./get";
import { PARENT_INDEX, POINTER_INDEX } from "./interpreter/keys";

/**
 * Runs query on input data and removes matching properties from results
 * @param data - input data
 * @param queryString - json-query string
 * @param [returnRemoved] - if true, will returned removed properties, else input-data is removed
 */
export function remove(data: any, queryString: any, returnRemoved = false) {
    const removed: any = [];
    const matches = get(data, queryString, ReturnType.ALL);
    matches.forEach(function (match: any) {
        removed.push(match[0]);
        removePointer(data, match[POINTER_INDEX], true);
    });
    matches.forEach(function (match: any) {
        if (Array.isArray(match[PARENT_INDEX])) {
            removeUndefinedItems(match[PARENT_INDEX]);
        }
    });
    return returnRemoved ? removed : data;
}
