export default function GetTRWarehouseNum(context) {
     return clientAPI.read('/ZSSAM2405_SRM/Services/OdsAssetManager.service', 'TRHeaderSet', [], '')
        .then(result => {

            if (result && result.length > 0) {
                const item = result.getItem(0);
                alert("TRResults : " + JSON.stringify(item));
            }

            alert("No TRHeaderSet data found");
            return "";
        })
        .catch(error => {
            alert("Error fetching TRHeaderSet: ", error);
            return "";
        });
}
