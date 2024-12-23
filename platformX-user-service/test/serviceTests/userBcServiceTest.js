import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import accessTokenService from '../../services/accessTokenService.js'; // Adjust the path as necessary
import userBcservice from '../../services/businessCentral/userBcService.js';

describe('getResourceInfoByEmail', () => {
  let getDynamicTokenvalueStub;
  let axiosGetStub, axiosPostStub;

  beforeEach(() => {
    // Stub the accessTokenService.getDynamicTokenvalue method
    getDynamicTokenvalueStub = sinon.stub(accessTokenService, 'getDynamicTokenvalue');
    // Stub the axios.get method
    axiosGetStub = sinon.stub(axios, 'get');
    // Stub the axios.post method
    axiosPostStub = sinon.stub(axios, 'post');
  });

  afterEach(() => {
    // Restore the original methods after each test
    sinon.restore();
  });

  const mockToken = 'mock-access-token';
  const mockResponse = {
    data: {
      value: [
        { resourceId: 1, resourceName: 'Resource A' }
      ]
    }
  };


  it('should return resource data when the API call is successful for get user by email Id', async () => {

    // Stub the token retrieval to return a mock token
    getDynamicTokenvalueStub.resolves(mockToken);
    // Stub the API call to return mock data
    axiosGetStub.resolves(mockResponse);

    const result = await userBcservice.getResourceInfoByEmail('test@example.com');

    console.log(result); // Debugging output

    expect(result).to.be.an('array');
    expect(result[0]).to.include({ resourceId: 1, resourceName: 'Resource A' });
  });

  it('should return the resource details when the API call is successful', async () => {
    const email = 'test@example.com';
    const mockToken = 'mockAccessToken';
    const mockResponse = {
      data: {
        value: JSON.stringify([
          { resourceId: 1, resourceName: 'Resource A' }
        ])
      }
    };

    // Stub the token retrieval to return a mock token
    getDynamicTokenvalueStub.resolves(mockToken);

    // Stub the API call to return mock data
    axiosPostStub.resolves(mockResponse);

    const result = await userBcservice.getResourceDetail(email);

    console.log("Result:", result); // Debugging output

    expect(result).to.be.an('array');
    expect(result[0]).to.include({ resourceId: 1, resourceName: 'Resource A' });
  });


  it('should return an empty object when the API call fails', async () => {
    const email = 'test@example.com';
    const mockToken = 'mockAccessToken';

    // Stub the token retrieval to return a mock token
    getDynamicTokenvalueStub.resolves(mockToken);

    // Stub the API call to throw an error
    axiosPostStub.rejects(new Error('API call failed'));

    const result = await userBcservice.getResourceDetail(email);

    console.log("Result:", result); // Debugging output

    expect(result).to.deep.equal({});
  });
});