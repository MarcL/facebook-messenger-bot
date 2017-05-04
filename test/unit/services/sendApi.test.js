// import callSendApi from '../../../src/services/sendApi';
import proxyquire from 'proxyquire';
// import * as request from 'request';

// TODO - proxyquire request

describe('callSendApi', () => {
    let stubRequest;
    let spyConsoleLog;
    let spyConsoleError;
    let callSendApi;

    const defaultAccessToken = 'defaultAccessToken';
    const defaultRequestData = {
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: defaultAccessToken
        },
        method: 'POST',
        json: {
            key: 'value'
        }
    };


    beforeEach(() => {
        stubRequest = sinon.stub();
        callSendApi = proxyquire('../../../src/services/sendApi', {
            'request': stubRequest
        }).default;

        spyConsoleLog = sinon.spy(console, 'log');
        spyConsoleError = sinon.spy(console, 'error');
    });

    afterEach(() => {
        spyConsoleLog.restore();
        spyConsoleError.restore();
    });

    it('should make expected POST request', () => {
        const givenAccessToken = 'givenAccessToken';
        const givenMessageData = {
            key: 'value'
        };

        const givenRequestData = {
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: givenAccessToken
            },
            method: 'POST',
            json: givenMessageData
        };

        callSendApi(givenMessageData, givenAccessToken);

        expect(stubRequest.getCall(0).args[0]).to.deep.equal(givenRequestData);
    });

    describe('when request is successful', () => {
        const defaultSuccessResponse = {
            statusCode: 200
        };

        it('should log expected message when API responds with message ID', () => {
            const givenRecipientId = 'givenRecipientId';
            const givenMessageId = 'givenMessageId';

            const givenBody = {
                recipient_id: givenRecipientId,
                message_id: givenMessageId
            };

            stubRequest.yields(null, defaultSuccessResponse, givenBody);

            callSendApi(defaultRequestData, defaultAccessToken);

            expect(spyConsoleLog.getCall(0).args).to.deep.equal([
                'Successfully sent message with id %s to recipient %s',
                givenMessageId,
                givenRecipientId
            ]);
        });

        it('should log expected message when API responds without message ID', () => {
            const givenRecipientId = 'givenRecipientId';

            const givenBody = {
                recipient_id: givenRecipientId,
            };

            stubRequest.yields(null, defaultSuccessResponse, givenBody);

            callSendApi(defaultRequestData, defaultAccessToken);

            expect(spyConsoleLog.getCall(0).args).to.deep.equal([
                'Successfully called Send API for recipient %s',
                givenRecipientId
            ]);
        });
    });

    describe('when request is successful', () => {
        it('should log expected message when API responds with an error', () => {
            const givenBody = {
                error: 'givenError'
            };

            const givenErrorResponse = {
                statusCode: 400,
                statusMessage: 'givenStatusMessage'
            };

            stubRequest.yields('error', givenErrorResponse, givenBody);

            callSendApi(defaultRequestData, defaultAccessToken);

            expect(spyConsoleError.getCall(0).args).to.deep.equal([
                'Failed calling Send API',
                givenErrorResponse.statusCode,
                givenErrorResponse.statusMessage,
                givenBody.error
            ]);
        });

        it('should log expected message when API responds with a non-200 HTTP code', () => {
            const givenBody = {
                error: 'givenError'
            };

            const givenErrorResponse = {
                statusCode: 400,
                statusMessage: 'givenStatusMessage'
            };

            stubRequest.yields(null, givenErrorResponse, givenBody);

            callSendApi(defaultRequestData, defaultAccessToken);

            expect(spyConsoleError.getCall(0).args).to.deep.equal([
                'Failed calling Send API',
                givenErrorResponse.statusCode,
                givenErrorResponse.statusMessage,
                givenBody.error
            ]);
        });
    });
});
