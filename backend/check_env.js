const check_env = () => {
    try {
        if (process.env.BACKEND_FULL_DOMAIN === undefined || process.env.BACKEND_FULL_DOMAIN === '')
            throw new Error('BACKEND_FULL_DOMAIN environment variable not set');

        if (process.env.DOMAIN === undefined || process.env.DOMAIN === '')
            throw new Error('DOMAIN environment variable not set');

        if (process.env.PORT === undefined || process.env.PORT === '')
            throw new Error('PORT environment variable not set');

        if (process.env.FRONTEND_FULL_DOMAIN === undefined || process.env.FRONTEND_FULL_DOMAIN === '')
            throw new Error('FRONTEND_FULL_DOMAIN environment variable not set');

        if (process.env.SECRET_TOKEN === undefined || process.env.SECRET_TOKEN === '')
            throw new Error('SECRET_TOKEN environment variable not set');

        if (process.env.MONGO_URI === undefined || process.env.MONGO_URI === '')
            throw new Error('MONGO_URI environment variable not set');

        if (process.env.APP_NAME === undefined || process.env.APP_NAME === '')
            throw new Error('APP_NAME environment variable not set');

        if (process.env.EMAIL === undefined || process.env.EMAIL === '')
            throw new Error('EMAIL environment variable not set');

        if (process.env.EMAIL_PASSWORD === undefined || process.env.EMAIL_PASSWORD === '')
            throw new Error('EMAIL_PASSWORD environment variable not set');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = check_env;
