import config from 'config';

const getValueFromEnvironmentOrConfig = (environmentVariableKey, configKey) => {
    return (process.env[environmentVariableKey]) ?
        process.env[environmentVariableKey] :
        config.get(configKey);
};

const APP_SECRET = () => getValueFromEnvironmentOrConfig('MESSENGER_APP_SECRET', 'appSecret');

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = () => getValueFromEnvironmentOrConfig('MESSENGER_PAGE_ACCESS_TOKEN', 'pageAccessToken');

// URL where the app is running (include protocol). Used to point to scripts and
// assets located at this address.
const SERVER_URL = () => getValueFromEnvironmentOrConfig('SERVER_URL', 'serverURL');

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = () => getValueFromEnvironmentOrConfig('MESSENGER_VALIDATION_TOKEN', 'validationToken');

export {
    APP_SECRET,
    PAGE_ACCESS_TOKEN,
    SERVER_URL,
    VALIDATION_TOKEN
};
