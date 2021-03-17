import callSendAPI from '../services/sendApi';
import sendTextMessage from '../messages/textMessage';

/*
 * Send an image using the Send API.
 *
 */
function sendImageMessage(recipientId, pageAccessToken, serverUrl) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: serverUrl + "/assets/rift.png"
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a Gif using the Send API.
 *
 */
function sendGifMessage(recipientId, pageAccessToken, serverUrl) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: serverUrl + "/assets/instagram_logo.gif"
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send audio using the Send API.
 *
 */
function sendAudioMessage(recipientId, pageAccessToken, serverUrl) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "audio",
        payload: {
          url: serverUrl + "/assets/sample.mp3"
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a video using the Send API.
 *
 */
function sendVideoMessage(recipientId, pageAccessToken, serverUrl) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "video",
        payload: {
          url: serverUrl + "/assets/allofus480.mov"
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a file using the Send API.
 *
 */
function sendFileMessage(recipientId, pageAccessToken, serverUrl) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "file",
        payload: {
          url: serverUrl + "/assets/test.txt"
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a button message using the Send API.
 *
 */
function sendButtonMessage(recipientId, pageAccessToken) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "This is test text",
          buttons:[{
            type: "web_url",
            url: "https://www.oculus.com/en-us/rift/",
            title: "Open Web URL"
          }, {
            type: "postback",
            title: "Trigger Postback",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }, {
            type: "phone_number",
            title: "Call Phone Number",
            payload: "+16505551234"
          }]
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a Structured Message (Generic Message type) using the Send API.
 *
 */
function sendGenericMessage(recipientId, pageAccessToken, serverUrl) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",
            image_url: serverUrl + "/assets/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",
            image_url: serverUrl + "/assets/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a receipt message using the Send API.
 *
 */
function sendReceiptMessage(recipientId, pageAccessToken, serverUrl) {
  // Generate a random receipt ID as the API requires a unique ID
  var receiptId = "order" + Math.floor(Math.random()*1000);

  var messageData = {
    recipient: {
      id: recipientId
    },
    message:{
      attachment: {
        type: "template",
        payload: {
          template_type: "receipt",
          recipient_name: "Peter Chang",
          order_number: receiptId,
          currency: "USD",
          payment_method: "Visa 1234",
          timestamp: "1428444852",
          elements: [{
            title: "Oculus Rift",
            subtitle: "Includes: headset, sensor, remote",
            quantity: 1,
            price: 599.00,
            currency: "USD",
            image_url: serverUrl + "/assets/riftsq.png"
          }, {
            title: "Samsung Gear VR",
            subtitle: "Frost White",
            quantity: 1,
            price: 99.99,
            currency: "USD",
            image_url: serverUrl + "/assets/gearvrsq.png"
          }],
          address: {
            street_1: "1 Hacker Way",
            street_2: "",
            city: "Menlo Park",
            postal_code: "94025",
            state: "CA",
            country: "US"
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66
          },
          adjustments: [{
            name: "New Customer Discount",
            amount: -50
          }, {
            name: "$100 Off Coupon",
            amount: -100
          }]
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a message with Quick Reply buttons.
 *
 */
function sendQuickReply(recipientId, pageAccessToken) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Action",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Comedy",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type":"text",
          "title":"Drama",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        }
      ]
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a read receipt to indicate the message has been read
 *
 */
function sendReadReceipt(recipientId, pageAccessToken) {
  console.log("Sending a read receipt to mark message as seen");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "mark_seen"
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Turn typing indicator on
 *
 */
function sendTypingOn(recipientId, pageAccessToken) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Turn typing indicator off
 *
 */
function sendTypingOff(recipientId, pageAccessToken) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Send a message with the account linking call-to-action
 *
 */
function sendAccountLinking(recipientId, pageAccessToken, serverUrl) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Welcome. Link your account.",
          buttons:[{
            type: "account_link",
            url: serverUrl + "/authorize"
          }]
        }
      }
    }
  };

  callSendAPI(messageData, pageAccessToken);
}

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message'
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've
 * created. If we receive a message with an attachment (image, video, audio),
 * then we'll simply confirm that we've received the attachment.
 *
 */
function receivedMessage(event, pageAccessToken, serverUrl) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and app %d with metadata %s",
      messageId, appId, metadata);
    return;
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with payload %s",
      messageId, quickReplyPayload);

    sendTextMessage(senderID, "Quick reply tapped", pageAccessToken);
    return;
  }

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID, pageAccessToken, serverUrl);
        break;

      case 'gif':
        sendGifMessage(senderID, pageAccessToken, serverUrl);
        break;

      case 'audio':
        sendAudioMessage(senderID, pageAccessToken, serverUrl);
        break;

      case 'video':
        // sendVideoMessage(senderID, pageAccessToken);
        sendTextMessage(senderID, 'Sorry, video was too big', pageAccessToken);
        break;

      case 'file':
        sendFileMessage(senderID, pageAccessToken, serverUrl);
        break;

      case 'button':
        sendButtonMessage(senderID, serverUrl);
        break;

      case 'generic':
        sendGenericMessage(senderID, serverUrl);
        break;

      case 'receipt':
        sendReceiptMessage(senderID, serverUrl);
        break;

      case 'quick reply':
        sendQuickReply(senderID, serverUrl);
        break;

      case 'read receipt':
        sendReadReceipt(senderID, serverUrl);
        break;

      case 'typing on':
        sendTypingOn(senderID, serverUrl);
        break;

      case 'typing off':
        sendTypingOff(senderID, serverUrl);
        break;

      case 'account linking':
        sendAccountLinking(senderID, pageAccessToken, serverUrl);
        break;

      default:
        sendTextMessage(senderID, messageText, serverUrl);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received", pageAccessToken);
  }
}

export default receivedMessage;
