import conn from '../models/Db.js'
import event_schema from '../schema/event_schema.js'

const event_post = async (req, res) => {
    const { title, time, date, space_available } = req.body

    // Handle errors
    const { error, value } = event_schema(req.body)
    if (error) {
        return res.status(400).json({ type: 'error', message: error.details[0].message })
    }

    // Create the event
    try {
        conn.insert('INSERT INTO `event`(`title`, `time`, `date`, `space_available`) VALUES (?, ?, ?, ?)', [title, time, date, space_available])
        return res.status(201).json({ type: 'success', message: 'Event created successfully' })
    } catch (error) {
        console.error('Controller event:', error);
        return res.status(500).json({ type: 'error', message: 'Internal server error' })
    }
}

const event_put = async (req, res) => {
    // Update event
    res.json('POST put')
}

export default { event_post, event_put }


