//example creating token with JWT

const jwt = require('jsonwebtoken');

const secret = 'example';
const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);//
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. header type of algorithim
//eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4NTY0MjEwMn0. //data payload
//gy4tp5o_0_qfMlfofEdkT4phdTQcGYXyI-c5h8fSOTY // signature secret
