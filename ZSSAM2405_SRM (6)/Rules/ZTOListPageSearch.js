/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZTOListPageSearch(clientAPI) {
    // Get the search text entered by the user
    const searchText = clientAPI.searchString;

    // If search is empty, return empty string (shows all items)
    if (!searchText || searchText.trim() === '') {
        return '';
    }

    // Escape single quotes
    const escapedText = searchText.replace(/'/g, "''");

    // MDK expects a $filter string
    // Here we filter TransferOrder exactly equal to search input
    return `$filter=TransferOrder eq '${escapedText}'`;
    
}
