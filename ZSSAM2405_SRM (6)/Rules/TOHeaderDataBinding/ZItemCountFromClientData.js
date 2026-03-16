export default function ZItemCountFromClientData(context) {
    let binding = context.getPageProxy().getActionBinding();

    let list = binding?.OnlineTRHeaders;

    if (list && list.length > 0) {
        return "Item Count - " + list[0].ItemCount;
    }

    return "Item Count - 0";
}
