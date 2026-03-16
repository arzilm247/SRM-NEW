export default function PhysicalInventoryUpdateProperties(clientAPI) {
    let qtyControl = clientAPI.evaluateTargetPath('#Control:Qty');
    let qtyValue = qtyControl.getValue();
    
    // Ensure the value is treated as a number
    let countedQty = Number(qtyValue);
    
    let zeroCount = false;
    if (countedQty === 0) {
        zeroCount = true;
    }
    
    return {
        "CountedQty": countedQty,
        "ZeroCount": zeroCount
    };
}
