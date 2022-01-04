import client from "../clientConfig";
import path from "../paths";

export default addTopic = async (data) => {
    const result = await client
        .post(`${path.topicPath}/${id}`, data)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        })
    return result;
}