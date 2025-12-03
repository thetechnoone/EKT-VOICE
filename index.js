import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const posts = []

app.get("/",(req,res)=>{
    res.render("index.ejs")
});

app.get("/postpage",(req,res)=>{
    res.render("posts.ejs",{posts:posts})
});

app.post("/newpost",(req,res)=>{
    // console.log(req.body);
    // console.log (posts.length);

    const newPosts = {
        id: ((posts.length) + 1),
        subject: req.body.subject,
        neighborhood: req.body.neighborhood,
        content: req.body.content,
        name: req.body.name,
        date: new Date()
    };

    posts.push(newPosts);
    // console.log(posts);

    res.render("posts.ejs",{posts:posts});
});


app.get("/diffpage/:id",(req,res)=>{

const postID = parseInt(req.params["id"]);

const findPost= posts.findIndex(({id})=> id === postID);

posts.splice(findPost,1)

console.log(posts);

res.redirect("/postpage");

});

app.listen(port,()=>
console.log(`Server is running on port ${port}`) 
);
