/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZCustomSearchFilter(clientAPI) {
    const searchString = (clientAPI.searchString || '').trim().toLowerCase();
    const appClientData = clientAPI.getAppClientData();
    const allItems = appClientData.TOHeaderList || [];

    // No search → return full list
    if (!searchString) {
        return allItems;
    }

    // Filter locally
    return allItems.filter(item =>
        item.TransferOrder &&
        item.TransferOrder.toLowerCase().includes(searchString)
    );
}
