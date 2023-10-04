// Get .env
import { config } from 'dotenv'
config()

// Connect to database
import mysql from 'mysql2'

const connect = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
}).promise()

const fetch = async (query, array) => {
    const [rows] = await connect.query(query, array)
    return rows[0]
}

const fetchAll = async (query, array) => {
    const [rows] = await connect.query(query, array)
    return rows
}

const insert = async (query, array) => {
    const [rows] = await connect.query(query, array)
    return rows[0]
}

export default { fetch, fetchAll, insert, connect }