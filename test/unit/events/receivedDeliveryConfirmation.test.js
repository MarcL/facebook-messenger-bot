import receivedDeliveryConfirmation from '../../../src/events/receivedDeliveryConfirmation';

describe('receivedDeliveryConfirmation', () => {
    let spyConsoleLog;

    beforeEach(() => {
        spyConsoleLog = sinon.spy(console, 'log');
    });

    afterEach(() => {
        spyConsoleLog.restore();
    });

    it('should log all messages ids', () => {
        const givenMessageIds = [
            0, 1, 2, 3, 4, 5
        ];
        const givenWatermark = 10101010;

        const givenEvent = {
            sender: {
                id: 123456789
            },
            recipient: {
                id: 987654321
            },
            delivery: {
                mids: givenMessageIds,
                watermark: givenWatermark
            }
        }

        receivedDeliveryConfirmation(givenEvent);

        givenMessageIds.forEach((messageId, index) => {
            expect(spyConsoleLog.getCall(index).args)
                .to.deep.equal(['Received delivery confirmation for message ID: %s', messageId]);
        })
        expect(spyConsoleLog.callCount).to.equal(givenMessageIds.length + 1);
    })

    it('should log expected watermark', () => {
        const givenMessageIds = [
            0, 1
        ];
        const givenWatermark = 1234567890123456789;

        const givenEvent = {
            sender: {
                id: 123456789
            },
            recipient: {
                id: 987654321
            },
            delivery: {
                mids: givenMessageIds,
                watermark: givenWatermark
            }
        }

        receivedDeliveryConfirmation(givenEvent);

        givenMessageIds.forEach((messageId, index) => {
            expect(spyConsoleLog.getCall(index).args)
                .to.deep.equal(['Received delivery confirmation for message ID: %s', messageId]);
        })
        expect(spyConsoleLog.getCall(givenMessageIds.length).args)
            .to.deep.equal(['All message before %d were delivered.', givenWatermark]);
    })
});
