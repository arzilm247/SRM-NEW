export default function DeSelectAllItems(context) {
    const pageProxy = context.getPageProxy();
    const table = pageProxy.getControl('SectionedTable0');
    const section = table.getSection('SectionObjectTable2');

    if (!section) {
        return;
    }

    section.getSelectedItems().forEach(item => {
        section.setSelectedItem(item, false);
    });
}
