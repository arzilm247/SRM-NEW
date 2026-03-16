import ToolbarRefresh from '../../Common/DetailsPageToolbar/ToolbarRefresh';
import Logger from '../../Log/Logger';
import ProgressTrackerOnDataChanged from '../../TimelineControl/ProgressTrackerOnDataChanged';
import WorkOrderDetailsToolbarVisibility from './WorkOrderDetailsToolbarVisibility';
import QABRedrawExtension from '../../QAB/QABRedrawExtension';

export default function WorkOrderDetailsOnPageReturning(context) {
    QABRedrawExtension(context);

    // Redraw EDT section for new meter list section only
    const newMeterListUninstallSection = context.getPageProxy()
        .getControl('SectionedTable').getSection('NewMeterListUninstallSection');
    newMeterListUninstallSection?.redraw();

    return ToolbarRefresh(context).then(() => {
        return WorkOrderDetailsToolbarVisibility(context).then(visibility => {
            try {
                context.getToolbar().setVisible(visibility);
            } catch (error) {
                Logger.error('Toolbar visibility', error);
            }
            return ProgressTrackerOnDataChanged(context).then(() => {
                return context.redraw();
            });
        });
    });
}
