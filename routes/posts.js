const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment")


// img storage confing
var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./upload");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
        // callback(null, `image-${file.originalname}`);

    }
});


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})






router.post("/register",upload.single("photo"), (req, res) => {
  const { title, content } = req.body;

  const {filename} = req.file;

  if (!title || !filename || !content) {
    return res.status(422).json({ status: 422, message: "Fill all the details" });
  }

  try {
        
   let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    
    conn.query("INSERT INTO post SET ?",{title:title,image:filename,content:content,date:date},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("data added")
            res.status(201).json({status:201,data:req.body})
        }
    })
} catch (error) {
    res.status(422).json({status:422,error})
}
});





// get user data
router.get("/getdata",(req,res)=>{
    try {
        // let shortcolumn = req.query.sort
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        let query = "SELECT * FROM post ORDER BY date DESC ";
        conn.query(query,(err,result)=>{

            if(err){
                console.log(err)
            }else{
                console.log("data get")
                // let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});






// delete user


router.delete("/:id",(req,res)=>{
    const {id} = req.params;
   try {
    conn.query(`DELETE FROM post WHERE id ='${id}'`,(err,result)=>{
        if(err){
            console.log("error")
        }else{
            console.log("data delete")
            res.status(201).json({status:201,data:result})
        }
    })
   } catch (error) { 
    res.status(422).json({status:422,error})
   }
})






router.get("/getdata/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM post WHERE id = ?";
  
    conn.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      } else {
        if (result.length === 0) {
          console.log("Data not found");
          res.status(404).json({ status: 404, error: "Data not found" });
        } else {
          console.log("Data fetched");
          res.status(200).json({ status: 200, data: result[0] });
        }
      }
    });
  });

  





// Update a blog post by ID
router.put("/update/:id", (req, res) => {
    const postId = req.params.id;
    const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ?";
  
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, postId];
  
    conn.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
  







module.exports = router;