import client from "../clientConfig";
import path from "../paths";

export default deleteTopic = async () => {
    const result = await client
        .delete(`${path.topicPath}/${id}`)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        })
    return result;
}