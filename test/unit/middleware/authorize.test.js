import {createRequest, createResponse} from 'node-mocks-http';
import authorize from '../../../src/middleware/authorize';

describe('authorize middleware', () => {
    let fakeRequest;
    let fakeResponse;
    let spyResponseRender;

    beforeEach(() => {
        fakeRequest = createRequest();
        fakeResponse = createResponse();

        spyResponseRender = sinon.spy(fakeResponse, 'render');
    });

    it('should render expected authorize view', () => {
        const givenAccountLinkingToken = 'givenAccountLinkingToken';
        const givenRedirectUri = 'https://www.givenredirecturi.com';
        fakeRequest.query = {
            account_linking_token: givenAccountLinkingToken,
            redirect_uri: givenRedirectUri
        };

        const expectedRedirectUriSuccess = `${givenRedirectUri}&authorization_code=1234567890`;

        const expectedViewData = {
            accountLinkingToken: givenAccountLinkingToken,
            redirectURI: givenRedirectUri,
            redirectURISuccess: expectedRedirectUriSuccess
        };

        authorize(fakeRequest, fakeResponse);

        expect(spyResponseRender).to.have.been.calledWithExactly('authorize', expectedViewData);
    });
});
