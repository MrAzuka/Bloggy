const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../server')

const expect = chai.expect

chai.use(chaiHttp)

const testAuthor = {
    username: "MrAzuka",
    email: "johntwice8@gmail.com",
    password: "testpassword1234"
}