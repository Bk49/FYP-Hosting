import client from "../clientConfig";
import path from "../paths";

export default editTopic = async (data) => {
    const result = await client
        .put(`${path.topicPath}/${id}`, data)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        })
    return result;
}