/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZNavTo_ToScreen(clientAPI) {
    // 1️⃣ Get selected Transfer Order
    const selectedTO = clientAPI.getPressedItem().getBindingObject();

    // 2️⃣ Set it as ActionBinding
    clientAPI.getPageProxy().setActionBinding(selectedTO);

    // 3️⃣ Navigate to Tabs page
    return clientAPI.executeAction(
        '/ZSSAM2405_SRM/Actions/SRM/TranferOrder/NavTo_ToScreen.action'
    );
}
