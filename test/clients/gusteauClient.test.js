import GusteauClient from '../../src/clients/gusteauClient';

describe('GusteauClient', () => {

  it('should send the right request when requesting a token', async () => {
    let client = new GusteauClient('http://www.gusteau.com');
    sinon.stub(client, 'doPost')
      .withArgs({
        path: '/token',
        deserialize: true,
        skipBearer: true,
        body: {
          grant_type: 'implicit',
          client_id: 'gusteau',
          username: 'andres',
          password: 'password'
        }
      })
      .returns(Promise.resolve({status: 200, body: {access_token: '70k3n'}}));

    let result = await client.getToken('andres', 'password');

    expect(result).to.deep.equal({status: 200, body: {access_token: '70k3n'}});
  });
});