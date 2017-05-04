import request from 'request';
import callSendAPI from '../services/sendApi';

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
