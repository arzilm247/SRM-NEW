/**
 * Return TransferOrder value for inline QueryOptions
 * @param {IClientAPI} context
 */
export default function ZTOHeaderQueryOptions(context) {
    const searchText = context.searchString;

    if (!searchText || searchText.trim() === '') {
        return '';
    }

    // Escape single quotes just in case
    const escapedText = searchText.replace(/'/g, "''");

    // **Return only the TransferOrder value** (without $filter)
    return `${escapedText}`;
}
