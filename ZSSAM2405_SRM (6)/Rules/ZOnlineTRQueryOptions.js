import libCom from '../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function ZOnlineTRQueryOptions(context) {
    alert("Hitting ZOnlineTRQueryOptions");
    
    // ✅ Read from state variable
    let docNum = libCom.getStateVariable(context, 'DocumentID');
    alert("ZOnlineTRQueryOptions State DocumentID = " + docNum);
    let query = '';
  
    if (docNum) {
        query = `$filter=TransferOrder eq '${docNum}'`;
    }

    alert("QueryOptions returning: " + query);

    return query;


    //---------------------------------------------
    // alert("ZOnlineTRQueryOptions");
    // let docID = libCom.getStateVariable(context, 'DocumentID'); // Read the state variable

    // if (docID) {
    //     return `$filter=TransferOrder eq '${docID}'`; // Apply filter
    // } else {
    //     return ''; // No filter if docID is not set
    // }
}
