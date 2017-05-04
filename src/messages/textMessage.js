import request from 'request';
import callSendAPI from '../services/sendApi';

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText, accessToken) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText,
            metadata: "DEVELOPER_DEFINED_METADATA"
        }
    };

    callSendAPI(messageData, accessToken, request);
}

export default sendTextMessage;
