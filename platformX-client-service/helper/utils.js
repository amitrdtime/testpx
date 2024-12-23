// utils.js

/**
 * Filters an array of objects based on a search term and a specified field.
 * 
 * @param {Array} items - The list of objects to filter.
 * @param {string} searchTerm - The term to search for.
 * @param {Array} fields - The fields to check for the search term.
 * @returns {Array} - The filtered list of objects.
 */
function filterItems(items, searchTerm, fields) {
    if (!searchTerm) return items;

    const normalizedSearchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
        return fields.some(field => {
            return item[field] && item[field].toLowerCase().includes(normalizedSearchTerm);
        });
    });
}

/**
 * Sorts an array of objects based on a specified field and order.
 * 
 * @param {Array} items - The list of objects to sort.
 * @param {string} sortField - The field to sort by.
 * @param {string} sortOrder - The order to sort ('asc' or 'desc').
 * @returns {Array} - The sorted list of objects.
 * @throws {Error} - Throws an error if the sortField is invalid.
 */
function sortItems(items, sortField, sortOrder) {
    if (!items.length || !Object.prototype.hasOwnProperty.call(items[0], sortField)) {
        throw new Error(`Invalid sort field: ${sortField}`);
    }

    const validSortOrder = sortOrder.toLowerCase() === 'asc' ? 1 : -1;

    return items.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return -1 * validSortOrder;
        }
        if (a[sortField] > b[sortField]) {
            return 1 * validSortOrder;
        }
        return 0;
    });
}

export default { filterItems, sortItems };
