
const express = require('express');
const path = require('path');
const PORT ="3000"
const fileUpload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileUpload())


app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});

app.get('/editor', (req, res)=>{
    res.sendFile(path.join(initial_path,'editor.html'));
})

//upload link
app.post('/upload',(req,res)=> {
    let file= req.file.image;
    let date= new Date();
    //image name
    let imageName = date.getDate() +date.getTime() + file.name;
    //path upload for image
    let path='public/uploads/'+imageName;
    //create the upload 
    file.mv(path, (err, result)=> {
        if(err){
            throw err;
        }else {
            //image's upload path 
            res.json(`uploads/${imagename}`);
        }
    })
})

app.listen("3000", () => {
    console.log("listening.....");
});