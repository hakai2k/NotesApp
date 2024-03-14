import mongoose from "mongoose";
import env from './util/ValidateEnv'
import app from './app'

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then( () => {
        app.listen(env.PORT, () => {
            console.log("Listening at port", env.PORT)
        })
    })
    .catch(console.error)