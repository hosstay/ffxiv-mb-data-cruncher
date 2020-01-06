const db = require('../database/database');
const security = require('../security/security');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('../utility/utility.js');

//creates hash seed
const salt = bcrypt.genSaltSync(5);

async function createUser(req, res) {
  try {
    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.password, 'password', 8, 18);

    const hashedPassword = bcrypt.hashSync(cleanPassword, salt);

    const result = await db.query(
      'SELECT * FROM users WHERE username=?',
      { replacements: [cleanUsername],
        type: db.QueryTypes.SELECT }
    );

    if (result !== undefined && result.length !== 0) {throw 'Username already exists.';}

    await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      { replacements: [cleanUsername, hashedPassword],
        type: db.QueryTypes.SELECT }
    );
    
    return res.status(200).json(security.encrypt({success: true, result: {success: true}}));
  } catch(err) {
    util.errorHandler({err: err, context: 'createUser', isLast: true});
    
    if (typeof err === 'string') {
      return res.status(200).json(security.encrypt({success: true, result: {success: false, msg: err}}));
    } else {
      return res.status(200).json(security.encrypt({success: false, msg: `User not created.`}));
    }
  }
}

async function login(req, res) {
  try {
    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.password, 'password', 8, 18);

    const submittedPassword = cleanPassword;

    const result = await db.query(
      'SELECT * FROM users WHERE username=?',
      { replacements: [cleanUsername],
        type: db.QueryTypes.SELECT }
    );

    if (result.length === 0) {throw 'Incorrect username or password.';}

    const userData = result[0];
    const isVerified = bcrypt.compareSync(submittedPassword, userData.password);

    if (!isVerified) {throw 'Incorrect username or password.';}

    //User authenticated... give them a token cookie
    const payload = {
      'id:':userData.id
    }
    const sessionToken = await security.generateJsonToken(payload);
    res.cookie('SESSIONID', sessionToken, { expires: new Date(Date.now() + 900000)});//, httpOnly:true, secure:true});
    return res.status(200).json(security.encrypt({success: true, result: {success: true}}));
  } catch(err) {
    util.errorHandler({err: err, context: 'login', isLast: true});
    
    if (typeof err === 'string') {
      return res.status(200).json(security.encrypt({success: true, result: {success: false, msg: err}}));
    } else {
      return res.status(200).json(security.encrypt({success: false, msg: `Could not be logged in.`}));
    }
  }
}

function verifyToken(req, res) {
  console.log(`req.cookies['SESSIONID']`);
  console.log(req.cookies['SESSIONID']);
  const verified = security.verifyJsonToken(req.cookies['SESSIONID']);

  if (verified) {
    console.log('Token verified');
    return res.status(200).json(security.encrypt({success: true, result: true}));
  } else {
    console.log('Token not verified');
    return res.status(200).json(security.encrypt({success: true, result: false}));
  }
}

function logout(req, res) {

  if (req.cookies['SESSIONID']) {

    console.log('Logged out');
    res.cookie('SESSIONID', req.cookies['SESSIONID'], { expires: new Date(Date.now() - 900000)});//, httpOnly:true, secure:true});
    return res.status(200).json(security.encrypt({success: true, result: true}));
  } else {

    console.log(`User wasn't logged in so can't log out.`);
    return res.status(200).json(security.encrypt({success: true, result: false}));
  }
}

module.exports = {
  createUser: createUser,
  login: login,
  verifyToken: verifyToken,
  logout: logout
};