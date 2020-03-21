/**
 * Key mirror implemetation that creates a constants object. Different signature
 * from npm(keyMirror)
 * example: keymirror('CONSTANT1', 'CONSTANT2')
 * @param  {...String} keys n number of strings used to create constants object.
 * @return {Object}         Object where { arg1: arg1, arg2: arg2 }, etc. which
 *                          can be used as constant values.
 */
export default function keyMirror(...keys) {
    const o = {};
    keys.forEach(d => (o[d] = d));
    return o;
}
