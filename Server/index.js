import express from "express"

const app = express() // to have web server

app.use(express.json()) // to send data to the database 

app.listen(8800, () => {
    console.log("Hey Guys!")
}) 