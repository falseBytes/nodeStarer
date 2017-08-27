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

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => { // Empty the database of the users before each test
            if (err) done(err);
            logger.info('User database cleared successfuly');
            done();
        });
    });

    /**
 * Test User ressource endpoints
 */

 describe('GET /users', ()=> {
    it('it should return list of users', (done) => {
        chai.request(server)
        .get('/api/users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eq(0);
            done();
        });
    });
 });


 describe('POST /api/register', ()=> {
    it('it should return register the given user', (done) => {
        const user = {
            'firstName': 'foo',
            'lastName': 'bar',
            'email': 'foo@bar.com',
            'password': 'foobar',
        };

        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
            res.should.have.status(201);
            res.headers.should.have.property('authorization');
            done();
        });
    });
 });
});


