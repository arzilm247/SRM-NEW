export default function ZSegmentOnvalueChange(clientAPI) {
    // Redraw the search control so the placeholder rule is re-evaluated
    clientAPI.getPageProxy().redraw();
}
