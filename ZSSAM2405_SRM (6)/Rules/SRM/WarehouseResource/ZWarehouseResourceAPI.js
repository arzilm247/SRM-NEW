/**
 * ZWarehouseResourceAPI.js
 * API layer for SAP Warehouse Resource (A2X OData V4) operations.
 * Uses MDK-native context.create() — NOT fetch() or XMLHttpRequest,
 * which are not available in the MDK JSCore runtime.
 *
 * The BTP Destination "ODSMWH" (or the relevant A2X destination) must be
 * configured in SAP Mobile Services and referenced via a .service file.
 * Credentials are managed by the BTP destination — NOT hardcoded here.
 */

const SERVICE_PATH = '/ZSSAM2405_SRM/Services/ODSMWH.service';
const ENTITY_SET   = 'WarehouseResource';

/**
 * Creates a Warehouse Resource entity in the SAP S/4HANA Public Cloud backend.
 *
 * @param {IClientAPI} clientAPI   - MDK clientAPI/context passed from the calling rule
 * @param {{ EWMWarehouse: string, EWMResource: string }} payload - The fields to create
 * @returns {Promise<void>}
 */
export async function createWarehouseResource(clientAPI, payload) {
    // Validate required fields before sending
    if (!payload.EWMWarehouse || !payload.EWMResource) {
        throw new Error('EWMWarehouse and EWMResource are both required.');
    }

    try {
        // MDK-native OData V4 create — runs through the BTP destination config,
        // handles CSRF token and session cookies automatically.
        const result = await clientAPI.create(
            SERVICE_PATH,
            ENTITY_SET,
            payload,
            {} // Additional headers if needed (e.g. sap-client)
        );

        return result;

    } catch (err) {
        // Attempt to extract SAP OData V4 error message from the error payload
        let errorMessage = String(err && err.message ? err.message : err);

        // SAP OData V4 wraps errors in err.responseBody or err.error
        if (err && err.responseBody) {
            try {
                const body = (typeof err.responseBody === 'string')
                    ? JSON.parse(err.responseBody)
                    : err.responseBody;

                if (body && body.error && body.error.message) {
                    errorMessage = body.error.message;
                }
            } catch (_) {
                // ignore JSON parse errors — keep original message
            }
        }

        throw new Error(errorMessage);
    }
}

/**
 * Reads all warehouse resources for a given warehouse number.
 * Useful for verifying creation or populating a list screen.
 *
 * @param {IClientAPI} clientAPI
 * @param {string} warehouseNum
 * @returns {Promise<Array>}
 */
export async function fetchWarehouseResources(clientAPI, warehouseNum) {
    const filter = warehouseNum
        ? `$filter=EWMWarehouse eq '${warehouseNum.replace(/'/g, "''")}'`
        : '';

    try {
        const results = await clientAPI.read(
            SERVICE_PATH,
            ENTITY_SET,
            [],
            filter
        );
        return results || [];
    } catch (err) {
        console.error('[ZWarehouseResourceAPI] fetchWarehouseResources error:', err);
        throw err;
    }
}
