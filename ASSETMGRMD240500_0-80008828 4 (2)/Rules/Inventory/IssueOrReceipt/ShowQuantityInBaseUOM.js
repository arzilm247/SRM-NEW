/**
* This function determines if UOM field is to be shown or not in Goods Issue/Receipt screen
* @param {IClientAPI} context
*/
import GetUOM from './GetUOM';
import QuantityInBaseUOM from './QuantityInBaseUOM';
import libCom from '../../Common/Library/CommonLibrary';
export default function ShowQuantityInBaseUOM(context) {
    let OrderUOM = '';
    const UOMSimple = context.getPageProxy().getControl('FormCellContainer');
    if (context.binding) {
        const type = context.binding['@odata.type'].substring('#sap_mobile.'.length);
        if (type === 'InboundDeliveryItem' || type === 'OutboundDeliveryItem') {
            return Promise.resolve(false);
        }
    }
    if (UOMSimple) {
        OrderUOM = libCom.getListPickerValue(UOMSimple.getControl('UOMSimple').getValue());
    }
    if (!OrderUOM) {
        OrderUOM = GetUOM(context);
    }
    return QuantityInBaseUOM(context).then(result => {
        const [, entryUOM] = decodeUOM(result);
        return (entryUOM !== OrderUOM);
    });

}

export function decodeUOM(quantityString) {
    const matched = quantityString.match(/(\S*) (\S*)/);
    return matched ? matched.splice(1) : ['', ''];
}



