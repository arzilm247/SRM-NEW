export default function TriggerTROnlineSearch(context) {
    // let searchString = libCom.getStateVariable(context, 'SearchStringOnline'); //change 
    // let downloadStarted = libCom.getStateVariable(context, 'DownloadIMDocsStarted');//cnage 
    // if (libCom.isDefined(searchString) && context._page 
    //     && libCom.getPageName(context) !== 'FetchDocumentsPage' && libCom.getPageName(context) !== 'FetchOnlineDocumentsPage') {
    //     libCom.setStateVariable(context, 'DocumentID', searchString);
    //     //only keep id
    // }
    // let customQuery = inventoryObjectsQueryOptions(context);// for this qurey option take if from previues page
    // if (!downloadStarted) {
    //     return customQuery.build().then(options => {
    //         return context.count('/ZSSAM2405_SRM/Services/OnlineAssetManager.service', 'TOHeaderSet', options).then(count => {
    //             switch (count) {
    //                 case 0:
    //                     return context.executeAction({
    //                         'Name': '/SAPAssetManager/Actions/SyncErrorBannerMessage.action',
    //                         'Properties': {
    //                             'Message': context.localizeText('no_documents_found_on_online_search'),
    //                         },
    //                     });
    //                 case 1:
    //                     return context.read('/ZSSAM2405_SRM/Services/OnlineAssetManager.service', 'TOHeaderSet', [], options).then(data => {
    //                         if (data.length === 1) {
    //                             let item = data.getItem(0);
    //                             let documents = [];
    //                             let document = Object();
    //                             document.ObjectId = item.ObjectId; // change as TransferOrder
    //                             document.OrderId = item.OrderId; // cnagee WarehouseNum
    //                             document.IMObject = item.IMObject; // change MatDocNum
    //                             documents[0] = document;
    //                             libCom.setStateVariable(context, 'Documents', documents);
    //                             libCom.setStateVariable(context, 'DownloadIMDocsStarted', true);
    //                             return DownloadDocuments(context, 0);
    //                         }
    //                         return false;
    //                     });
    //                 default: {
    //                     context.executeAction('/ZSSAM2405_SRM/Actions/Inventory/StockRoom/Fetch/FetchDocumentsOnline.action');
    //                     //return true to close progress banner message
    //                     return true;
    //                 }
    //             } 
    //         });
    //     });
    // }
}
