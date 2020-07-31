const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const encryptPWD = require('../utils/encryptPWD');

module.exports = {

    async index(request, response) {
        const user = await connection('user').select('*');

        return response.json(user);
    },

    async create(request, response) {

        const { name, email } = request.body;

        const id = generateUniqueId(); // gera um ID para o usuario

        const pwd = encryptPWD(request.body.pwd); // criptografa a senha

        await connection('user').insert({
            id,
            name,
            email,
            pwd,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('user').where('id', id).delete();

        return response.status(204).send();
    }
};
