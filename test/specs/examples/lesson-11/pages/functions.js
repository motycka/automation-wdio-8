/**
 * Resolves input element value by it's ID using JavaScript call to document.getElementById
 * @param id input element id
 * @returns {Promise<*>}
 */
export function getFieldValueById(id) {
    return browser.execute((id) => {
        return document.getElementById(id).value
    }, id);
}
