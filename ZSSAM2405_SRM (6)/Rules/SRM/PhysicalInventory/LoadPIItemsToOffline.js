// Note: SAPAssetManager imports (ValidationLibrary, Logger) were removed from this file
// because they are not available during local extension build compilation.
/**
 * Load Physical Inventory items from online service to offline cache
 * @param {IClientAPI} context
 */
export default async function LoadPIItemsToOffline(context) {
    try {
        const bindingObject = context.getBindingObject();
        const piDoc = bindingObject.PhyInvDoc;
        
        if (!piDoc) {
            console.error('LoadPIItemsToOffline: PhyInvDoc not found in binding');
            return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/LoadPIItemsFailureMessage.action');
        }

        // Read PI items from online service
        const onlineItems = await context.read(
            '/ZSSAM2405_SRM/Services/ODSMWH.service',
            'WMPhyItemsSet',
            [],
            `$filter=PhyInvDoc eq '${piDoc}'`
        );

        if (!onlineItems || onlineItems.length === 0) {
            console.info('LoadPIItemsToOffline: No items found for PI: ' + piDoc);
            // Still navigate even if no items
            return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/NavTo_ItemEditScreen.action');
        }

        // Create/update items in offline cache
        for (let i = 0; i < onlineItems.length; i++) {
            const item = onlineItems.getItem(i);
            
            try {
                // Try to create the item in offline cache
                await context.create(
                    '/ZSSAM2405_SRM/Services/ODSMWHOffline.service',
                    'WMPhyItemsSet',
                    item
                );
            } catch (createError) {
                // If create fails, item might already exist - continue
                console.info('LoadPIItemsToOffline: Item already exists or cannot be created: ' + createError.message);
            }
        }

        console.info('LoadPIItemsToOffline: Successfully loaded ' + onlineItems.length + ' items to offline cache');
        
        // Navigate to edit screen after successful load
        return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/NavTo_ItemEditScreen.action');

    } catch (error) {
        console.error('LoadPIItemsToOffline: Error loading PI items: ' + error.message);
        return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/LoadPIItemsFailureMessage.action');
    }
}
