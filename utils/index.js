import axios from "axios"
const getData = async (url) => {
    const response = await axios.get(url)
    const data = response.data
    return data;
}
export { getData }