
/**
 * getData()
 *
 * @param {string} URL - URL to fetch data from.
 * @returns {array of data} return the array of data from api.
 */
import axios from "axios"
const getData = async (url) => {
    const response = await axios.get(url)
    const data = response.data
    return data;
}
export { getData }