export default async function ZBindTOandItems(context) {
    const bindingObject = context.getBindingObject();
    const TRO = bindingObject.TransferOrder;

    const itemsResult = await GetItems(context, TRO);

    const items = [];
    for (let i = 0; i < itemsResult.length; i++) {
        items.push(itemsResult.getItem(i));
    }

    // Create combined binding object
    const actionBinding = {
        TransferOrderHeader: bindingObject,
        TransferOrderItems: items
    };

    //alert("ZBindTOandItems:\n" + JSON.stringify(actionBinding, null, 2));

    context.setActionBinding(actionBinding);

    const pageProxy = context.getPageProxy();
    if (pageProxy) {
        pageProxy.setActionBinding(actionBinding);
        return context.executeAction(
            '/ZSSAM2405_SRM/Actions/SRM/TranferOrder/NavTo_ToScreen.action'
        );
    }

    return null;

}


export async function GetItems(context, TRO) {
    const ItemsResults = await context.read(
        '/ZSSAM2405_SRM/Services/OnlineAssetManager.service',
        'TOItemsSet',
        [],
        `$filter=TransferOrder eq '${TRO}'`
    );

    // alert("ItemsResults : " + JSON.stringify(ItemsResults.getItem(0)));
    return ItemsResults;
}
