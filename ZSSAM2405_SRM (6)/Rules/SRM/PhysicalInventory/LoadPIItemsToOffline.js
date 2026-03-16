import libVal from '../../Common/Library/ValidationLibrary';
import logger from '../../Log/Logger';

/**
 * Load Physical Inventory items from online service to offline cache
 * @param {IClientAPI} context
 */
export default async function LoadPIItemsToOffline(context) {
    try {
        const bindingObject = context.getBindingObject();
        const piDoc = bindingObject.PhyInvDoc;
        
        if (libVal.evalIsEmpty(piDoc)) {
            logger.error('LoadPIItemsToOffline', 'PhyInvDoc not found in binding');
            return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/LoadPIItemsFailureMessage.action');
        }

        // Read PI items from online service
        const onlineItems = await context.read(
            '/ZSSAM2405_SRM/Services/ODSMWH.service',
            'WMPhyItemsSet',
            [],
            `$filter=PhyInvDoc eq '${piDoc}'`
        );

        if (libVal.evalIsEmpty(onlineItems) || onlineItems.length === 0) {
            logger.info('LoadPIItemsToOffline', 'No items found for PI: ' + piDoc);
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
                logger.info('LoadPIItemsToOffline', 'Item already exists or cannot be created: ' + createError.message);
            }
        }

        logger.info('LoadPIItemsToOffline', 'Successfully loaded ' + onlineItems.length + ' items to offline cache');
        
        // Navigate to edit screen after successful load
        return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/NavTo_ItemEditScreen.action');

    } catch (error) {
        logger.error('LoadPIItemsToOffline', 'Error loading PI items: ' + error.message);
        return context.executeAction('/ZSSAM2405_SRM/Actions/SRM/PhysicalInventory/LoadPIItemsFailureMessage.action');
    }
}
