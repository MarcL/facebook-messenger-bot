import crypto from 'crypto';
import {createRequest, createResponse} from 'node-mocks-http';
import verifyRequestSignature from '../../src/verifyRequestSignature';

describe('verifyRequestSignature', () => {
    let fakeRequest;
    let fakeResponse;
    let spyConsoleError;

    const defaultAppSecret = 'defaultAppSecret';
    const defaultBuffer = new Buffer('defaultBufferString');

    beforeEach(() => {
        fakeRequest = createRequest();
        fakeResponse = createResponse();
        spyConsoleError = sinon.spy(console, 'error');
    });

    afterEach(() => {
        spyConsoleError.restore();
    });

    it('should log an error if no signature header is present', () => {
        verifyRequestSignature(defaultAppSecret)(fakeRequest, fakeResponse, defaultBuffer);

        expect(spyConsoleError).to.have.been.calledWithExactly('Couldn\'t validate the signature.');
    });

    it('should throw expected error if request signature is incorrect', () => {
        const givenSignature = 'hello'
        fakeRequest.headers = {
            'x-hub-signature': `method=${givenSignature}`
        };

        const wrappedFunction = () => {
            verifyRequestSignature(defaultAppSecret)(fakeRequest, fakeResponse, defaultBuffer);
        };

        expect(wrappedFunction).to.throw('Couldn\'t validate the request signature.');
    });

    it('should not throw an error if request signature is correct', () => {
        const givenSignature = crypto.createHmac('sha1', defaultAppSecret)
            .update(defaultBuffer)
            .digest('hex');

        fakeRequest.headers = {
            'x-hub-signature': `method=${givenSignature}`
        };

        const wrappedFunction = () => {
            verifyRequestSignature(defaultAppSecret)(fakeRequest, fakeResponse, defaultBuffer);
        };

        expect(wrappedFunction).to.not.throw();
    });
});
