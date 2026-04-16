export default async function ZLoadItemsForTO(clientAPI) {
    const TRO = clientAPI.getBindingObject().TransferOrder;

    const result = await clientAPI.read(
        '/ZSSAM2405_SRM/Services/ODSMWH.service',
        'TOItemsSet',
        [],
        `$filter=TransferOrder eq '${TRO}'`
    );

    //alert(result.length);

    const appClientData = clientAPI.getAppClientData();
    const material = appClientData.Material;
    //alert(material);

    appClientData.AllItemsList = [];
    for (let i = 0; i < result.length; i++) {
        const item = result[i]; // context.read() returns a plain JS array

        // Apply material filter ONLY if material is set
        if (!material || item.Material === material) {
            appClientData.AllItemsList.push(item);
        }
    }

    appClientData.FilteredItemsList = appClientData.AllItemsList;

    clientAPI.redraw(); // REQUIRED
}
