// Create express app
import express from 'express'
import session from 'express-session'
import cookie_parser from 'cookie-parser'
import file_store from 'session-file-store'
const app = express()
const file_store_session = file_store(session)

// Get .env
import { config } from 'dotenv'
config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie_parser())
app.use(session({
    store: new file_store_session({
        path: './sessions',
    }),
    domain: process.env.DOMAIN,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    secure: true,
    cookie: {
        maxAge: 604800000,
        httpOnly: true,
        path: '/',
    }
}))

// Connect to DB then start server
import database from './models/Db.js'
database.connect.getConnection()
    .then((connection) => {
        console.log('Connected to the database')
        app.listen(process.env.PORT, process.env.DOMAIN, () => {
            console.log(`Server started on ${process.env.DOMAIN}:${process.env.PORT}`)
        })
        connection.release()
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error)
    })

// Set up EJS view engine
app.set('view engine', 'ejs')

// Static items
app.use(express.static('public'))

// Get middleware
import middleware from './middleware/auth.js'

// Get routes 
import auth_router from './routes/auth.js'
import profile_router from './routes/profile.js'

// Routing
app.get('/', (req, res) => { res.render('index', { title: 'Home', session: req.session }) })
app.use(auth_router)
app.use(profile_router)

// Logout
app.get('/logout', middleware.logged_on, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err)
        }
        res.redirect('/')
    })
})

// 404
app.use((req, res) => { res.status(404).render('404', { title: '404', session: req.session }) })
// app.use((req, res) => { res.status(404).json({ type: 'Not found', message: 'Sorry, could not found the API endpoint' })})
