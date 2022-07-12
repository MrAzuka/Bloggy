process.env.NODE_ENV = "test"
const chai = require('chai')
const chaiHttp = require('chai-http')
const {
    describe
} = require('mocha')

const server = require('../app')
const User = require('../models/author-model')

const expect = chai.expect

chai.use(chaiHttp)

const testAuthor = {
    username: "MrAzuka",
    email: "johntwice8@gmail.com",
    password: "testpassword1234"
}

const noEmailAuthor = {
    username: "noEmail",
    password: "testpassword1234"
}

const noUsernameAuthor = {
    email: "noUsername@gmail.com",
    password: "testpassword1234"
}

const noPasswordAuthor = {
    username: "noPassword",
    email: "noPassword@gmail.com"
}
describe("Test Author Authentication Route", () => {

    before(async () => {
        //delete all occurences of the test user from the db
        await User.deleteMany({
            email: testAuthor.email
        });
    })
    // Testing the registration route
    describe("Test Registration Route", () => {

        it("Register Author", (done) => {
            chai.request(server)
                .post("/register")
                .send(testAuthor)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.string
                    expect(res.body.message).to.deep.equal("Author Registered Successfully")
                    done()
                })
        })

        it("Check if Author has Username", (done) => {
            chai.request(server)
                .post('/register')
                .send(noUsernameAuthor)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
        })

        it("Check if Author has Email", (done) => {
            chai.request(server)
                .post('/register')
                .send(noEmailAuthor)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
        })

        it("Check if Author has Password", (done) => {
            chai.request(server)
                .post('/register')
                .send(noPasswordAuthor)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    done()
                })
        })
    })

    // Testing the Login route
    describe("Test Login Route", () => {
        it("Login Author", (done) => {
            chai.request(server)
                .post('/login')
                .send(testAuthor)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.string
                    expect(res.body.message).to.deep.equal("Author is logged in")
                    done()
                })
        })

        it("check if email is provided for login exists", (done) => {
            chai.request(server)
                .post('/login')
                .send({
                    email: " ",
                    password: testAuthor.password
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.string
                    expect(res.body.message).to.deep.equal("User with email not found")
                    done()
                })
        })

        it("check if email or password is provided for login", (done) => {
            chai.request(server)
                .post('/login')
                .send({
                    email: testAuthor.email,
                    password: ""
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.be.string
                    expect(res.body.message).to.deep.equal("email and password are required")
                    done()
                })
        })
    })

    // Testing the Forgot Password route
    // describe("Test Forget-Password Route", () => {
    //     it("")
    // })
})