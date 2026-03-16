export default function SetFastFilters(pageProxy) {
     // Only display filters, no functionality needed
    let filterBar = pageProxy.getControl('FastFilters');

    // Clear existing filters first
    filterBar.clearFilters();

    // Add filters for display purposes
    filterBar.addFilter('Sort: Plant', 'Plant');
    filterBar.addFilter('Sort: Work Center', 'WorkCenter');
    filterBar.addFilter('MACHINE1', 'MACHINE1');
    filterBar.addFilter('Pending Sync', 'PendingSync');

    return true;
}
