// Helper to Base64 encode credentials natively across environments
function encodeBase64(str) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    for (let block, charCode, idx = 0, map = chars;
        str.charAt(idx | 0) || (map = '=', idx % 1);
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
        charCode = str.charCodeAt(idx += 3 / 4);
        if (charCode > 0xFF) throw new Error("btoa failed.");
        block = block << 8 | charCode;
    }
    return output;
}

const AUTH_HEADER = "Basic " + encodeBase64("ODS_COMM_USER:NyAXndoxKbW6=TTW\\#9]S\\afQt4u{TxM9c<fe4NS");
const BASE_URL = "https://my432407-api.s4hana.cloud.sap:443/sap/opu/odata4/sap/api_warehouse_resource_2/srvd_a2x/sap/warehouseresource/0001";

/**
 * Handles the creation of a literal Warehouse Resource in Public Cloud
 * Expects { EWMWarehouse: string, EWMResource: string }
 */
export async function createWarehouseResource(payload) {
    // 1. Fetch CSRF Token
    const fetchHeaders = new Headers();
    fetchHeaders.append("Authorization", AUTH_HEADER);
    fetchHeaders.append("x-csrf-token", "Fetch");

    // Do a GET against the entity set to snag the token quickly
    const tokenResponse = await fetch(`${BASE_URL}/WarehouseResource?$top=1`, {
        method: "GET",
        headers: fetchHeaders
    });

    const csrfToken = tokenResponse.headers.get("x-csrf-token");

    // 2. Prepare POST payload
    const postHeaders = new Headers();
    postHeaders.append("Authorization", AUTH_HEADER);
    postHeaders.append("Content-Type", "application/json");
    if (csrfToken) {
        postHeaders.append("x-csrf-token", csrfToken);
    }
    
    // Cookie injection for sticky sessions handled by platform fetch
    const cookie = tokenResponse.headers.get("set-cookie");
    if (cookie) {
        postHeaders.append("Cookie", cookie);
    }

    // 3. Make the POST Request
    const createResponse = await fetch(`${BASE_URL}/WarehouseResource`, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify(payload)
    });

    if (!createResponse.ok) {
        const errorText = await createResponse.text();
        // Parse SAP standard error JSON if possible
        try {
            const errObj = JSON.parse(errorText);
            if (errObj.error && errObj.error.message) {
                throw new Error(errObj.error.message);
            }
        } catch (e) {
            // keep default behavior if JSON parsing fails
        }
        throw new Error(`Failed to create resource. Status: ${createResponse.status} ${errorText}`);
    }

    if (createResponse.status === 204) return { success: true };
    return await createResponse.json();
}
