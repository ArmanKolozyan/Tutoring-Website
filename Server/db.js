import mysql from "mysql"

export const db = mysql.createConnection({ 
    host:"localhost",
    user:"root",
    password:"Alexarstof123.",
    database:"tutoring"
})

