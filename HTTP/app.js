const http = new easyHTTP;

// Get Posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(error, posts) {
  // if(error) {
  //   console.log(error);
  // } else {
  //   console.log(posts);
  // }
// });

// Post Posts
const data = {
  title: "Custom Post",
  body: "This is a custom post"
};
// Create post
http.post('https://jsonplaceholder.typicode.com/posts', data, function(error, post) {
  if(error) {
    console.log(error);
  } else {
    console.log(post);
  }
});

