import config from 'config';
import getValueFromEnvironmentOrConfig from '../../src/configValues';

describe('config values', () => {
    let oldEnvironmentVariables;
    let stubConfigGet;

    const defaultConfigKey = 'defaultConfigKey';
    const defaultEnvironmentVariableKey = 'defaultEnvironmentVariableKey';

    beforeEach(() => {
        oldEnvironmentVariables = Object.assign({}, process.env);
        stubConfigGet = sinon.stub(config, 'get');
    });

    afterEach(() => {
        process.env = oldEnvironmentVariables;
        stubConfigGet.restore();
    });

    it('should retrieve value from environment variable if set', () => {
        const givenEnvironmentVariableValue = 'givenEnvironmentVariableValue';
        const givenEnvironmentVariableKey = 'givenEnvironmentVariableKey';
        process.env[givenEnvironmentVariableKey] = givenEnvironmentVariableValue;

        const returnedValue = getValueFromEnvironmentOrConfig(givenEnvironmentVariableKey, defaultConfigKey);

        expect(returnedValue).to.equal(givenEnvironmentVariableValue);
    });

    it('should retrieve value from config variable if environment variable is not set', () => {
        const givenConfigValue = 'givenConfigValue';
        const givenConfigKey = 'givenConfigKey';

        stubConfigGet.withArgs('givenConfigKey').returns(givenConfigValue);

        const returnedValue = getValueFromEnvironmentOrConfig(defaultEnvironmentVariableKey, givenConfigKey);

        expect(returnedValue).to.equal(givenConfigValue);
    });
});
