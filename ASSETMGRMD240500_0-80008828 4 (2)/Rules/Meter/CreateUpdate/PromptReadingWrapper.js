import ExecuteActionWithAutoSync from '../../ApplicationEvents/AutoSync/ExecuteActionWithAutoSync';
import IsNewLayoutEnabled from '../../Common/IsNewLayoutEnabled';
import MeterLibrary from '../Common/MeterLibrary';
import NewMeterSectionLibrary from '../Common/NewMeterSectionLibrary';
import PromptReading from '../PromptReading';
import { replaceMeterWithInstallation } from './MeterReplaceInstall';

export default function PromptReadingWrapper(context) {
    const { REPLACE, REP_INST } = NewMeterSectionLibrary.getMeterISOConstants(context);
    let meterTransactionType = MeterLibrary.getMeterTransactionType(context);

    if (meterTransactionType === REP_INST) {
        replaceMeterWithInstallation(context, context.binding.EquipmentNum, context.binding.BatchEquipmentNum);
    }

    if (IsNewLayoutEnabled(context) && meterTransactionType !== REPLACE) {
        return showToastMessage(context);
    }
    return PromptReading(context);
}

function showToastMessage(context) {
    let meterTransactionType = MeterLibrary.getMeterTransactionType(context);
    let messageText = context.localizeText('meter_updated');

    const INSTALL = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/InstallMeterType.global').getValue();
    const REMOVE = context.getGlobalDefinition('/SAPAssetManager/Globals/Meter/RemoveMeterType.global').getValue();

    if (meterTransactionType === INSTALL) {
        messageText = context.localizeText('meter_installed');
    } else if (meterTransactionType === REMOVE) {
        messageText = context.localizeText('meter_uninstalled');
    } 

    return ExecuteActionWithAutoSync(context, {
        'Name': '/SAPAssetManager/Actions/Meters/CreateUpdate/NewDesign/MeterUpdatedToastMessage.action',
        'Properties': {
            'Message': messageText,
        },
    });
}
