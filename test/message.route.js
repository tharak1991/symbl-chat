/**
 * Test cases for the apis
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = chai.expect;
const server = require('./../server');
const should = chai.should();


chai.use(chaiHttp);

/**
 * api : /message/state/:room_name
 */
describe("/GET state", () => {

    it("should return status 200", async () => {
            const res = await chai
                .request(server)
                .get('/message/state/a')
            expect(res.status).to.equal(200);
        }),
        it("should return object", async () => {
            const res = await chai
                .request(server)
                .get('/message/state/a')
            expect(res.body.should.be.a('object'));


        }),
        it("should have status and room_state as keys in response", async () => {
            const res = await chai
                .request(server)
                .get('/message/state/a')
            expect(res.body.should.have.keys('status', 'room_state'));

        })
});


/**
 * api : /message/likelihood/:user_name
 */
describe("/GET likelihood", () => {

    it("should return status 200", async () => {
            const res = await chai
                .request(server)
                .get('/message/likelihood/a')
            expect(res.status).to.equal(200);
        }),
        it("should return object", async () => {
            const res = await chai
                .request(server)
                .get('/message/likelihood/a')
            expect(res.body.should.be.a('object'));
        }),
        it("should have status and user_likelihood as keys in response", async () => {
            const res = await chai
                .request(server)
                .get('/message/likelihood/a')
            expect(res.body.should.have.keys('status', 'user_likelihood'));

        })
})