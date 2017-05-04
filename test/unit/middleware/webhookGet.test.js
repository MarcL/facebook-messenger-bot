import {createRequest, createResponse} from 'node-mocks-http';
import webhookGet from '../../../src/middleware/webhookGet';

describe('webhookGet middleware', () => {
    let fakeRequest;
    let fakeResponse;
    let spyResponseSendStatus;
    let spyResponseStatus;
    let spyResponseSend;

    const defaultValidationToken = 'defaultValidationToken';

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
            webhookGet(defaultValidationToken)(fakeRequest, fakeResponse);

            expect(spyResponseSendStatus).to.have.been.calledWithExactly(403);
        });

        it('when hub.mode query parameter is not subscribe', () => {
            fakeRequest.query = {
                'hub.mode': 'notSubscribe'
            };

            webhookGet(defaultValidationToken)(fakeRequest, fakeResponse);

            expect(spyResponseSendStatus).to.have.been.calledWithExactly(403);
        });

        it('when hub.mode query parameter is subscribe but there is an invalid hub.verify_token', () => {
            fakeRequest.query = {
                'hub.mode': 'subscribe',
                'hub.verify_token': 'invalidVerifyToken'
            };

            webhookGet(defaultValidationToken)(fakeRequest, fakeResponse);

            expect(spyResponseSendStatus).to.have.been.calledWithExactly(403);
        });
    });

    it('should return 200 when validation passes', () => {
        fakeRequest.query = {
            'hub.mode': 'subscribe',
            'hub.verify_token': defaultValidationToken
        };

        webhookGet(defaultValidationToken)(fakeRequest, fakeResponse);

        expect(spyResponseStatus).to.have.been.calledWithExactly(200);
    });

    it('should respond with hub.challenge value when validation passes', () => {
        const givenHubChallenge = 'givenHubChallenge';

        fakeRequest.query = {
            'hub.mode': 'subscribe',
            'hub.verify_token': defaultValidationToken,
            'hub.challenge': givenHubChallenge
        };

        webhookGet(defaultValidationToken)(fakeRequest, fakeResponse);

        expect(spyResponseSend).to.have.been.calledWithExactly(givenHubChallenge);
    });
});
