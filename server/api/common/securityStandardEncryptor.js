/*
/ Can be used the same way as Spring Framework Security's standard encryption implementation
/ http://docs.spring.io/autorepo/docs/spring-security/3.2.0.RELEASE/apidocs/org/springframework/security/crypto/encrypt/Encryptors.html
*/

const crypto = require('crypto');

exports.decrypt = (password, saltHex, ivAndCipherTextHex) => {
  const salt = Buffer.from(saltHex, 'hex');
  const key = crypto.pbkdf2Sync(password, salt, 1024, 32, 'sha1');
  const cipher = Buffer.from(ivAndCipherTextHex, 'hex');
  const iv = cipher.slice(0, 16);
  const cipherText = cipher.slice(16, cipher.length);

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  try {
    return Buffer.concat(
      [
        decipher.update(cipherText),
        decipher.final(),
      ]
    ).toString('utf8');
  } catch (err) {
    console.error(err);
    return false;
  }
};

exports.encrypt = (password, text) => {
  const salt = crypto.randomBytes(8);
  const key = crypto.pbkdf2Sync(password, salt, 1024, 32).toString('binary');
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  cipher.update(text, 'utf8');
  try {
    return {
      cipher: Buffer.from(iv, 'binary').toString('hex') + cipher.final('hex'),
      salt: Buffer.from(salt, 'binary').toString('hex'),
    };
  } catch (err) {
    return false;
  }
};
