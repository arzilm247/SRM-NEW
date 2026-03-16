import libCom from '../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
export default function ZTRHeaderQueryOptions(context) {
    alert("Hitting ZTRHeaderQueryOptions");

    // const bindingObject = context.getBindingObject();
    // alert("bindingObject :" + JSON.stringify(bindingObject));
    // const TransferOrder = bindingObject.TransferOrder;
    // alert("TransferOrder :" + TransferOrder);

    // const transferOrder = clientAPI.evaluateTargetPath(
    //     "#Page:Search_Transfer_Order/#ClientData/TransferOrder"
    // );

    // alert("TransferOrder: " + transferOrder);





    //------------------------------------------------------------------
    // let docNum = libCom.getStateVariable(context, 'DocumentID');

    // let query = '';

    // // if (docNum && docNum.trim() !== '') {
    // //     query = `$filter=TransferOrder eq '${docNum}'`;
    // //     $filter=TransferOrder eq '2000000013'
    // // }

    // if (docNum) {
    //     query = `$filter=TransferOrder eq '${docNum}'`;
    // }

    //  //alert("Final QueryOptions = " + (query || '[NO FILTER]'));
    //  //console.log("Final QueryOptions = " + (query || '[NO FILTER]'));



    // return query;


    //-------------------------------------------------
    //  alert("Hitting ZTRHeaderQueryOptions");

    //     // ✅ Read from state variable
    //     let docNum = libCom.getStateVariable(context, 'DocumentID');
    //     alert("ZOnlineTRQueryOptions State DocumentID = " + docNum);
    //     let query = '';

    //     if (docNum) {
    //         query = `$filter=TransferOrder eq '${docNum}'`;
    //     }

    //     alert("QueryOptions returning: " + query);

    //     return query;
    //--------------------------------
    // let docNum = context.getClientData().DocumentID;

    // let query = '';

    // if (docNum) {
    //     query = `$filter=TransferOrder eq '${docNum}'`;
    // }

    // alert("QueryOptions returning: " + query);

    // return query;
}


