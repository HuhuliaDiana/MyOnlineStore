const UserDB=require("../models").User;
const bcrypt = require('bcrypt');

const controller={

    addUser: async (req,res)=>{
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
        };

        let errors = [];

  const userByEmail=await UserDB.findOne({
    where:{
      email: user.email
    }
  })
  
  if(userByEmail){
    console.log("You have already an account!")
    errors.push("You have already an account")
  }

  if (!user.firstname || !user.lastname || !user.password || !user.email) {
    console.log("Empty fields!");
    errors.push("Empty fields!");
  }

  if (user.firstname.length < 2 || user.firstname.length > 25) {
    console.log("Firstame should have more than 2 characters and less than 25!");
    errors.push("Firstame should have more than 2 characters and less than 25!");
  }
  if (user.lastname.length < 2 || user.lastname.length > 25) {
    console.log("Lastame should have more than 2 characters and less than 25!");
    errors.push("Lastame should have more than 2 characters and less than 25!");
  }
  if (
    !user.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    console.log("Email incorrect!");
    errors.push("Email incorrect!");
  }
  if (user.password.length < 8) {
    console.log("Password should have more than 8 characters!");
    errors.push("Password should have more than 8 characters!");
  }

  if (errors.length === 0) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      UserDB.create(user).then(() => res.status(201).send({ message: "Succesfully registered!" }));

    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send(errors);
  }

    },

    getAllUsers: async(req,res)=>{
        try {
            const users = await UserDB.findAll();
            res.status(200).send(users);
        } catch {
            res.status(500).send({ message: "Server error!" })
        }

    },

    getCurrentUser:async(req,res)=>{
      const currentUser=await req.user
      res.status(200).send(currentUser)
    },

    editProfile:async(req,res)=>{

      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
    };

    const currentUser=await req.user
    if(user.firstname!==currentUser.firstname){
      currentUser.update({
     
        firstname: user.firstname
      
    }).then(()=>{
      console.log("Firstname updated!")
    })

    }

   

    if(user.lastname!==currentUser.lastname){
      currentUser.update({
       
          lastname: user.lastname
        
      }).then(()=>{
        console.log("Lastname updated!")
      })

    }

    if(user.email!==currentUser.email){
      currentUser.update({
       
          email: user.email
        
      }).then(()=>{
        console.log("Email updated!")
      })

    }

    res.status(200).send(currentUser)


    }
  

}
module.exports=controller