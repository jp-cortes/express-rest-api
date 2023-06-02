const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'example';
  //example of the password encrypted
  const hash = '$2b$20$efkjhfjhfvtgf76876f.iyfvo8798gvhg';
  const isMatch = await bcrypt.compare(password, hash);
  console.log(isMatch);//output will be tru if thereis a match
}

hashPassword();
