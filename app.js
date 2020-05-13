const express =require('express');
const bodyParser=require('body-parser');
const request=require('request');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;

    var data={
        members:[
            {
          email_address:email,
          status:"subscribed",
          merge_fields:{
              FNAME:fname,
              LNAME:lname
          }  
        }
    ]
    };

    var jsondata=JSON.stringify(data);

    var options={
        url:"https://us18.api.mailchimp.com/3.0/lists/ad67edac29",
        method: "POST",
        headers:{
            "Authorization": "robExMachina 00ad21646d143ddb5ac78f00cd4512bb-us18"
        },
        body:jsondata
    };


    request(options,function(error,response,body){
        if(error){
            res.sendFile(__dirname+"/failure.html");
        }
        else{
            if(response.statusCode===200)
            res.sendFile(__dirname+"/success.html");
            else
            res.sendFile(__dirname+"/failure.html");
        }
    });
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT||3000,function(req,res){
    console.log("Server is running on port 3000");
});

//00ad21646d143ddb5ac78f00cd4512bb-us18 --API Key 
//ad67edac29 --audience ID