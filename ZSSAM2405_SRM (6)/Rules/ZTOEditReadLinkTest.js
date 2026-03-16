export default function ZTOEditReadLinkTest(clientAPI) {
    //alert("ZTOEditReadLinkTest");
    
    const pageProxy = clientAPI.getPageProxy();
    const binding = pageProxy.binding;

    alert("Page Binding:\n" + JSON.stringify(binding));

}
