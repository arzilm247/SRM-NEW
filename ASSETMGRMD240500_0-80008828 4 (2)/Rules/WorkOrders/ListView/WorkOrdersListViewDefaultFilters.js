import libCom from '../../Common/Library/CommonLibrary';
import libMobile from '../../MobileStatus/MobileStatusLibrary';
import MyWorkSectionFilterQuery from '../../OverviewPage/MyWorkSection/MyWorkSectionFilterQuery';
import SupervisorLibrary from '../../Supervisor/SupervisorLibrary';

export default async function WorkOrdersListViewDefaultFilters(context) {
    let filters = [];
    const { COMPLETED, STARTED, HOLD, REVIEW, DISAPPROVED, APPROVED, RECEIVED, ACCEPTED, ONSITE, TRAVEL } = libMobile.getMobileStatusValueConstants(context);

    filters.push(context.createFilterCriteria(context.filterTypeEnum.Sorter, 'Priority', undefined, ['Priority'], false, context.localizeText('sort_filter_prefix'), [context.localizeText('priority')]));
    if (libCom.getStateVariable(context, 'KPI-InProgress')) {
        libCom.removeStateVariable(context, 'KPI-InProgress');
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'Started', undefined, [`(OrderMobileStatus_Nav/MobileStatus eq '${STARTED}' or OrderMobileStatus_Nav/MobileStatus eq '${HOLD}')`], true));
    }
    if (libCom.getStateVariable(context, 'KPI-Open')) {
        libCom.removeStateVariable(context, 'KPI-Open');
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'Open', undefined, [`(OrderMobileStatus_Nav/MobileStatus ne '${STARTED}' and OrderMobileStatus_Nav/MobileStatus ne '${HOLD}' and OrderMobileStatus_Nav/MobileStatus ne '${COMPLETED}')`], true));
    }
    if (libCom.getStateVariable(context, 'KPI-Completed')) {
        libCom.removeStateVariable(context, 'KPI-Completed');
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'Completed', undefined, [`OrderMobileStatus_Nav/MobileStatus eq '${COMPLETED}'`], true));
    }
    let myWorkOrderListView = libCom.getStateVariable(context, 'MyWorkOrderListView');
    if (myWorkOrderListView === true) {
        let filter = await MyWorkSectionFilterQuery(context, '');
        return [context.createFilterCriteria(context.filterTypeEnum.Filter, 'PersonnelNum', undefined, [filter], true, context.localizeText('sort_filter_prefix'), [context.localizeText('my_work')])];
    }
    if ((SupervisorLibrary.isSupervisorFeatureEnabled(context)) && context.binding && libCom.isDefined(context.binding.isSupervisorWorkOrdersList)) { 
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'OrderMobileStatus_Nav/MobileStatus', undefined, [REVIEW, DISAPPROVED, APPROVED], false, undefined, [context.localizeText(REVIEW), context.localizeText(DISAPPROVED), context.localizeText(APPROVED)]));
    }
    if (libCom.getStateVariable(context, 'KPI-NotStarted')) {
        libCom.removeStateVariable(context, 'KPI-NotStarted');
        const dateFilter = libCom.getStateVariable(context, 'DATE_FILTER');
        libCom.setStateVariable(context, 'WORKORDER_FILTER', `$filter=${dateFilter}`);
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'NotStarted', undefined, [`(OrderMobileStatus_Nav/MobileStatus eq '${RECEIVED}' or OrderMobileStatus_Nav/MobileStatus eq '${ACCEPTED}') and ${dateFilter}`], true, undefined, [context.localizeText('not_started')]));
    }
    if (libCom.getStateVariable(context, 'KPI-OpenCS')) {
        libCom.removeStateVariable(context, 'KPI-OpenCS');
        const dateFilter = libCom.getStateVariable(context, 'DATE_FILTER');
        libCom.setStateVariable(context, 'WORKORDER_FILTER', `$filter=${dateFilter}`);
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'Open', undefined, [`(OrderMobileStatus_Nav/MobileStatus eq '${RECEIVED}' or OrderMobileStatus_Nav/MobileStatus eq '${ACCEPTED}') and ${dateFilter}`], true, undefined, [context.localizeText('open')]));
    }
    if (libCom.getStateVariable(context, 'KPI-InProgressCS')) {
        libCom.removeStateVariable(context, 'KPI-InProgressCS');
        const dateFilter = libCom.getStateVariable(context, 'DATE_FILTER');
        libCom.setStateVariable(context, 'WORKORDER_FILTER', `$filter=${dateFilter}`);
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'InProgress', undefined, [`(OrderMobileStatus_Nav/MobileStatus eq '${STARTED}' or OrderMobileStatus_Nav/MobileStatus eq '${HOLD}' or OrderMobileStatus_Nav/MobileStatus eq '${TRAVEL}' or OrderMobileStatus_Nav/MobileStatus eq '${ONSITE}') and ${dateFilter}`], true, undefined, [context.localizeText('in_progress')]));
    }
    if (libCom.getStateVariable(context, 'KPI-CompletedCS')) {
        libCom.removeStateVariable(context, 'KPI-CompletedCS');
        const dateFilter = libCom.getStateVariable(context, 'DATE_FILTER');
        libCom.setStateVariable(context, 'WORKORDER_FILTER', `$filter=${dateFilter}`);
        filters.push(context.createFilterCriteria(context.filterTypeEnum.Filter, 'Completed', undefined, [`(OrderMobileStatus_Nav/MobileStatus eq '${COMPLETED}') and ${dateFilter}`], true, undefined, [context.localizeText('completed')]));
    }
    return filters;
}
