export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _com_ods_mwh = context.executeAction('/ZSSAM2405_SRM/Actions/com_ods_mwh/Service/InitializeOnline.action');
    let _master_service = context.executeAction('/ZSSAM2405_SRM/Actions/OData/InitializeMasterOfflineOData.action');

    //You can add more service initialize actions here

    return Promise.all([_com_ods_mwh, _master_service]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization message to the user
        return context.executeAction({
            "Name": "/ZSSAM2405_SRM/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}