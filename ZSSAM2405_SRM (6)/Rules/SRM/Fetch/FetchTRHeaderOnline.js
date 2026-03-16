import ODataDate from '../../../../SAPAssetManager/Rules/Common/Date/ODataDate';
export default function FetchTRHeaderOnline(clientAPI) {
    let TransferOrder = clientAPI
        .evaluateTargetPath('#Page:Search_Transfer_Order/#Control:Document_Number')
        .getValue();
    let warehouseValue = clientAPI
        .evaluateTargetPath('#Page:Search_Transfer_Order/#Control:FormCellListPicker0')
        .getValue();
    let warehouse = '';
    if (Array.isArray(warehouseValue) && warehouseValue.length > 0) {
        warehouse = warehouseValue[0].ReturnValue;
    }
    let FromDate = clientAPI
        .evaluateTargetPath('#Page:Search_Transfer_Order/#Control:Doc_date_from')
        .getValue();
    let ToDate = clientAPI
        .evaluateTargetPath('#Page:Search_Transfer_Order/#Control:Doc_date_to')
        .getValue();
    let Material = clientAPI
        .evaluateTargetPath('#Page:Search_Transfer_Order/#Control:Material')
        .getValue();
    let odataFrom = new ODataDate(FromDate).toLocalDateString(clientAPI);
    let odataTo = new ODataDate(ToDate).toLocalDateString(clientAPI);



    clientAPI.updateProgressBanner("Connecting to SRM Online Service...");

    return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/CreateOnlineOData.action')
        .then(() => {
            if (TransferOrder && TransferOrder.trim() !== '') {
                if (TransferOrder.length > 10) {
                    return Promise.resolve([]);
                }
                return clientAPI.read(
                    '/ZSSAM2405_SRM/Services/ODSMWH.service',
                    'TOHeaderSet',
                    [],
                    "$filter=TransferOrder eq '" + TransferOrder + "'" +
                    " and WarehouseNum eq '" + warehouse + "'" +
                    " and (CreationDate ge datetime'" + odataFrom + "' and CreationDate le datetime'" + odataTo + "')"
                );
            } else {
                return clientAPI.read(
                    '/ZSSAM2405_SRM/Services/ODSMWH.service',
                    'TOHeaderSet',
                    [],
                    "$filter=WarehouseNum eq '" + warehouse + "'" +
                    " and (CreationDate ge datetime'" + odataFrom + "' and CreationDate le datetime'" + odataTo + "')"

                );
            }
        })
        .then(result => {
            if (result && result.length > 0) {
                let appClientData = clientAPI.getAppClientData();
                appClientData.Material = Material;
                appClientData.TOHeaderList = [];

                for (let i = 0; i < result.length; i++) {
                    appClientData.TOHeaderList.push(result.getItem(i));
                }
                appClientData.FilteredTOHeaderList = [...appClientData.TOHeaderList];
                return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/NavTo_ODSOnlineServicePage.action');
            } else {
                return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/ZTOHeaderNotFound.action');
            }
        })
        .catch(err => {
            return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/OdsOnlineServiceDownMessage.action');
        });
}
