import config from 'config';

const getValueFromEnvironmentOrConfig = (environmentVariableKey, configKey) => {
    return (process.env[environmentVariableKey]) ?
        process.env[environmentVariableKey] :
        config.get(configKey);
};

export default getValueFromEnvironmentOrConfig;
