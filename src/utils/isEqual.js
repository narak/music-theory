/**
 * Checks for array equality
 * @param  {Array}  a First value to compare
 * @param  {Array}  b Second value to compare
 * @return {Boolean}  true if equal, false otherwise.
 */
export default function isEqual(a, b) {
    if (!a || !b) {
        return false;
    }

    if (a.length !== b.length) {
        return false;
    }

    return a.every((v, i) => v === b[i]);
}
