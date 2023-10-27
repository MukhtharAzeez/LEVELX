import API from "../axios/Axios"

const fetch = async (endPoint) => {
    try {
        const { data } = await API.get(endPoint)
        console.log(data, "from data")
        return data.docs
    } catch (error) {
        console.log("error", error)
        return []
    }
}
export default fetch