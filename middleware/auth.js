const admin = (req, res, next) => {
    if (req.session.role === 'admin') {
        next()
    } else {
        res.status(404).render('404', { title: '404', session: req.session })
    }
}

const trainer = (req, res, next) => {
    if (req.session.role === 'trainer') {
        next()
    } else {
        res.status(404).render('404', { title: '404', session: req.session })
    }
}


const member = (req, res, next) => {
    if (req.session.role === 'member') {
        next()
    } else {
        res.status(404).render('404', { title: '404', session: req.session })
    }
}

const logged_on = (req, res, next) => {
    if (req.session.user_id) {
        next()
    } else {
        res.status(404).render('404', { title: '404', session: req.session })
    }
}

const guest = (req, res, next) => {
    if (req.session.user_id) {
        res.status(404).render('404', { title: '404', session: req.session })
    } else {
        next()
    }
}

export default { admin, trainer, member, logged_on, guest }