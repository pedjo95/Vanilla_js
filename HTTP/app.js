const http = new EasyHTTP;

// User Data 
const data = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com'
}

//GET users
// http.get('https://jsonplaceholder.typicode.com/users')
// .then(data => console.log(data))
// .catch(error => console.log(error));

// Post user
// http.post('https://jsonplaceholder.typicode.com/users', data)
// .then(data => console.log(data))
// .catch(error => console.log(error));

// Update user
// http.put('https://jsonplaceholder.typicode.com/users/2', data)
// .then(data => console.log(data))
// .catch(error => console.log(error));

// Delete user
http.delete('https://jsonplaceholder.typicode.com/users/2')
.then(data => console.log(data))
.catch(error => console.log(error));


