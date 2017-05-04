import receivedAuthentication from '../../../src/events/receivedAuthentication';
import * as sendTextMessage from '../../../src/messages/textMessage';

describe('receivedAuthentication', () => {
    it('should send a text message with given event data', () => {
        const spySendTextMessage = sinon.spy(sendTextMessage, 'default');
        const givenSenderId = 1234567;
        const givenPageAccessToken = 'givenPageAccessToken';
        const givenEvent = {
            sender: {
                id: givenSenderId
            },
            recipient: {
                id: 9876543210
            },
            optin: {
                ref: 'givenRef'
            },
            timestamp: 1010101010
        };

        receivedAuthentication(givenEvent, givenPageAccessToken);

        expect(spySendTextMessage)
            .to.have.been.calledWithExactly(
                givenSenderId,
                'Authentication successful',
                givenPageAccessToken
            );
    });
});
