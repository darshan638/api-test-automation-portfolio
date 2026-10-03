const {test, expect} = require('@playwright/test');

test('Get users API', async ({request}) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  console.log('Status:', response.status());
  const responseBody = await response.json();
  console.log('Response:',responseBody);
  expect(response.status()).toBe(200);

});



test(' POST request creates a new user', async ({request}) => {

    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
        data: {
            name: 'John Doe',
            username: 'johndoe',
            email: 'john.doe@example.com'
        }
    });
    console.log('Status:', response.status());
    const body = await response.json();
    console.log('Created User:', body);

    expect(response.status()).toBe(201);
    expect(body.name).toBe('John Doe');
});


test('PUT request updates an existing user', async ({request}) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
        data: {
            name: 'Jane Doe',
            username: 'janedoe',
            email: 'jane.doe@example.com'
        }
    });
    console.log('Status:', response.status());
    const body = await response.json();
    console.log('Updated User:', body);

    expect(response.status()).toBe(200);
    expect(body.name).toBe('Jane Doe');
});

test('DELETE request removes a user', async ({request}) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/users/1');
    console.log('Status:', response.status());
    expect(response.status()).toBe(200);
});


test('GET request for a non-existent user returns 404', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/9999');
    console.log('Status:', response.status());
    expect(response.status()).toBe(404);
});

test('POST request with missing fields still returns 201 (known API quirk)', async ({request}) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
        data: {
           //completely empty payload
        }
    });
    console.log('Status:', response.status());
   

    expect(response.status()).toBe(201);
    
});