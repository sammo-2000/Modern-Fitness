import conn from './Db.js'
class User {
    set_data(data) {
        this.user_id = data.user_id
        this.email = data.email
        this.password = data.password
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.status = data.status
        this.access_code = data.access_code
        this.branch_id = data.branch_id
        this.role = data.role
    }

    async get_user_by_username(username) {
        const data = await conn.fetch('SELECT * FROM `user` WHERE `username` = ?', [username])
        this.set_data(data)
        return data;
    }

    async get_user_by_id(id) {
        const data = await conn.fetch('SELECT * FROM `user` WHERE `id` = ?', [id])
        this.set_data(data)
        return data;
    }

    get_user_id()
    {
        return this.user_id
    }

}

export default User