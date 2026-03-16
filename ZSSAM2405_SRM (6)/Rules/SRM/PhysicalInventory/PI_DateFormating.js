/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function PI_DateFormating(clientAPI) {

    const binding = clientAPI.binding;

    if (!binding || !binding.PlanCountDate) {
        return '';
    }

    const date = new Date(binding.PlanCountDate);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;

}

