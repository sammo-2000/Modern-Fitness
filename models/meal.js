import conn from './Db.js'
import User_Model from './user.js'
const User = new User_Model()
class Meal {
    set_data(data) {
        this.meal_id = data.meal_id
        this.user_id = data.user_id
        this.name = data.name
        this.calories = data.calories
    }

    async set_meal(name, calories) {
        const user_id = User.get_user_id();
        conn.insert('INSERT INTO `meal`(`user_id`, `name`, `calories`) VALUES (?, ?, ?)', [user_id, name, calories])
    }

}

export default Meal