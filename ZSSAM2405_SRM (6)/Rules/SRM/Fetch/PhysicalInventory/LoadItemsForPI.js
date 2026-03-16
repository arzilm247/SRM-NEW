export default async function LoadItemsForPI(clientAPI) {
    const PII = clientAPI.getBindingObject().PhyInvDoc;

     alert(PII);
    const result = await clientAPI.read(
        '/ZSSAM2405_SRM/Services/ODSMWH.service',
        'WMPhyItemsSet',
        [],
        `$filter=PhyInvDoc eq '${PII}'`
    );

    alert(result.length);

    const appClientData = clientAPI.getAppClientData();
    const material = appClientData.Material;
    alert("Mterial" + material);

    appClientData.AllItemsList = [];
    for (let i = 0; i < result.length; i++) {
        const item = result.getItem(i);

        //  Apply material filter ONLY if material exists
        if (!material || item.Material === material) {
            appClientData.AllItemsList.push(item);
        }
        //appClientData.AllItemsList.push(result.getItem(i));
    }

    appClientData.FilteredItemsList = appClientData.AllItemsList;

    clientAPI.redraw(); // REQUIRED
}
