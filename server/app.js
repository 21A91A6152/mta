import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors'
import mdata from './models/students'
import nodemailer from 'nodemailer';
import movie from './models/movie';

 
var app = express();  
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())

// mongodb account

mongoose.connect('mongodb+srv://21a91a6152:T2wAPdf2wEU7ucq5@cluster0.9uv65fj.mongodb.net/DriveReady?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() =>
console.log("Connected to Database & Listining to localhost 5000 ")
)
.catch((err) => console.log(err));

var server = app.listen(5000)   

//email sending after registeration

app.post('/adddetailssignup',async(req,res,next)=>{
    console.log(req.body.formdata)
    const {fname,lname,email,password,phone}=req.body.formdata;
    let users
    try{
      users = await mdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
     
    if(!users){
        const stud =new mdata({
            fname,
            lname,
            email,
            password,
             
            phone,
          })
          stud.save();
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'manojmaridi666@gmail.com',
          pass: 'twws ipfi pavo frie'
        }
      });
      
      var mailOptions = {
        from: 'manojmaridi666@gmail.com',
        to: email,
        subject: 'Sending Email regarding signin',
        text: 'Thank you for registeration in BOOKTICKET.COM !\n Dear'+{email}+ 'We are thrilled to inform you that your sign-up process for  movieticket.com has been successfully completed. Welcome aboard! You can now take full advantage of our to simplify and enhance your  movie experience.To get started, please use your registered email address  and the password you provided during the sign-up process to access your account. Should you need any assistance or have any questions, our dedicated support team is here to help.Here are a few things to keep in mind as you embark on your journey with us:Familiarize yourself with the features: Explore the various tools and features available to streamline your [related field] tasks.Thank you for choosing  bookticket.com  ./n We look forward to seeing you make the most of our platform and hope it brings a significant positive impact to your  endeavors./nBest regards, /n manager bookticket.com '};
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.send({msg:"Account registered successfully"}) 
    }
    else{
      return res.status(200).json({msg:"email exists!.."})
    }
  });


 
app.post('/sendEmail', async (req, res) => {
  
  const { email, subject, text, moviename,date,time,totalseats,seatsno} = req.body;
 
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'manojmaridi666@gmail.com',
      pass: 'twws ipfi pavo frie'
    }
  });

  // Configure the mail options
  let mailOptions = {
    from: 'manojmaridi666@gmail.com',
    to: email,
    subject: subject,
    text: `${text}\nMoviename: ${JSON.stringify(moviename)}\nDate: ${JSON.stringify(date)}\nTime:${JSON.stringify(time)}}\nSeats:${JSON.stringify(totalseats)}\nSeats No: ${JSON.stringify(seatsno)}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

 

   




//login in process testing
app.post('/logindetails',async (req,res,next)=>{
  
   
    const {email,password}=req.body.formdata;
    let users;
    try{
      users = await mdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
    console.log(users)
    if(!users){
      return res.status(200).json({msg:"Not registered"})
    }
    else{
      if(users.password===password){
        return res.status(200).json({msg:"login successful",email:users})
      }
      else{
        return res.status(200).json({msg:"password incorrect"})
      }
    }
     
  })

  //passing info to profile page
  app.get('/getdata/:id', async (req, res, next)=>{
    const _id = req.params.id
    let users;
    try{
        users = await mdata.findById({_id});
    }catch(err){
        return console.log(err)
    }
    if(!users){
        return res.status(400).json({message:"No Users Found."})
    }
    return res.status(201).json({users})
  })


  let receivedData = {}; // Temporary storage for the data received from the client

app.post('/data', (req, res) => {
  receivedData = req.body;
  console.log('Received data:', receivedData);
  res.json({ message: 'Data received successfully' });
});

app.get('/api/data', (req, res) => {
  res.json(receivedData);
});
 

//forgot passsword


app.put('/forgotpassword', async (req, res, next)=>{
  const {email,password,confirmpassword}=req.body.formdata;
  let users;
  let stud;
  try{
    users = await mdata.findOne({ email: email });
  }catch(err){
      return console.log(err)
  }
  console.log(users)
  if(!users){
    return res.status(200).json({msg:"email incorrect"})
  }
  else if(password!=confirmpassword){
    return res.status(200).json({msg:"please enter correct password"})
  }
  else{
      stud = await mdata.findByIdAndUpdate(users._id,{
        email,
        password, 
      });
      return res.status(200).json({msg:"password updated successfully"})
  }
})



app.get('/getdatamovies',async(req,res,next)=>{
  let mdata;
  try{
      mdata=await movie.find();
      
  }catch(err){
      console.log(err);
  }
  if(!mdata){
    return res.status(404).json({message:"No movies found"})
  }
  return res.status(200).json({mdata})
  console.log(mdata)
})


