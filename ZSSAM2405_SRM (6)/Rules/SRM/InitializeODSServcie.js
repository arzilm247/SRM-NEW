export default function InitializeODSServcie(clientAPI) {
    // return clientAPI.read('/ZSSAM2405_SRM/Services/com_ods_mwh.service', 'TRHeaderSet', [], '')
    //     .then(result => {

    //         if (result && result.length > 0) {
    //             const item = result.getItem(0);
    //             alert("TRResults : " + JSON.stringify(item));
    //         }

    //         alert("No TRHeaderSet data found");
    //         return "";
    //     })
    //     .catch(error => {
    //         alert("Error fetching TRHeaderSet: ", error);
    //         return "";
    //     });

    return clientAPI.read(
        '/ZSSAM2405_SRM/Services/OdsAssetManager.service',
        'TRHeaderSet',
        [],
        ''
    ).then(result => {

        alert("SUCCESS Count = " + result.length);
        alert("First item: " + JSON.stringify(result.getItem(0)));

        return result.getItem(0).WarehouseNum;

    }).catch(error => {

        alert("DEBUG ERROR DETAILS → " + JSON.stringify(error));
        throw error;  // show real error in console
    });
}
