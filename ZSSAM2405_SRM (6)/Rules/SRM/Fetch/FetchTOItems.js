export default function FetchTOItems(context) {
    const bindingObject = context.getBindingObject();
    const TransferOrder = bindingObject.TransferOrder;
    // alert(TransferOrder);
    // alert(JSON.stringify(bindingObject, null, 2));

    // const TOItemsSetResults = context.read('/ZSSAM2405_SRM/Services/OnlineAssetManager.service', 'TOItemsSet', [], "$filter=TransferOrder eq '" + TransferOrder + "'");
    // alert("TOItemsSetResults : " + JSON.stringify(TOItemsSetResults.getItem(0)));

 
    return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/OData/CreateOnlineOData.action')
        .then(() => {
            return context.read(
                '/ZSSAM2405_SRM/Services/OnlineAssetManager.service',
                'TOItemsSet',
                [],
                `$filter=TransferOrder eq '${TransferOrder}'`
            );
        })
        .then(TOItemsSetResults => {
            if (TOItemsSetResults && TOItemsSetResults.length > 0) {
                alert("TOItemsSetResults : " + JSON.stringify(TOItemsSetResults.getItem(0)));
            }
        });
}
