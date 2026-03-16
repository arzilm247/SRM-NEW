export default function ZMasterServiceTest1(clientAPI) {
      return clientAPI.read(
        '/ZSSAM2405_SRM/Services/OnlineAssetManager.service',
        'TOHeaderSet',
        []
    ).then(results => {
        if (results && results.length > 0) {
            const creationDate = results.getItem(0).CreationDate;
            alert("CreationDate from backend: " + creationDate);
        } else {
            alert("No records found.");
        }
    }).catch(err => {
        alert("Error reading TOHeaderSet: " + err);
    });
}
