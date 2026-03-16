import { IsBulkConfirmationSignatureRequired, ResetBulkConfirmationSignatureFlow, RunBulkConfirmationSignatureFlow } from './BulkConfirmationLibrary';
import WorkOrderOperationsConfirmation from './WorkOrderOperationsConfirmation';
import Logger from '../../Log/Logger';

export default function StartBulkConfirmationProcess(context) {
    return context.executeAction('/SAPAssetManager/Actions/Page/ClosePage.action').then(() => {
        if (IsBulkConfirmationSignatureRequired(context)) {
            return RunBulkConfirmationSignatureFlow(context)
                .catch(() => {
                    ResetBulkConfirmationSignatureFlow(context);
                    Logger.info('User rejected a mandatory signature');
                });
        }

        return WorkOrderOperationsConfirmation(context);
    });
}
