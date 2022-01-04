import client from "../clientConfig";
import path from "../paths";

export default deleteSkill = async () => {
    const result = await client
        .delete(`${path.skillPath}/${id}`)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        })
    return result;
}