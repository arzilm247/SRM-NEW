import triggerTROnlineSearch from './TriggerTROnlineSearch';

export default function FetchTRDocumentsWithActivityIndicator(context) {
    // let pageProxy = context.getPageProxy();
    // let clientData = pageProxy.getClientData();
    // let downloadStarted = clientData.DownloadIMDocsStarted;

    // if (!downloadStarted) {
    //     clientData.DownloadIMDocsStarted = true;
    //     pageProxy.showActivityIndicator('Initializing online service...');
    //     let documentID = pageProxy.evaluateTargetPath('#Page:FetchDocumentsPage/#Control:DocumentId').getValue();
    //     //alert(documentID);

    //     return pageProxy.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/CreateOnlineOData.action')
    //         .then(() => {
    //             pageProxy.evaluateTargetPathForAPI('#Page:InventoryOverview')
    //                 .getClientData().TRDocuments = [];

    //             if (documentID && documentID.trim() !== '') {
    //                 return context.read(
    //                     '/ZSSAM2405_SRM/Services/OnlineAssetManager.service',
    //                     'TOHeaderSet',
    //                     [],
    //                     `$filter=TransferOrder eq '${documentID}'`
    //                 ).then(result => {
    //                     pageProxy.evaluateTargetPathForAPI('#Page:InventoryOverview')
    //                         .getClientData().TRDocuments = result;
    //                     return result;
    //                 });
    //             } else {
    //                 return context.read(
    //                     '/ZSSAM2405_SRM/Services/OnlineAssetManager.service',
    //                     'TOHeaderSet',
    //                     []
    //                 ).then(result => {
    //                     pageProxy.evaluateTargetPathForAPI('#Page:InventoryOverview')
    //                         .getClientData().TRDocuments = result;
    //                     return result;
    //                 });
    //             }
    //         })
    //         .catch(() => {
    //             return pageProxy.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/OdsOnlineServiceDownMessage.action');
    //         })
    //         .finally(() => {
    //             pageProxy.dismissActivityIndicator();
    //             clientData.DownloadIMDocsStarted = false;
    //         });
    // }

    // return Promise.resolve();




    //working
    let downloadStarted = context.getPageProxy().getClientData().DownloadIMDocsStarted;

    if (!downloadStarted) {
        context.getPageProxy().getClientData().DownloadIMDocsStarted = true;
        context.showActivityIndicator('Initializing online service...');

        return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/CreateOnlineOData.action')
            .then(() => {
                context.evaluateTargetPathForAPI('#Page:InventoryOverview')
                    .getClientData().TRDocuments = [];

                //return triggerTROnlineSearch(context);
                 return context.executeAction('/ZSSAM2405_SRM/Actions/Inventory/StockRoom/Fetch/FetchDocumentsOnline.action');
            })
            .catch((err) => {
                Logger.error(`Failed to initialize Online OData Service: ${err}`);
                return context.executeAction(
                    '/ZSSAM2405_SRM/Actions/SRM/OData/OdsOnlineServiceDownMessage.action'
                );
            })
            .finally(() => {
                context.dismissActivityIndicator();
                context.getPageProxy().getClientData().DownloadIMDocsStarted = false;
            });
    }

    return Promise.resolve();
}
