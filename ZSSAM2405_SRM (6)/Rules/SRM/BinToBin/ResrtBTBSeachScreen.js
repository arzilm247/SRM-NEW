/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ResrtBTBSeachScreen(clientAPI) {
     let documentNumberCtrl = clientAPI.evaluateTargetPath('#Page:BTBSearch_Transfer_Order/#Control:Document_Number');
    let materialCtrl = clientAPI.evaluateTargetPath('#Page:BTBSearch_Transfer_Order/#Control:Material');

    if (documentNumberCtrl) documentNumberCtrl.setValue('');
    if (materialCtrl) materialCtrl.setValue('');
}
