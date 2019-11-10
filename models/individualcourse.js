const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const IndividualcourseSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  moduleName: {
    type: String,
    required: true
  },
  moduleDesc: {
    type: String,
    required: true
  },
  moduleAuthor: {
    type: String,
    required: true
  },
  moduleContent: {
    type:String,
    required:true
  }
});

const Individualcourse = module.exports = mongoose.model('Individualcourse', IndividualcourseSchema);

// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }

// module.exports.getIndividualCourseDetailsByCourseName = function(courseName, callback){
//   const query = {courseName: courseName}
//   Individualcourse.findAll(query, callback);
// }

module.exports.getIndividualCourseDetailsByCourseName = (req, res, next) =>{
    
  Individualcourse.find({courseName: req.body.courseName},
      (err, individualcourse) => {
          if (!individualcourse)
              return res.status(404).json({ status: false, message: 'Record not found.' });
          else
              return res.status(200).json({ status: true, individualcourse : _.pick(individualcourse,['courseName','moduleName','moduleDesc','moduleAuthor','moduleContent']) });
      }
  );
}


// module.exports.addUser = function(newUser, callback){
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       if(err) throw err;
//       newUser.password = hash;
//       newUser.save(callback);
//     });
//   });
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if(err) throw err;
   
//     callback(null, isMatch);
//   });
// }
