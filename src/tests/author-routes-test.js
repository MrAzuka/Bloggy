const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')

const server = require('../app')
const User = require('../models/author-model')

const expect = chai.expect

chai.use(chaiHttp)

const testAuthor = {
    username: "MrAzuka",
    email: "johntwice8@gmail.com",
    password: "testpassword1234"
}

describe("Test Author Authentication Route", () => {
    before(async () => {
        //delete al occurences of the test user from the db
        await User.deleteMany({ email: testAuthor.email });
    })
    describe("Test Registration Route", () => {
        it("Register Author", (done) => {
            chai.request(server)
            .post("/register")
            .send(testAuthor)
            .end((err,res) => {
                expect(err).to.be.null
    
            })
        })
    })
    
    
})