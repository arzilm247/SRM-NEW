/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function PI_ListScreenSearchPLaceHolder(clientAPI) {
    const segArr = clientAPI.evaluateTargetPath(
        '#Page:PI_Items/#Control:FormCellSegmentedControl0'
    ).getValue();

    const segmentValue = segArr?.[0]?.ReturnValue;

    switch (segmentValue) {
        case 'Material':
            return 'Search by Material';
        case 'Batch':
            return 'Search by Batch';
        case 'Bin':
            return 'Search by Bin';
        default:
            return 'Search';
    }
}
