const bcrypt = require('bcrypt');

//example how would work bcrypt
async function hashPassword() {
  const password = 'example';

  const hash = await bcrypt.hash(password, 20);
  console.log(hash);//$2b$20$...
  //$2b tipe of algorithim use
  //$20 number of times encrypted
}

hashPassword();
