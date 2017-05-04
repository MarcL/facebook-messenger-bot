import receivedAccountLink from '../../../src/events/receivedAccountLink';

describe('receivedAccountLink', () => {
    let spyConsoleLog;

    beforeEach(() => {
        spyConsoleLog = sinon.spy(console, 'log');
    });

    afterEach(() => {
        spyConsoleLog.restore();
    });

    it('should log expected log account data', () => {
        const givenSenderId = 123456789;
        const givenStatus = 'givenStatus';
        const givenAuthorizationCode = 'givenAuthorizationCode';

        const givenEvent = {
            sender: {
                id: givenSenderId
            },
            recipient: {
                id: 987654321
            },
            account_linking: {
                status: givenStatus,
                authorization_code: givenAuthorizationCode
            }
        }

        receivedAccountLink(givenEvent);

        expect(spyConsoleLog)
            .to.have.been.calledWithExactly(
                'Received account link event with for user %d with status %s and auth code %s ',
                givenSenderId,
                givenStatus,
                givenAuthorizationCode
            );
    })
});
