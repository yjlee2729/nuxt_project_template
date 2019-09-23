const express = require('express')
const consola = require('consola')
const bcrypt = require('bcrypt-nodejs')
const db = require('@util/db')
const msg = require('@util/constantsMsg')
const user = require('@models/user')

const router = express.Router()

router.post('/login', (req, res, next)=>{
    var sql = user.selectUserByUsername;
    var body = req.body;
    var username = body.username;
    var password = body.password;

    var success = function(result){
        if(result.length > 0){ //존재여부
            var pw = String(result[0].password); //그냥 비교시 incorrect argument error
            var inputPw = String(password);

            bcrypt.compare(inputPw, pw, (err, matched) => {
                if (matched) { //정상 login
                    req.session.authUser = { username: username }; //세션에 authUser 추가
                    res.send({ username : username });
                }else {
                    //password 틀림
                    res.status(401).send({ok : false, message : msg.LOGIN_ERROR});
                }
            });
        }else{
            //HEAR 없는 ID
            res.status(401).send({ok : false, message : msg.LOGIN_ERROR});
        }
    }

    var error = function(error){
        res.status(500).send(error);
    }
    
    db.query(sql, [username], success, error);
})

router.post('/logout', function (req, res) {
    delete req.session.authUser;
    res.json({ ok: true });
})

module.exports = router