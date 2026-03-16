/**
 * Return TransferOrder value for inline QueryOptions
 * @param {IClientAPI} context
 */
export default function ZTOHeaderQueryOptions(context) {
   const searchText = context.searchString;

    // Optional alert to debug what is being typed
    alert(`Search text: ${searchText}`);

    if (!searchText || searchText.trim() === '') {
        return '';
    }

    // Escape single quotes just in case
    const escapedText = searchText.replace(/'/g, "''");

    // **Return only the TransferOrder value** (without $filter)
    return `${escapedText}`;
}
