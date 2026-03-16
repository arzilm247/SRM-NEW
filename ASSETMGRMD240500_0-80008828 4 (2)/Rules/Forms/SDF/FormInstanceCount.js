import FormInstanceListQueryOptions from './FormInstanceListQueryOptions';
/**
 * 
 * @param {IClientAPI} clientAPI 
 * @returns {Promise<number>}
 */
export default function FormInstanceCount(clientAPI, checkMandatory = false) {
    const pageProxy = clientAPI.getPageProxy();
    const queryOptions = FormInstanceListQueryOptions(pageProxy, true, checkMandatory);
    
    return clientAPI.count('/SAPAssetManager/Services/AssetManager.service', `${pageProxy.binding['@odata.readLink']}/DynamicFormLinkage_Nav`, queryOptions);
}
