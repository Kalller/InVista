const db = require('../db');
const { check } = require('express-validator');



/**
 * Query the database and check whether the username exists and the password
 * hashes to the correct value.
 * If so, return an object with full user information.
 * @param {string} username
 * @param {string} password 
 * @returns {Promise} a Promise that resolves to the full information about the current user, if the password matches
 * @throws the Promise rejects if any errors are encountered
 */

// USER SECTION


//this is used by passport, check column name, right now is auth but we skip the sal and hash part

exports.getUser = (username, password) => 
{
    console.log('dao,',username,password)
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM auth WHERE username = ?';

    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (!row) {
          resolve(false)
        } else {
          
          const pass = password;
          
          if (pass === row.password) {
            resolve(row);
          } else {
            resolve(false);
          }
        }
      }
    });
  });
}
