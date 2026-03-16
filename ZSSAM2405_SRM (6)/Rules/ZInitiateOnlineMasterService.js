/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZInitiateOnlineMasterService(clientAPI) {
    return clientAPI.executeAction(
        '/ZSSAM2405_SRM/Actions/SRM/OData/CreateMasterOnlineOData.action'
    );
}
