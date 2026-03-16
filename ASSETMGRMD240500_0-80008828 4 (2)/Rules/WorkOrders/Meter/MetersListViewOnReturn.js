import libMeter from '../../Meter/Common/MeterLibrary';

export default function MetersListViewOnReturn(context) {
    let action = '/SAPAssetManager/Actions/Meters/ClosePageReconnect.action';
    context.evaluateTargetPathForAPI('#Page:-Previous').setActionBarItemVisible(0, false);
    
    if (libMeter.getISUProcess(context.binding.OrderISULinks) === 'DISCONNECT') {
        action = '/SAPAssetManager/Actions/Meters/ClosePageDisconnect.action';
    }

    return context.executeAction(action);
}
