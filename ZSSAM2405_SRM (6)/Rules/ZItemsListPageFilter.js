export default function ZItemsListPageFilter(clientAPI) {
    const searchString = (clientAPI.searchString || '').trim().toLowerCase();
    const appClientData = clientAPI.getAppClientData();
    const allItems = appClientData.AllItemsList || [];


    if (!searchString) {
        appClientData.FilteredItemsList = allItems;
        return allItems;
    }
    const segValue = clientAPI
        .evaluateTargetPath(
            '#Page:TO_Item_Details_Screen/#Control:FormCellSegmentedControl0'
        )
        .getValue();
    const segmentValue = segValue?.[0]?.ReturnValue || 'Material';

    const filteredList = allItems.filter(item => {
        switch (segmentValue) {
            case 'Batch':
                return item.Batch && item.Batch.toString().toLowerCase().includes(searchString);
            case 'Bin':
                return item.DestStorBin && item.DestStorBin.toString().toLowerCase().includes(searchString);
            case 'Material':
            default:
                return item.Material && item.Material.toString().toLowerCase().includes(searchString);
        }
    });

    appClientData.FilteredItemsList = filteredList;
    return filteredList;
}





