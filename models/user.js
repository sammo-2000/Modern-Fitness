import conn from './Db.js'
class User {
    set_data(data) {
        this.id = data.id
        this.email = data.email
        this.password = data.password
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.status = data.status
        this.access_code = data.access_code
        this.branch_id = data.branch_id
        this.role = data.role
    }

    async get_user_by_email(email) {
        const data = await conn.fetch('SELECT * FROM `user` WHERE `email` = ?', [email])
        if (data) {
            this.set_data(data)
        }
        return data;
    }

    async access_code_exists(access_code) {
        const data = await conn.fetch('SELECT * FROM `user` WHERE `access_code` = ?', [access_code])
        return data;
    }

    async signup(first_name, last_name, email, password, access_code) {
        const query = 'INSERT INTO `user`(`first_name`, `last_name`, `email`, `password`, `access_code`) VALUES (?, ?, ?, ?, ?)'
        return await conn.insert(query, [first_name, last_name, email, password, access_code])
    }

    async get_user_by_id(id) {
        const data = await conn.fetch('SELECT * FROM `user` WHERE `id` = ?', [id])
        if (data) {
            this.set_data(data)
        }
        return data;
    }

}

export default User