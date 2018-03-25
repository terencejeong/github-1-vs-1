var axios = require('axios')

module.exports = {
  fetchPopularRepos(language) {
    var encoded = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+${language}:'/${language}/'&sort=stars&order=desc&type=Repositories`);

    return axios.get(encoded)
    .then(response => {
      console.log(response.data.items)
      return response.data.items
    });
  }
}
