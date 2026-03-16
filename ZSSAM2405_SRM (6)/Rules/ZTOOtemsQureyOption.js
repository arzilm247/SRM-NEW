export default function ZTOOtemsQureyOption(context) {
    const bindingObject = context.getBindingObject();
    const TRO = bindingObject.TransferOrder;

    // Wrap string in single quotes for OData
    return `'${TRO}'`;
}
