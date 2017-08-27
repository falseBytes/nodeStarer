const User = require('../models/User').User;
const logger = require('../utils/logger');


// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let server = require('../index');

chai.use(chaiHttp);

/*
The parent testing block of user ressource
 
 */

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => { // Empty the database of the users before each test
            if (err) done(err);
            logger.info('User database cleared successfuly');
            done();
        });
    });

    /**
 * Test GET /api
 */

 describe('GET /api', ()=> {
    it('it should return an api works message', (done) => {
        chai.request(server)
        .get('/api')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
 });
});


