//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
var expect = chai.expect;
let server = require('./../server');
let should = chai.should();


chai.use(chaiHttp);

/*
 * Test the /GET route
 */
// describe('/GET state', () => {
//     it('it should GET the state of the user', (done) => {
//         chai.request(server)
//             .get('/message/state/a')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//             });
//     });
// });

describe("/GET state", () => {

    it("should return status 200", async () => {
        let res = await chai
            .request('http://localhost:5000')
            .get('/message/state/a')

        expect(res.status).to.equal(200);

    })

})