export default function ZTOOtemsSearchQuery2(context) {
    const bindingObject = context.getBindingObject();
    const TRO = bindingObject.TransferOrder;
    const searchText = (context.searchString || '').trim();
    alert(searchText);

    const results = context.read(
        '/ZSSAM2405_SRM/Services/OnlineAssetManager.service',
        'TOItemsSet',
        [],
        `$filter=TransferOrder eq '${TRO}'`
    );

    let items = results.getItems();
    alert(JSON.stringify(items));

    // // 🔥 HARD FILTER by Material
    // if (searchText) {
    //     items = items.filter(item =>
    //         alert(item);
    //         item.Material && item.Material.toString() === searchText
    //     );
    // }

    return items; // bind this to the list

    
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //working - need to check the BE filter logic
    // const bindingObject = context.getBindingObject();
    // const TRO = bindingObject.TransferOrder;

    // const searchText = (context.searchString || '').trim();
    // alert(searchText);

    // if (searchText) {
    //     return `$filter=TransferOrder eq '${TRO}' and Material eq '${searchText}'`;
    //     //$filter=TransferOrder eq '20000' and Material eq '25'
    // }

    // return `$filter=TransferOrder eq '${TRO}'`;

}

