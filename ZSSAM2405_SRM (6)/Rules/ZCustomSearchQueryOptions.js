/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZCustomSearchQueryOptions(clientAPI) { 
    const searchString = (clientAPI.searchString || '').trim();
    let qob = clientAPI.dataQueryBuilder();
 
    const warehouseFilter = `WarehouseNum eq 'OD1'`;
 
    if (!searchString) {
        qob.filter(warehouseFilter);
        return qob;
    }
 
    const searchFilter = `startswith(TransferOrder,'${searchString}')`;
 
    qob.filter().and(warehouseFilter, searchFilter);
 
    qob.orderBy('TransferOrder');
 
    return qob;


    //-----------------------------------------------------------------------
    // const searchString = (clientAPI.searchString || '').trim();
    // let qob = clientAPI.dataQueryBuilder();

    // const clientData = clientAPI.getClientData();
    // const selectedTO = clientData.SelectedTO;

    // // 🔹 1. If coming from Fetch screen → show only that TO
    // if (selectedTO) {
    //     qob.filter(
    //         `TransferOrder eq '${selectedTO.TransferOrder}' and WarehouseNum eq '${selectedTO.WarehouseNum}'`
    //     );
    //     qob.orderBy('TransferOrder');
    //     return qob;
    // }

    // // 🔹 2. Default warehouse filter
    // const warehouseFilter = `WarehouseNum eq 'OD1'`;

    // // 🔹 3. No search string → return all TOs in warehouse
    // if (!searchString) {
    //     qob.filter(warehouseFilter);
    //     qob.orderBy('TransferOrder');
    //     return qob;
    // }

    // // 🔹 4. Search string entered → filter by TransferOrder starting with search string
    // const searchFilter = `startswith(TransferOrder,'${searchString}')`;
    // qob.filter().and(warehouseFilter, searchFilter);
    // qob.orderBy('TransferOrder');

    // return qob;
}

