const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
    origin: '*'
}))

mongoURI = "mongodb+srv://PR_Test:LkZdxDEDymd1zhBI@test.4jz8kyi.mongodb.net/test"
mongoose.connect(mongoURI, { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(
        () => console.log("MongoDB connected"))
    .catch(
        (err) => console.log(err)
    );

app.post("/addtask", async (req, res) => {
    const { todo } = req.body;
    try {
        const newData = new TaskSchema({
            todo: todo
        });
        await newData.save();
        return res.json(await TaskSchema.find());
    } catch (err) {
        console.log(err);
    }
})
app.get('/gettask', async (req, res) => {
    try {
        return res.json(await TaskSchema.find());

    } catch (err) {
        console.log(err);
    }
})
app.delete('/delete/:id', async (req, res) => {
    try {
        await TaskSchema.findById(req.params.id);
        return res.json(await TaskSchema.find());

    } catch (err) {
        console.log(err);
    }
})


app.listen(5000, () => console.log('Server running....'));