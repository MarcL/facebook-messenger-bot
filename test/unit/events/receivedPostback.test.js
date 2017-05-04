import receivedPostback from '../../../src/events/receivedPostback';
import * as sendTextMessage from '../../../src/messages/textMessage';

describe('receivedPostback', () => {
    let spySendTextMessage;

    beforeEach(() => {
        spySendTextMessage = sinon.spy(sendTextMessage, 'default');
    });

    afterEach(() => {
        spySendTextMessage.restore();
    });

    it('should send a text message with given event data', () => {
        const givenSenderId = 1234567;
        const givenPageAccessToken = 'givenPageAccessToken';
        const givenEvent = {
            sender: {
                id: givenSenderId
            },
            recipient: {
                id: 9876543210
            },
            postback: {
                payload: 'developer payload'
            },
            timestamp: 1010101010
        };

        receivedPostback(givenEvent, givenPageAccessToken);

        expect(spySendTextMessage)
            .to.have.been.calledWithExactly(
                givenSenderId,
                'Postback called',
                givenPageAccessToken
            );
    });
});
