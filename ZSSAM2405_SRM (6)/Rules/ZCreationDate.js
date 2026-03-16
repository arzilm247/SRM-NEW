/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ZCreationDate(clientAPI) {
    const binding = clientAPI.binding;

    if (!binding || !binding.CreationDate) {
        return '';
    }

    const date = new Date(binding.CreationDate);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `Creation Date - ${yyyy}-${mm}-${dd}`;
}

