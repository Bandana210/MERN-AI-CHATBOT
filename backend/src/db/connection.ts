import { connect , disconnect } from "mongoose";

async function connectToDatabase(){
    try {
       // console.log("MONGODB_URL:", process.env.MONGODB_URL);
        await connect(process.env.MONGODB_URL);
        console.log("Connected to mongodb");
    }
    catch (error) {
        console.log(error);
        throw new Error("cannot connect to Mongodb");
    }

}

async function disconnectFromDatabase(){
    try{
        await disconnect();
    }
    catch (error){
        console.log(error);
        throw new Error("cannot connect to Mongodb");
    }
}

export { connectToDatabase , disconnectFromDatabase};
