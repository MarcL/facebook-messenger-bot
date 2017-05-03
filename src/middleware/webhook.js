// TODO fixme
const VALIDATION_TOKEN = 'VALIDATION_TOKEN';
function webhookMiddleware(request, response) {
    if (request.query['hub.mode'] === 'subscribe' &&
        request.query['hub.verify_token'] === VALIDATION_TOKEN) {
        console.log("Validating webhook");
        response.status(200).send(request.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        response.sendStatus(403);
    }
}

export default webhookMiddleware;
