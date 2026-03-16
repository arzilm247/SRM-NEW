import userFeaturesLib from '../UserFeatures/UserFeaturesLibrary';
import libCommon from './Library/CommonLibrary';
import libMeter from '../Meter/Common/MeterLibrary';

export default function IsDiscardButtonVisible(context) {
    let pageName = libCommon.getPageName(context);
    if (userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/Meter.global').getValue())) {
        return meterFeatureEnabled(context);
    }
    if (libCommon.IsOnCreate(context) || libCommon.getStateVariable(context, 'MaterialDocNumberBulkUpdate')) {
        return false;
    } else {
        let currentReadLink = context.binding['@odata.readLink'];
        if (context.binding['@odata.type'] !== '#sap_mobile.MyNotificationItem') {
            return handleNotificationItem(context, currentReadLink, pageName);
        } else {
            return context.read('/SAPAssetManager/Services/AssetManager.service', currentReadLink, [], '$expand=ItemActivities,ItemCauses,ItemTasks').then(function(result) {
                return isItemSynced(result, currentReadLink);
            });
        }
    }
}

function meterFeatureEnabled(context) {
    if (libMeter.isProcessed(context.getPageProxy().binding)) {
        if (context.binding['@sap.isLocal']) {
            return Promise.resolve(true);
        } else {
            return context.read('/SAPAssetManager/Services/AssetManager.service', context.binding['@odata.readLink'] + '/Device_Nav', [], '').then(function(result) {
                if (result && result.length > 0) {
                    let entity = result.getItem(0);
                    return Boolean(entity['@sap.isLocal']);
                } else {
                    return false;
                }
            });
        }
    } else {
        return false;
    }
}

function handleNotificationItem(context, currentReadLink, pageName) {
    if (context.binding['@odata.type'] === '#sap_mobile.MyWorkOrderOperation') {
        return context.count('/SAPAssetManager/Services/AssetManager.service', `${currentReadLink}/WOHeader/Operations`, '').then(function(count) {
            return (count > 1) && libCommon.isCurrentReadLinkLocal(currentReadLink);
        });
    } else if (context.binding['@odata.type'] === '#sap_mobile.InboundDeliveryItem' || context.binding['@odata.type'] === '#sap_mobile.OutboundDeliveryItem') {
        return (Object.prototype.hasOwnProperty.call(context.binding, '@sap.isLocal') && context.binding['@sap.isLocal'] && Object.prototype.hasOwnProperty.call(context.binding, '@sap.hasPendingChanges') && context.binding['@sap.hasPendingChanges']);
    } else {
        if ((libCommon.isCurrentReadLinkLocal(currentReadLink)) && (pageName === 'WorkOrderTransfer')) {
            return false;
        }
        return libCommon.isCurrentReadLinkLocal(currentReadLink);
    }
}


function isItemSynced(result, currentReadLink) {
    if (result) {
        result = result.getItem(0);
        const itemProperties = ['ItemCauses', 'ItemTasks', 'ItemActivities'];

        // Check if any Item Tasks, Item Causes or Item Activities are synced (non-local)
        for (let prop of itemProperties) {
            for (let item of result[prop]) {
                if (!libCommon.isCurrentReadLinkLocal(item['@odata.readLink'])) {
                    return false;
                }
            }
        }
    }
    // Deletion is permitted
    return libCommon.isCurrentReadLinkLocal(currentReadLink);
}
