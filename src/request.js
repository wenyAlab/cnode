const fetch = require('node-fetch');

// Make a request for a user with a given ID
export default  function getUser(params) {
  fetch(`/topics?tab=${params}`)
  .then(res => res.json())
  // .then(json => this.setState({userData: json.data}));
}