import receivedMessageRead from '../../../src/events/receivedMessageRead';

describe('receivedMessageRead', () => {
    let spyConsoleLog;

    beforeEach(() => {
        spyConsoleLog = sinon.spy(console, 'log');
    });

    afterEach(() => {
        spyConsoleLog.restore();
    });

    it('should log expected message read sequence', () => {
        const givenSequenceNumber = 1234567890;
        const givenWatermark = 10101010;

        const givenEvent = {
            sender: {
                id: 123456789
            },
            recipient: {
                id: 987654321
            },
            read: {
                seq: givenSequenceNumber,
                watermark: givenWatermark
            }
        }

        receivedMessageRead(givenEvent);

        expect(spyConsoleLog)
            .to.have.been.calledWithExactly(
                'Received message read event for watermark %d and sequence number %d',
                givenWatermark,
                givenSequenceNumber
            );
    })
});
