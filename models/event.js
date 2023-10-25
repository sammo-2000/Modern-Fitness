import conn from './Db.js'

class Event{
    set_data(data){
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.date = data.date
        this.time = data.time
    }

    // TODO db queries for event
}

export default Event