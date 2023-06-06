//example verification with JWT

const jwt = require('jsonwebtoken');

const secret = 'example';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4NTY0MjEwMn0.gy4tp5o_0_qfMlfofEdkT4phdTQcGYXyI-c5h8fSOTY';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);// { sub: 1, role: 'customer', iat: 1685642102 }
