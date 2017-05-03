import config from 'config';
import * as configValues from '../../src/configValues';

describe('config values', () => {
    let oldEnvironmentVariables;
    let stubConfigGet;

    beforeEach(() => {
        oldEnvironmentVariables = Object.assign({}, process.env);
        stubConfigGet = sinon.stub(config, 'get');
    });

    afterEach(() => {
        process.env = oldEnvironmentVariables;
        stubConfigGet.restore();
    });

    describe('APP_SECRET', () => {
        it('should retrieve expected value from MESSENGER_APP_SECRET environment variable', () => {
            const givenAppSecret = 'givenAppSecret';
            process.env['MESSENGER_APP_SECRET'] = givenAppSecret;

            expect(configValues.APP_SECRET()).to.equal(givenAppSecret);
        });

        it('should retrieve expected value from config if MESSENGER_APP_SECRET environment variable is not set', () => {
            const givenAppSecret = 'givenAppSecret';

            stubConfigGet.withArgs('appSecret').returns(givenAppSecret);

            expect(configValues.APP_SECRET()).to.equal(givenAppSecret);
        });
    });

    describe('PAGE_ACCESS_TOKEN', () => {
        it('should retrieve expected value from MESSENGER_PAGE_ACCESS_TOKEN environment variable', () => {
            const givenPageAccessToken = 'givenPageAccessToken';
            process.env['MESSENGER_PAGE_ACCESS_TOKEN'] = givenPageAccessToken;

            expect(configValues.PAGE_ACCESS_TOKEN()).to.equal(givenPageAccessToken);
        });

        it('should retrieve expected value from config if MESSENGER_PAGE_ACCESS_TOKEN environment variable is not set', () => {
            const givenPageAccessToken = 'givenPageAccessToken';

            stubConfigGet.withArgs('pageAccessToken').returns(givenPageAccessToken);

            expect(configValues.PAGE_ACCESS_TOKEN()).to.equal(givenPageAccessToken);
        });
    });

    describe('SERVER_URL', () => {
        it('should retrieve expected value from SERVER_URL environment variable', () => {
            const givenServerUrl = 'givenServerUrl';
            process.env['SERVER_URL'] = givenServerUrl;

            expect(configValues.SERVER_URL()).to.equal(givenServerUrl);
        });

        it('should retrieve expected value from config if SERVER_URL environment variable is not set', () => {
            const givenServerUrl = 'givenServerUrl';

            stubConfigGet.withArgs('serverURL').returns(givenServerUrl);

            expect(configValues.SERVER_URL()).to.equal(givenServerUrl);
        });
    });

    describe('VALIDATION_TOKEN', () => {
        it('should retrieve expected value from MESSENGER_VALIDATION_TOKEN environment variable', () => {
            const givenValidationToken = 'givenValidationToken';
            process.env['MESSENGER_VALIDATION_TOKEN'] = givenValidationToken;

            expect(configValues.VALIDATION_TOKEN()).to.equal(givenValidationToken);
        });

        it('should retrieve expected value from config if MESSENGER_VALIDATION_TOKEN environment variable is not set', () => {
            const givenValidationToken = 'givenValidationToken';

            stubConfigGet.withArgs('validationToken').returns(givenValidationToken);

            expect(configValues.VALIDATION_TOKEN()).to.equal(givenValidationToken);
        });
    });
});
