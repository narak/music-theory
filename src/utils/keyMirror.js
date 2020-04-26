/**
 * Same as a regular keyMirror, but it has a map method.
 * @param {...Strings} keys The constant values
 * @returns {void}
 */
function Constant(...keys) {
    keys.forEach(d => (this[d] = d));
}

Constant.prototype.map = function forEach(fn) {
    let newArray = [],
        idx = 0;
    for (let key in this) {
        if (this.hasOwnProperty(key)) {
            newArray[idx++] = fn(key);
        }
    }
    return newArray;
};

/**
 * Key mirror implemetation that creates a constants object. Different signature
 * from npm(keyMirror).
 * example: keymirror('CONSTANT1', 'CONSTANT2')
 * @param  {...String} keys n number of strings used to create constants object.
 * @return {Object}         Object where { arg1: arg1, arg2: arg2 }, etc. which
 *                          can be used as constant values.
 */
export default function keyMirror(...keys) {
    return new Constant(...keys);
}
