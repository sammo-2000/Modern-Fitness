import conn from './Db.js'

class Password {
    set_data(data) {
        this.assword_id = data.password_id
        this.email = data.email
        this.link = data.link
        this.create_at = data.create_at
    }

    async get_data_by_email(email) {
        const data = await conn.fetch('SELECT * FROM `password` WHERE `email` = ?', [email])
        if (data) {
            this.set_data(data)
        }
        return data
    }

    async get_data_by_link(link) {
        const data = await conn.fetch('SELECT * FROM `password` WHERE `link` = ?', [link])
        if (data) {
            this.set_data(data)
        }
        return data
    }

    async insert_data(email, link) {
        const query = 'INSERT INTO `password`(`email`, `link`) VALUES (?, ?)'
        return await conn.insert(query, [email, link])
    }

    async delete_old_data() {
        const data = await conn.insert('DELETE FROM `password` WHERE TIMESTAMPDIFF(MINUTE, create_at, NOW()) > 30;', [])
    }

    async delete_link(id) {
        const data = await conn.insert('DELETE FROM `password` WHERE `password_id` = ?', [id])
    }

}

export default Password