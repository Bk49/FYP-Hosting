import client from "../clientConfig";
import path from "../paths";

export default editSkill = async () => {
    const result = await client
        .get(`${path.skillPath}/${id}`)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        })
    return result;
}