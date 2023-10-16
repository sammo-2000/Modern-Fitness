// Create express app
import express from 'express'
import session from 'express-session'
import cookie_parser from 'cookie-parser'
const app = express()

// Get .env
import { config } from 'dotenv'
config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: process.env.SESSION_MAX_AGE,
    }
}));

// Connect to DB then start server
import database from './models/Db.js'
database.connect.getConnection()
    .then((connection) => {
        console.log('Connected to the database');
        app.listen(process.env.PORT, process.env.DOMAIN, () => {
            console.log(`Server started on ${process.env.DOMAIN}:${process.env.PORT}`);
        });
        connection.release();
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

// Set up EJS view engine
app.set('view engine', 'ejs')

// Static items
app.use(express.static('public'));

// Get middleware
import middleware from './middleware/auth.js'

// Get routes 
import auth_router from './routes/auth.js'

// Routing
app.get('/', (req, res) => { res.render('index', { title: 'Home', session: req.session }) })
app.use(auth_router)

// Logout
app.get('/logout', middleware.logged_on, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
})

// 404
app.use((req, res) => { res.status(404).render('404', { title: '404', session: req.session }) })
