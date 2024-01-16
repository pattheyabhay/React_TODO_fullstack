//to connect to Databases we use mongoose library
/*
Todo{
    title: string
    description: string
    completed: boolean
}
*/
const mongoose = require('mongoose');   // Import the Mongoose library, which provides tools for MongoDB object modeling.
mongoose.connect("mongodb+srv://admin:12345678910@cluster0.9dgfcrj.mongodb.net/todos");
// Define a Mongoose schema for the 'todos' collection.
const todoSchema = mongoose.Schema({ 

    title: String,              // Define a field 'title' with the data type String.
    description: String,            // Define a field 'description' with the data type String.
    completed: Boolean                  // Define a field 'completed' with the data type Boolean.

})

const todo = mongoose.model('todos', todoSchema);
// Create a Mongoose model named 'todo' for the 'todos' collection using the defined schema.

module.exports={
    todo:todo
}