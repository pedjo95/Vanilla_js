function easyHTTP() {
  this.http = new XMLHttpRequest();
}

// Make a HTTP GET request
easyHTTP.prototype.get = function(url, callback) {
  this.http.open('GET', url, true);

  let self = this;
  this.http.onload = function() {
    if(self.http.status === 200) {
      callback(null, self.http.responseText);
    } else {
      callback('Error: ' + self.http.status);
    }
  }
  this.http.send();
}
// Make a HTTP POST request
easyHTTP.prototype.post = function(url, data, callback)
// Make a HTTP PUT request
// Make a HTTP DELETE request