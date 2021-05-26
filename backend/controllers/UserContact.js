//in Order always display the last address set
const UserContactDB = require("../models").UserContact;
const controller = {
  verifyExistingThesePersonalData: async (req, res) => {
    const currentUser = await req.user;
    UserContactDB.findAll({
      where: {
        town: req.params.town,
        county: req.params.county,
        phone: req.params.phone,
        address: req.params.address,
        lastname: req.params.lastname,
        firstname: req.params.firstname,
        UserId: currentUser.id,
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  setUserContact: async (req, res) => {
    const userContact = {
      town: req.body.town,
      county: req.body.county,
      phone: req.body.phone,
      address: req.body.address,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
    };

    let errors = [];
    if (
      !userContact.town ||
      !userContact.county ||
      !userContact.phone ||
      !userContact.address ||
      !userContact.lastname ||
      !userContact.firstname
    ) {
      errors.push("Empty fields!");
      console.log("Empty fields!");
    }
    if (userContact.town < 3) {
      errors.push("Invalid name of town!");
      console.log("Invalid name of town!");
    }
    if (userContact.lastname < 3) {
      errors.push("Invalid lastname!");
      console.log("Invalid lastname!");
    }
    if (userContact.firstname < 3) {
      errors.push("Invalid firstname!");
      console.log("Invalid firstname!");
    }
    if (userContact.county < 3) {
      errors.push("Invalid name of county!");
      console.log("Invalid name of county!");
    }
    if (userContact.address < 10) {
      errors.push("Write the entire address!");
      console.log("Write the entire address!");
    }
    if (
      userContact.phone < 10 &&
      !userContact.phone.match(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      )
    ) {
      errors.push("Phone must have 10 digits!");
      console.log("Phone must have 10 digits!");
    }

    const currentUser = await req.user;

    if (errors.length === 0) {
      try {
        UserContactDB.create(userContact).then((result) => {
          result
            .update({
              UserId: currentUser.id,
            })
            .then(() => {
              console.log("The user id was set!");
            });
          res.status(200).send({ message: "Succesfully created!" });
        });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(400).send(errors);
    }
  },
  getCurrentUserContacts: async (req, res) => {
    const currentUser = await req.user;
    UserContactDB.findAll({
      where: {
        UserId: currentUser.id,
      },
    }).then((result) => {
      res.status(200).send(result);
    });
  },

  updateUserContact: async (req, res) => {
    const userContact = await UserContactDB.findByPk(req.params.id);

    const newUserContact = {
      town: req.body.town,
      county: req.body.county,
      phone: req.body.phone,
      address: req.body.address,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
    };
    if (newUserContact.lastname !== userContact.lastname) {
      userContact
        .update({
          lastname: newUserContact.lastname,
        })
        .then(() => {
          console.log("Lastname updated!");
        });
    }
    if (newUserContact.firstname !== userContact.firstname) {
      userContact
        .update({
          firstname: newUserContact.firstname,
        })
        .then(() => {
          console.log("Firstname updated!");
        });
    }

    if (newUserContact.town !== userContact.town) {
      userContact
        .update({
          town: newUserContact.town,
        })
        .then(() => {
          console.log("Town updated!");
        });
    }
    if (newUserContact.county !== userContact.county) {
      userContact
        .update({
          county: newUserContact.county,
        })
        .then(() => {
          console.log("County updated!");
        });
    }
    if (newUserContact.phone !== userContact.phone) {
      userContact
        .update({
          phone: newUserContact.phone,
        })
        .then(() => {
          console.log("Phone updated!");
        });
    }
    if (newUserContact.address !== userContact.address) {
      userContact
        .update({
          address: newUserContact.address,
        })
        .then(() => {
          console.log("Address updated!");
        });
    }

    res.status(200).send(userContact);
  },
};
module.exports = controller;
