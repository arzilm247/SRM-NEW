/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZGetFromDate(clientAPI) {
    let today = new Date();
    today.setDate(today.getDate() - 90);

    return today;
}
