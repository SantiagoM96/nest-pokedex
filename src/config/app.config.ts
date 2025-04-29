export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || "dev",
    mongodbUri: process.env.MONGO_DB_URI,
    port: process.env.PORT || 3001,
    defaultLimit: process.env.DEFAULT_LIMIT || 7
})