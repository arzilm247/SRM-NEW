export default function TestStockLoad(clientAPI) {
    
    alert("Step 1: Testing if MasterService loads MaterialMasterSet...");
    return clientAPI.read(
        '/ZSSAM2405_SRM/Services/MasterService.service',
        'MaterialMasterSet',
        [],
        ''
    ).then(result => {
        if (result && result.length > 0) {
            alert(`✓ MaterialMasterSet has ${result.length} records on MasterService!`);
            return clientAPI.read(
                '/ZSSAM2405_SRM/Services/MasterService.service',
                'StockOverviewSet',
                [],
                ''
            ).then(result2 => {
                if (result2 && result2.length > 0) {
                    alert(`✓ StockOverviewSet has ${result2.length} records!`);
                } else {
                    alert(`MasterService works but StockOverviewSet is empty`);
                }
                return result2;
            });
        } else {
            alert(`MaterialMasterSet is empty on MasterService`);
            return null;
        }
    }).catch(error => {
        alert(`ERROR: Cannot read from MasterService\n\n${error.message}`);
        return null;
    });
}
