export default function SellectAll(context) {
    const pageProxy = context.getPageProxy();
    const sectionedTable = pageProxy.getControl('SectionedTable0');
    const objectTable = sectionedTable.getSection('SectionObjectTable2');

    if (!objectTable) {
        return;
    }

    const isOn = context.getValue(); // Switch state

    if (isOn) {
        // Select all
        objectTable.selectAllItems();
    } else {
        // Deselect all robustly
        const items = objectTable.getItems();
        if (items && items.length > 0) {
            items.forEach((item, index) => {
                objectTable.deselectItem(index);
            });
        }
    }
    
    //  const pageProxy = context.getPageProxy();

    //     const sectionedTable = pageProxy.getControl('SectionedTable0');
    //     const objectTable = sectionedTable.getSection('SectionObjectTable2');

    //     if (!objectTable) {
    //         return;
    //     }

    //     // ✅ Select all rows
    //     objectTable.selectAllItems();
}
