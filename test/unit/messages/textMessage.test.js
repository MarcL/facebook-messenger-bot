import sendTextMessage from '../../../src/messages/textMessage';
import * as callSendAPI from '../../../src/services/sendApi';

describe('textMessage', () => {
    it('should make API call with expected message data', () => {
        const spyCallSendApi = sinon.spy(callSendAPI, 'default');
        const givenAccessToken = 'givenAccessToken';
        const givenRecipientId = 'givenRecipientId';
        const givenMessageText = 'givenMessageText';

        const givenMessageData = {
            recipient: {
                id: givenRecipientId
            },
            message: {
                text: givenMessageText,
                metadata: "DEVELOPER_DEFINED_METADATA"
            }
        };

        sendTextMessage(givenRecipientId, givenMessageText, givenAccessToken);

        expect(spyCallSendApi.getCall(0).args[0])
            .to.deep.equal(givenMessageData);

        spyCallSendApi.restore();
    });
});
