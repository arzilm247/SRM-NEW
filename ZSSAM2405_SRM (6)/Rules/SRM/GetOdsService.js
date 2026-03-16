export default function GetOdsService(clientAPI) {
    return ZInitializeOdsService(clientAPI).then(value => {
        alert("DATA" + JSON.stringify(value));
        return value;
    }).catch(error => {
        alert("ERROR" + JSON.stringify(error));
        throw error;
    });
}

// //working
// export function ZInitializeOdsService(clientAPI) {
//     return clientAPI.read('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', [], ''
//     ).then(result => {
//         if (result && result.length > 0) {
//             return result;
//         } else {
//             return null;
//         }
//     });
// }

//Offline - not working
// export function ZInitializeOdsService(clientAPI) {
//     return clientAPI.read('/ZSSAM2405_SRM/Services/OdsAssetManager.service', 'TRHeaderSet', [], ''
//     ).then(result => {
//         if (result && result.length > 0) {
//             return result;
//         } else {
//             return null;
//         }
//     });
// }


//Online - not woking
// export function ZInitializeOdsService(clientAPI) {
//     return clientAPI.read('/ZSSAM2405_SRM/Services/com_ods_mwh.service', 'TRHeaderSet', [], ''
//     ).then(result => {
//         if (result && result.length > 0) {
//             return result;
//         } else {
//             return null;
//         }
//     });
// }

//Offline(STD) - not working
// export function ZInitializeOdsService(clientAPI) {
//     return clientAPI.read('/SAPAssetManager/Services/OdsMwh.service', 'TRHeaderSet', [], ''
//     ).then(result => {
//         if (result && result.length > 0) {
//             return result;
//         } else {
//             return null;
//         }
//     });
// }

//Online(STD) - not working
export function ZInitializeOdsService(clientAPI) {
    return clientAPI.read('/SAPAssetManager/Services/OnlineOdsMwh.service', 'TRHeaderSet', [], ''
    ).then(result => {
        if (result && result.length > 0) {
            return result;
        } else {
            return null;
        }
    });
}


// Context - try