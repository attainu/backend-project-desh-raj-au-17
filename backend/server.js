const app = require("./app")
const connectDatabase = require("./config/database")
const dotenv = require('dotenv')

//Handle Uncaught exceptions
process.on('uncaughtException', err =>{
    console.log(`ERROR, ${err.stack}`)
    console.log('Shutting down due to the uncaught exception')
    process.exit(1)
})    

//Setting up config file
dotenv.config({path: "backend/config/config.env"})

// COnnecting to the database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} node.`)
})

//Handle unhandled Project Rejection

process.on('unhandledRejection', err =>{
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down the server due to unhandled Promise rejections')
    server.close (() =>{
        process.exit(1)
    })

})
