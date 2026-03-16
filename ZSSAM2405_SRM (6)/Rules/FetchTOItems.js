export default function FetchTOItems(context) {
      const bindingObject = context.getBindingObject();
      const TransferOrder = bindingObject.TransferOrder;
      alert(TransferOrder);
      alert(JSON.stringify(bindingObject, null, 2));
}
