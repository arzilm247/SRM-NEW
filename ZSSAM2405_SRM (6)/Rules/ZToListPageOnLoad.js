export default function ZToListPageOnLoad(clientAPI) {
    alert("On List");
    let binding = clientAPI.getActionBinding();
    alert(JSON.stringify(binding));

    if (binding && binding.TOData) {
        alert("Received TO Data: " + JSON.stringify(binding.TOData));

        // Set page binding so controls can use it
        clientAPI.setPageBinding({
            TOData: binding.TOData
        });
    } else {
        alert("No data received");
    }
   
   
}

