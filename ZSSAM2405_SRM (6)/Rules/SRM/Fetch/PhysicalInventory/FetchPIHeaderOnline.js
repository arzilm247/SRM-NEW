import ODataDate from '../../../../../SAPAssetManager/Rules/Common/Date/ODataDate';
export default function FetchTRHeaderOnline(clientAPI) {

   let PhyInvDoc = clientAPI
        .evaluateTargetPath('#Page:SearchInventoryDocument/#Control:DocumentNumber')
        .getValue();

        // alert(PhyInvDoc);
    let warehouseValue = clientAPI
        .evaluateTargetPath('#Page:SearchInventoryDocument/#Control:WarehouseNo')
        .getValue();
        // alert(JSON.stringify(warehouseValue));

    let FromDate = clientAPI
        .evaluateTargetPath('#Page:SearchInventoryDocument/#Control:DocDateFrom')
        .getValue();
        // alert(JSON.stringify(FromDate));

    let ToDate = clientAPI
        .evaluateTargetPath('#Page:SearchInventoryDocument/#Control:DocDateTo')
        .getValue();
        // alert(JSON.stringify(ToDate));

    let warehouse = '';

    if (Array.isArray(warehouseValue) && warehouseValue.length > 0) {
        warehouse = warehouseValue[0].ReturnValue;
    }

    let odataFrom = new ODataDate(FromDate).toLocalDateString(clientAPI);
    let odataTo   = new ODataDate(ToDate).toLocalDateString(clientAPI);

    clientAPI.updateProgressBanner("Connecting to SRM Online Service...");

    return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/CreateOnlineOData.action')
        .then(() => {
            if (PhyInvDoc && PhyInvDoc.trim() !== '') {
                if (PhyInvDoc.length > 10) {
                    return Promise.resolve([]);
                }
                return clientAPI.read(
                    '/ZSSAM2405_SRM/Services/ODSMWH.service',
                    'WMPhyHeadSet',
                    [],
                    "$filter=PhyInvDoc eq '" + PhyInvDoc + "'" +
                    " and Warehouse eq '" + warehouse + "'" +
                    " and (PlanCountDate ge datetime'" + odataFrom + "' and PlanCountDate le datetime'" + odataTo + "')"
                );
            } else {
                return clientAPI.read(
                    '/ZSSAM2405_SRM/Services/ODSMWH.service',
                    'WMPhyHeadSet',
                    [],
                    "$filter=Warehouse eq '" + warehouse + "'" +
                    " and (PlanCountDate ge datetime'" + odataFrom + "' and PlanCountDate le datetime'" + odataTo + "')"

                );
            }
        })
        .then(result => {
            if (result && result.length > 0) {
                // alert(JSON.stringify(result));
                let appClientData = clientAPI.getAppClientData();
                appClientData.TOHeaderList = [];

                for (let i = 0; i < result.length; i++) {
                    appClientData.TOHeaderList.push(result.getItem(i));
                }
                appClientData.FilteredTOHeaderList = [...appClientData.TOHeaderList];
                return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/Nav_TO_Pl_list_page.action');
            } else {
                return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/ZTOHeaderNotFound.action');
            }
        })
        .catch(err => {
            return clientAPI.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/OdsOnlineServiceDownMessage.action');
        });
}
