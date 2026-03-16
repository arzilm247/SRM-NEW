export default function ZToScrennBindingTest(context) {
    const bindingObject = context.getBindingObject();
    //alert("bindingObject :" + JSON.stringify(bindingObject));

    // Pretty JSON alert
    alert(
        "ZToScrennBindingTest:\n\n" +
        JSON.stringify(bindingObject, null, 2)
    );
    //const TRO = bindingObject.TransferOrder;

}


// export function GetItems(context,TRO) {
//     return clientAPI.read('/ZSSAM2405_SRM/Services/OnlineAssetManager.service', 'TOItemsSet', [], "$filter=TransferOrder eq '" + TRO + "'").then(function (UserResults) {
//             return ItemsResults.getItem(0);
//         });
// }