import {VALIDATION_TOKEN} from '../configValues';

function webhookMiddleware(request, response) {
    const validationToken = VALIDATION_TOKEN();
    if (request.query['hub.mode'] === 'subscribe' &&
        request.query['hub.verify_token'] === validationToken) {
        console.log("Validating webhook");
        response.status(200).send(request.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        response.sendStatus(403);
    }
}

export default webhookMiddleware;
