/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZTOListFilter(clientAPI) {
    const searchString = (clientAPI.searchString || '').trim();
    const appClientData = clientAPI.getAppClientData();
    const fullTOList = appClientData.TOHeaderList || [];

    const filteredList = fullTOList.filter(to => {
        if (to.TransferOrder) {  
            return to.TransferOrder.toString().toLowerCase().includes(searchString);
        }
        return false;
    });
    appClientData.FilteredTOHeaderList = filteredList;
    return filteredList;
}
