import client from "../clientConfig";
import path from "../paths";

export default updateSkill = async (data) => {
    const result = await client
        .put(`${path.skillPath}/${id}`, data)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        })
    return result;
}