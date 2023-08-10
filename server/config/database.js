import mongoose from 'mongoose'

// function for mongoDB local

// const connectDB = async (DATABASE_URL) => {
//     try {
//         const DB_OPTION = {
//             dbName: 'MERN_Burger_App'
//         }
//         mongoose.set('strictQuery', false);
//         await mongoose.connect(DATABASE_URL, DB_OPTION)
//         console.log("database connected successfully")
//     } catch (error) {
//         console.log(error)
//     }
// }
// export default connectDB;

// function for MongoDB cluster
const connectDB = async () => {
    mongoose.set('strictQuery', false);
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);

    console.log(`Database is connect with ${connection.host}`);
};
export default connectDB;