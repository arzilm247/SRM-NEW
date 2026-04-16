import { createWarehouseResource } from './ZWarehouseResourceAPI';

/**
 * Triggered by the "Create" button on the Create_WarehouseResource page.
 * Validates inputs, calls the API layer, and handles success/failure.
 * @param {IClientAPI} clientAPI
 */
export default async function ZHandleCreateResource(clientAPI) {
    // Read the FormCell values from the current page
    const warehouse = clientAPI.evaluateTargetPath('#Page:Create_WarehouseResource/#Control:FC_Warehouse/#Value');
    const resource  = clientAPI.evaluateTargetPath('#Page:Create_WarehouseResource/#Control:FC_Resource/#Value');

    // Validation — both fields are required
    if (!warehouse || !warehouse.trim() || !resource || !resource.trim()) {
        return clientAPI.executeAction({
            "_Type": "Action.Type.Message",
            "Message": "Please provide both Warehouse Number and Resource ID.",
            "Title": "Validation Error",
            "OKCaption": "OK",
            "MessageType": "Error"
        });
    }

    clientAPI.showActivityIndicator('Creating Resource...');

    try {
        await createWarehouseResource(clientAPI, {
            "EWMWarehouse": warehouse.trim().toUpperCase(),
            "EWMResource":  resource.trim().toUpperCase()
        });

        clientAPI.dismissActivityIndicator();

        // Show success banner then close modal
        await clientAPI.executeAction({
            "_Type": "Action.Type.Message.BannerMessage",
            "Message": `Resource ${resource.trim().toUpperCase()} created successfully`,
            "BannerMessageType": "Success",
            "DurationInMilliseconds": 3000
        });

        return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/CloseModalPage_Complete.action');

    } catch (err) {
        clientAPI.dismissActivityIndicator();
        console.error('[ZHandleCreateResource]', err);

        return clientAPI.executeAction({
            "_Type": "Action.Type.Message",
            "Message": String(err.message || err),
            "Title": "Creation Failed",
            "OKCaption": "Close",
            "MessageType": "Error"
        });
    }
}
