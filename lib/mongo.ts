import * as mongo from "mongodb"
import * as dotenv from "dotenv"
dotenv.config();

const client = new mongo.MongoClient(process.env.DB_CONN_STRING ?? "");
const db = client.db(process.env.DB_NAME);
let collections = {
    user: db.collection("user"),
    exercises: db.collection("exercises"),
    logs: db.collection("logs")
}

export const { user, exercises, logs } = collections
export { db }
collections.exercises.findOne().then(val => {
    if (!val) {
        exercises.insertMany([
            { name: "Squat" },
            { name: "Bench Press" },
            { name: "Deadlift" },
            { name: "Overhead Press" },
            { name: "Pendlay Row" },
            { name: "Lat Pulldown" },
            { name: "Dumbell Press" },
            { name: "Face Pull" },
            { name: "Rock Pull" },
            { name: "Sumo Deadlift" },
            { name: "Power Shrug" },
            { name: "Landmine Press" },
            { name: "Dips" },

        ])
    }
})