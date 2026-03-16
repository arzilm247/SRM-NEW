export default function NewMeterListSelectVisible(clientAPI) {
    return clientAPI.getPageProxy().getControl('SectionedTable')?.getSections()[0].getSelectionMode() !== 'Multiple';
}
