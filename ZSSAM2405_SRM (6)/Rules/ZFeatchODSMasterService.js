export default function ZFeatchODSMasterService(clientAPI) {
    
    return clientAPI.executeAction(
        '/ZSSAM2405_SRM/Actions/SRM/OData/CreateMasterOnlineOData.action'
    ).then(() => {
        return clientAPI.read(
            '/ZSSAM2405_SRM/Services/OnlineAssetManagerMaster.service',
            'WarehouseNumber',
            [],
            ''
        );

    }).then(result => {
        alert(
            'Master Service:\n\n' +
            JSON.stringify(result)
        );
    });
      
}
