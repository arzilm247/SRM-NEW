/**
 * ZConfirmAllTOItems - Confirms all TO items for the current Transfer Order
 * by updating DestTargQty = ActualQty (or RequestedQty) for each item
 * via OData PATCH using MDK-native executeAction UpdateEntity.
 *
 * Called from the "Confirm All" button on TO_Item_Details_Screen.
 * @param {IClientAPI} context
 */
export default async function ZConfirmAllTOItems(context) {
    const appClientData = context.getAppClientData();
    const items = appClientData.AllItemsList;

    if (!items || items.length === 0) {
        return context.executeAction({
            '_Type': 'Action.Type.Message',
            'Message': 'No items found to confirm. Please navigate back and reopen the Transfer Order.',
            'Title': 'No Items',
            'OKCaption': 'OK',
            'MessageType': 'Warning'
        });
    }

    let successCount = 0;
    let failCount    = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Build readLink — MDK populates @odata.readLink on OData V2 results.
        // Fall back to key-based construction if the property is absent.
        let readLink = item['@odata.readLink'];
        if (!readLink && item.WarehouseNum && item.TransferOrder && item.TransOrdItem) {
            readLink = `TOItemsSet(WarehouseNum='${item.WarehouseNum}',TransferOrder='${item.TransferOrder}',TransOrdItem='${item.TransOrdItem}')`;
        }

        if (!readLink) {
            console.error(`ZConfirmAllTOItems: no readLink for item at index ${i}, skipping.`);
            failCount++;
            continue;
        }

        // DestTargQty is the only OData-updatable field per ODSMWH metadata.
        // Use ActualQty if available (actual picked quantity), else RequestedQty.
        const confirmQty = (item.ActualQty !== undefined && item.ActualQty !== null)
            ? item.ActualQty
            : ((item.RequestedQty !== undefined && item.RequestedQty !== null)
                ? item.RequestedQty
                : 0);

        try {
            // MDK-native OData update — context.update() does NOT exist.
            // Use executeAction with inline Action.Type.ODataService.UpdateEntity.
            await context.executeAction({
                '_Type': 'Action.Type.ODataService.UpdateEntity',
                'Target': {
                    'Service': '/ZSSAM2405_SRM/Services/ODSMWH.service',
                    'EntitySet': 'TOItemsSet',
                    'ReadLink': readLink
                },
                'Properties': {
                    'DestTargQty': confirmQty
                },
                'RequestOptions': {
                    'UpdateMode': 'Merge'
                }
            });
            successCount++;
        } catch (err) {
            console.error(`ZConfirmAllTOItems: Failed for item ${item.TransOrdItem}:`, err);
            failCount++;
        }
    }

    // Report results
    if (failCount > 0 && successCount === 0) {
        return context.executeAction({
            '_Type': 'Action.Type.Message',
            'Message': `Confirmation failed. ${failCount} item(s) could not be confirmed.`,
            'Title': 'Confirmation Failed',
            'OKCaption': 'OK',
            'MessageType': 'Error'
        });
    } else if (failCount > 0) {
        return context.executeAction({
            '_Type': 'Action.Type.Message',
            'Message': `Partially confirmed: ${successCount} succeeded, ${failCount} failed.`,
            'Title': 'Partial Confirmation',
            'OKCaption': 'OK',
            'MessageType': 'Warning'
        });
    } else {
        return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/TranferOrder/TOConfirmAllSuccess.action');
    }
}
