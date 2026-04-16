import { createWarehouseResource } from './ZWarehouseResourceAPI';

/**
 * Triggered by the "Create" button on the Create_WarehouseResource page.
 * @param {IClientAPI} clientAPI
 */
export default async function ZHandleCreateResource(clientAPI) {
    // Read the FormCell values from the Current Page
    const warehouse = clientAPI.evaluateTargetPath('#Page:Create_WarehouseResource/#Control:FC_Warehouse/#Value');
    const resource = clientAPI.evaluateTargetPath('#Page:Create_WarehouseResource/#Control:FC_Resource/#Value');

    if (!warehouse || !resource) {
        return clientAPI.executeAction({
            "Name": "/ZSSAM2405_SRM/Actions/GenericMessageBox.action",
            "Properties": {
                "Message": "Please provide both Warehouse and Resource ID to proceed.",
                "Title": "Validation Error"
            }
        });
    }

    clientAPI.showActivityIndicator('Creating Resource in Public Cloud...');

    try {
        await createWarehouseResource({
            "EWMWarehouse": warehouse.trim().toUpperCase(),
            "EWMResource": resource.trim().toUpperCase()
        });

        clientAPI.dismissActivityIndicator();
        
        // Success Message
        await clientAPI.executeAction({
            "Name": "/ZSSAM2405_SRM/Actions/Message/BannerMessage.action",
            "Properties": {
                "Message": `Resource ${resource.toUpperCase()} created successfully!`,
                "BannerMessageType": "Success"
            }
        });

        // Close Modal Page on Success
        return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/CloseModalPage_Complete.action');

    } catch (err) {
        clientAPI.dismissActivityIndicator();
        console.error(err);
        
        return clientAPI.executeAction({
            "Name": "/ZSSAM2405_SRM/Actions/GenericMessageBox.action",
            "Properties": {
                "Message": String(err.message || err),
                "Title": "API Creation Error",
                "OKCaption": "Close"
            }
        });
    }
}
