import IsNewLayoutEnabled from '../../Common/IsNewLayoutEnabled';
import libCommon from '../../Common/Library/CommonLibrary';
import libMeter from '../../Meter/Common/MeterLibrary';
import IsMeterTakeReadingFlow from './NewDesign/IsMeterTakeReadingFlow';

export default function MeterCreateUpdateChangeSet(context) {
    let meterTransactionType = getMeterTransactionType(context);
    setBatchEquipmentNum(context);

    const IsNewLayout = IsNewLayoutEnabled(context);
    const REMOVE = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/RemoveMeterType.global').getValue();
    const INSTALL = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/InstallMeterType.global').getValue();
    const REPLACE = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/ReplaceMeterType.global').getValue();
    const INSTALL_EDIT = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/InstallEditMeterType.global').getValue();
    const REMOVE_EDIT = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/RemoveEditMeterType.global').getValue();
    const REPLACE_EDIT = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/ReplaceEditMeterType.global').getValue();
    const REP_INST_EDIT = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/ReplaceInstallEditMeterType.global').getValue();
    const REP_INST = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/ReplaceInstallMeterType.global').getValue();
    
    switch (meterTransactionType) {
        case INSTALL: {
            if (IsNewLayout) {
                return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/NewDesign/MeterInstallChangeset.action');
            }
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterInstallChangeset.action');
        }
        case REP_INST: {
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterInstallChangeset.action');
        }
        case INSTALL_EDIT: {
            context.getClientData().BatchEquipmentNum = context.binding.BatchEquipmentNum;

            if (IsNewLayout) {
                return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/NewDesign/MeterUpdateNoISULinkChangeset.action');
            }
            // Edit mode, need to remove the current OrderISULink first then create new one
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterOrderISULinkDelete.action').then(() => {
                //run the change set update
                return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterUpdateChangeset.action');
            });
        }
        case REP_INST_EDIT: {
            context.getClientData().BatchEquipmentNum = context.binding.BatchEquipmentNum;
            // Edit mode, need to remove the current OrderISULink first then create new one
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterOrderISULinkDelete.action').then(() => {
                //run the change set update
                return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterUpdateChangeset.action');
            });
        }
        case REMOVE: {
            if (IsNewLayout) {
                return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/NewDesign/MeterUninstallChangeset.action');
            }
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterRemoveChangeset.action');
        }
        case REPLACE: {
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterRemoveChangeset.action');
        }
        case REMOVE_EDIT: {
            if (IsNewLayout) {
                return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/NewDesign/MeterUpdateRemoveChangeset.action');
            }
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterUpdateRemoveChangeset.action');
        }
        case REPLACE_EDIT: {
            return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/MeterUpdateRemoveChangeset.action');
        }
        default: {
            if (IsMeterTakeReadingFlow(context)) {
                return context.executeAction('/SAPAssetManager/Actions/Meters/CreateUpdate/NewDesign/MeterUpdateReadings.action');
            }
        }
    }

    return '';
}

function getMeterTransactionType(context) {
    let transactionType = libMeter.getMeterTransactionType(context);
    if (context.evaluateTargetPathForAPI('#Page:-Previous').getClientData().FromErrorArchive || context.evaluateTargetPathForAPI('#Page:-Previous').getClientData().ErrorObject) {
        transactionType = context.binding.ISUProcess + '_EDIT';
    }
    return transactionType;
}

function setBatchEquipmentNum(context) {
    let meterControl = libCommon.getTargetPathValue(context, '#Control:MeterLstPkr/#Value');
    context.binding.BatchEquipmentNum = libCommon.getListPickerValue(meterControl);
}
