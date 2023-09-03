const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

// Create a new student
// using promises
// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body)
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// });

// 1:create a new Router
// const router = new express.Router();

// 2: define a router
// router.get("/home", (req, res) => {
//     res.send("hey this is routher")
// })
// 3: ragiister router
// app.use(router);

// using async,await
app.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(error);
    }
});



// read the data of registered students
app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
});

// get indivisual Students data
app.get('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        // param yani data lene k liye user se
        const SingleData = await Student.findById(_id);

        if (SingleData) {
            res.send(SingleData);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
// find byname
// app.get('/students/:name', async (req, res) => {
//     try {
//         const name = req.params.name;
//         // param yani data lene k liye user se
//         const SingleData = await Student.findOne({name});

//         if (SingleData) {
//             res.send(SingleData);
//         } else {
//             return res.status(404).send();
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// delete data
app.delete("/students/:id", async (req, res) => {
    try {
        // const id = req.params.id;
        const DeleteData = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(404).send();
        }
        res.send(DeleteData);
    } catch (Error) {
        res.status(500).send(Error);
    }
})
// update by id
app.patch("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true }; // This is use for current data update

        const updatedData = await Student.findByIdAndUpdate(id, updates, options);

        if (!updatedData) {
            return res.status(404).send();
        }

        res.send(updatedData);
    } catch (error) {
        res.status(500).send(error);
    }
});










app.listen(port, () => {
    console.log(`connection is created at ${port}`);
});