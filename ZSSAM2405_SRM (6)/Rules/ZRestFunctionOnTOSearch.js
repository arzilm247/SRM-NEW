/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZRestFunctionOnTOSearch(clientAPI) {
    let documentNumberCtrl = clientAPI.evaluateTargetPath('#Page:Search_Transfer_Order/#Control:Document_Number');
    let materialCtrl = clientAPI.evaluateTargetPath('#Page:Search_Transfer_Order/#Control:Material');

    if (documentNumberCtrl) documentNumberCtrl.setValue('');
    if (materialCtrl) materialCtrl.setValue('');
}

