import client from "../clientConfig";
import path from "../paths";

export default addSkill = async (data) => {
    const result = await client
        .post(`${path.skillPath}/${id}`, data)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        })
    return result;
}