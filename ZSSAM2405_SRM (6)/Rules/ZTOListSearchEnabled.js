/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZTOListSearchEnabled(clientAPI) {
    const appClientData = clientAPI.getAppClientData();
    const toList = appClientData.TOHeaderList || [];
    // Enable search bar if there are items
    return toList.length > 0;
}
