import client from "../clientConfig";
import path from "../paths";

export default editGroupImg = async (query, formData) => {
    const result = await client
        .get(`${path.userPath}/search?query=${query}`)
        .then(({ data }) => {
            return data;
        })
        .catch(({ response }) => {
            throw response.data;
        });
    return result;
};
