import dotenv from "dotenv";
dotenv.config();
import app from "./app.js" ;
import dotenv from "dotenv";
dotenv.config();
import { connectToDatabase } from "./db/connection.js";
import dotenv from "dotenv";

// connection and listeners 
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    console.log("PORT VALUE:", process.env.PORT);
    app.listen(PORT, () => console.log("Server Open and Connected to Database "));
  })
  .catch((err) => console.log(err));


