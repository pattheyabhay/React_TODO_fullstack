// write basic boiler plate for express server
// with express.json middleware

const express = require('express');
const cors = require('cors');
// const jsonwebtoken = require('jsonwebtoken');
const {createTodo, updateTodo} = require('./types');
const { todo } = require('./db');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

//add a todo
app.post('/todos', async(req, res)=>{
    const createPayLoad = req.body;
    const parsedPayLoad = createTodo.safeParse(createPayLoad);
    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }    
    //put it in mongoDB
    await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description, 
        completed:false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get('/todos', async(req, res)=>{ 
    const todos = await todo.find({}); //make take sometime to find the data in DB hence await and returns promise 
    res.json({
        todos
    })  
})

//mark_as_done
app.put('/completed',async (req, res)=>{
    const updatePayLoad = req.body;
    const parsedUpdatePayLoad = updateTodo.safeParse(updatePayLoad);
    if(!parsedUpdatePayLoad.success){
        res.status(411).json({
            msg: "invalid INPUTS"
        })
        return;
    }
    await todo.update({
        _id: req.body.id //every time record added to MOngoDB _ID is generated 
    }, {
        completed:true
    })
    res.json({
        msg: "Todo maked as completed"
    })

})

app.listen(3000);