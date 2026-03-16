
import libLocal from '../../Common/Library/LocalizationLibrary';
import GetMaterialUOM from '../Common/GetMaterialUOM';
import libCom from '../../Common/Library/CommonLibrary';
import GetReceivedQuantity from '../IssueOrReceipt/GetReceivedQuantity';
import Logger from '../../Log/Logger';
export default async function QuantityInBaseUOM(context) {

    let quantity = 0;
    let uom = '';
    let material = '';
    let type = '';
    if (context.binding && context.binding['@odata.type']) {
        type = context.binding['@odata.type'].substring('#sap_mobile.'.length);
    }
    try {
        quantity = libLocal.toNumber(context, context.getPageProxy().getControl('FormCellContainer').getControl('QuantitySimple').getValue());
    } catch (error) {// Non-convertible empty value from input
        Logger.error('QuantityError', error);
    }


    if (context.getPageProxy().getControl('FormCellContainer')) {
        if (type === '') {
            material = libCom.getStateVariable(context, 'Material');
        } else if (type === 'MaterialDocItem') {
            material = context.binding.Material;
        } else {
            material = context.binding.MaterialNum;
        }

        uom = libCom.getListPickerValue(context.getPageProxy().getControl('FormCellContainer').getControl('UOMSimple').getValue());

    } else {
        const properties = updateUOMs(type, context, quantity);
        quantity = properties.quantity;
        uom = properties.uom;
        material = properties.material;
    }
    if (!quantity) {
        quantity = GetReceivedQuantity(context);
    }
    return GetMaterialUOM(context, material, uom).then(TempLine_MaterialUOM => {
        let BaseUOMQuantity = 0;
        if (TempLine_MaterialUOM && TempLine_MaterialUOM.BaseUOM !== uom) {
            BaseUOMQuantity = quantity * TempLine_MaterialUOM.ConversionFactor;
            return `${BaseUOMQuantity} ${TempLine_MaterialUOM.BaseUOM}`;
        } else {
            return `${quantity} ${uom}`;
        }
    });
}

function updateUOMs(type, context, prevQuantity) {
    let uom = '';
    let material = '';
    let quantity = prevQuantity;

    if (type === 'MaterialDocItem') {
        quantity = context.binding.EntryQuantity;
        uom = context.binding.EntryUOM;
        material = context.binding.Material;
    } else if (type === 'PurchaseOrderItem' || type === 'StockTransportOrderItem') {
        quantity = context.binding.OpenQuantity;
        uom = context.binding.OrderUOM;
        material = context.binding.MaterialNum;
    } else if (type === 'ProductionOrderComponent' || type === 'ReservationItem') {
        uom = context.binding.RequirementUOM;
        material = context.binding.MaterialNum;
        quantity = context.binding.EntryQuantity;
    } else if (type === 'ProductionOrderItem') {
        quantity = context.binding.EntryQuantity;
        uom = context.binding.OrderUOM;
        material = context.binding.MaterialNum;
    }
    return { quantity, uom, material };
}
