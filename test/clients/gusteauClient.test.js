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

  it('should delete an access token', async () => {
    let client = new GusteauClient('http://www.gusteau.com');
    sinon.stub(client, 'doDelete')
      .withArgs({
        path: '/token',
        deserialize: false,
        skipBearer: true,
        body: {
          access_token: '70k3n'
        }
      })
      .returns(Promise.resolve({status: 200}));

    let result = await client.deleteToken('70k3n');

    expect(result).to.deep.equal({status: 200});
  });

  it('should send the right request when getting all recipes', async () => {
    let client = new GusteauClient('http://www.gusteau.com');
    sinon.stub(client, 'doGet')
      .withArgs({
        path: '/recipes',
        deserialize: true,
        cache: 'recipes'
      })
      .returns(Promise.resolve({
        status: 200,
        body: [{_id: '001', name: 'Rice n Beans'}, {_id: '002', name: 'Chifrijo'}]
      }));

    let result = await client.getRecipes();

    expect(result).to.deep.equal({
      status: 200,
      body: [{_id: '001', name: 'Rice n Beans'}, {_id: '002', name: 'Chifrijo'}]
    });
  });

  it('should send the right request when getting all recipes with an offset', async () => {
    let client = new GusteauClient('http://www.gusteau.com');
    sinon.stub(client, 'doGet')
      .withArgs({
        path: '/recipes?offset=001',
        deserialize: true,
        cache: undefined
      })
      .returns(Promise.resolve({
        status: 200,
        body: [{_id: '002', name: 'Chifrijo'}]
      }));

    let result = await client.getRecipes('001');

    expect(result).to.deep.equal({status: 200, body: [{_id: '002', name: 'Chifrijo'}]});
  });

  it('should send the right request when getting the categories', async () => {
    let client = new GusteauClient('http://www.gusteau.com');
    sinon.stub(client, 'doGet')
      .withArgs({
        path: '/categories',
        deserialize: true,
        cache: 'categories'
      })
      .returns(Promise.resolve({
        status: 200,
        body: [{_id: '001', name: 'pasta', description: 'Pasta'}]
      }));

    let result = await client.getCategories();

    expect(result).to.deep.equal({status: 200, body: [{_id: '001', name: 'pasta', description: 'Pasta'}]});
  });

});