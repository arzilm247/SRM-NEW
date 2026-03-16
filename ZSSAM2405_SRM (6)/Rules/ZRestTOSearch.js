/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZRestTOSearch(clientAPI) {
    // const pageProxy = clientAPI.getPageProxy();

    // // 1️⃣ Clear Document Number
    // const docNumber = pageProxy.getControl('SectionFormCell0')
    //     .getControl('Document_Number');
    // docNumber.setValue('');

    // // 2️⃣ Reset List Picker to default value 'OD1'
    // const plantPicker = pageProxy.getControl('SectionFormCell0')
    //     .getControl('FormCellListPicker0');
    // plantPicker.setValue(['OD1']); // MUST be array for multi-select

    // // 3️⃣ Reset Doc date from (use your existing rule)
    // const docDateFrom = pageProxy.getControl('SectionFormCell0')
    //     .getControl('Doc_date_from');

    // return clientAPI.executeAction({
    //     "Name": "/ZSSAM2405_SRM/Rules/ZGetFromDate.js"
    // }).then(fromDate => {
    //     docDateFrom.setValue(fromDate);

    //     // 4️⃣ Set Doc date to current date
    //     const docDateTo = pageProxy.getControl('SectionFormCell0')
    //         .getControl('Doc_date_to '); // keep space if exists in metadata

    //     docDateTo.setValue(new Date());

    // });
}
