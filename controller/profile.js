import User_Model from '../models/user.js'

const User = new User_Model()

const profile_detail = async (req, res) => {
    try {
        const data = await User.get_user_by_id(req.session.user_id)
        const status = data ? 'active' : 'in-active';

        const dateObject = new Date(data.created_at);

        res.json({
            email: data.email,
            status: status,
            access_code: data.access_code,
            role: data.role,
            created_at: data.created_at,
            created_at: dateObject.toDateString(),
        })
    } catch (error) {
        console.error(error);
    }
}

export default { profile_detail }