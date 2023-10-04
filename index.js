// Create express app
import express from 'express'
const app = express()

// Get .env
import { config } from 'dotenv'
config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Get routes 
import profile_router from './routes/profile.js'
import auth_router from './routes/auth.js'

// Routing
app.get('/', (req, res) => { res.render('index', { title: 'Home' }) })
app.use(auth_router)
app.use('/profile', profile_router)
app.use((req, res) => { res.status(404).render('404', { title: '404' }) })
