process.env.NODE_ENV = "test"
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../app')

const expect = chai.expect

chai.use(chaiHttp)


describe("Testing Home Route", () => {
    it("Get Home page", (done) => {
        chai.request(server)
        .get("/")
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('articles')
            expect(res.body.message).to.be.string
            expect(res.body.articles).to.be.an('array')
            expect(res.body.message).to.deep.equal("Welcome to Bloggy")
            done()
        })
    })
})