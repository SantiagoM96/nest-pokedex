export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || "production",
    mongodbUri: process.env.MONGODB_URI,
    port: process.env.PORT || 3001,
    defaultLimit: process.env.DEFAULT_LIMIT || 7
})