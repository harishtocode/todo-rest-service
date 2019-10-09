const chai = require('chai');

chai.use(require('chai-http'));
const http = require('http');
chai.use(require('chai-json-schema'));
const router = require('../../bin/router');

const versionSchema = {
    title: 'version schema',
    type: 'object',
    required: ['name', 'version'],
    properties: {
        name: {
            type: 'string',
        },
        version: {
            type: 'string',
        },
    },
};

describe(
    'Test route health',
    () => {
        const server = http.createServer(router());
        const request = chai.request(server);
        after(done => server.close(done));

        it(
            'GET /health should return version JSON',
            (done) => {
                request
                    .get('/health') // make GET request
                    .set({ authorization: 'Bearer 74c65c3c-d63d-3fa0-959c-9f687d85d63d' })// set http-headers
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.jsonSchema(versionSchema);
                        done();
                    });
            },
        );
    },
);
