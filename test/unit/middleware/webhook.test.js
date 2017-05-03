import {createRequest, createResponse} from 'node-mocks-http';
import webhook from '../../../src/middleware/webhook';

describe('webhook middleware', () => {
    let fakeRequest;
    let fakeResponse;
    let spyResponseSendStatus;
    let spyResponseStatus;
    let spyResponseSend;

    beforeEach(() => {
        fakeRequest = createRequest();
        fakeResponse = createResponse();

        spyResponseSendStatus = sinon.spy(fakeResponse, 'sendStatus');
        spyResponseStatus = sinon.spy(fakeResponse, 'status');
        spyResponseSend = sinon.spy(fakeResponse, 'send');
    });

    afterEach(() => {
        spyResponseSendStatus.restore();
        spyResponseStatus.restore();
        spyResponseSend.restore();
    });

    describe('should fail validation', () => {
        it('fail validation when no hub.mode query parameter is present', () => {
            webhook(fakeRequest, fakeResponse);

            expect(spyResponseSendStatus).to.have.been.calledWithExactly(403);
        });

        it('when hub.mode query parameter is not subscribe', () => {
            fakeRequest.query = {
                'hub.mode': 'notSubscribe'
            };

            webhook(fakeRequest, fakeResponse);

            expect(spyResponseSendStatus).to.have.been.calledWithExactly(403);
        });

        it('when hub.mode query parameter is subscribe but there is an invalid hub.verify_token', () => {
            fakeRequest.query = {
                'hub.mode': 'subscribe',
                'hub.verify_token': 'invalidVerifyToken'
            };

            webhook(fakeRequest, fakeResponse);

            expect(spyResponseSendStatus).to.have.been.calledWithExactly(403);
        });
    });

    it('should return 200 when validation passes', () => {
        fakeRequest.query = {
            'hub.mode': 'subscribe',
            'hub.verify_token': 'VALIDATION_TOKEN'
        };

        webhook(fakeRequest, fakeResponse);

        expect(spyResponseStatus).to.have.been.calledWithExactly(200);
    });

    it('should respond with hub.challenge value when validation passes', () => {
        const givenHubChallenge = 'givenHubChallenge';

        fakeRequest.query = {
            'hub.mode': 'subscribe',
            'hub.verify_token': 'VALIDATION_TOKEN',
            'hub.challenge': givenHubChallenge
        };

        webhook(fakeRequest, fakeResponse);

        expect(spyResponseSend).to.have.been.calledWithExactly(givenHubChallenge);
    });
});
