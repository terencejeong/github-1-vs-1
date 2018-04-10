var axios = require('axios')

// const params = `?client_id=${id}&client_secret`

function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}`)
  .then((user) => user.data); 
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos`)
}

function getStarCount(repos){
  return repos.data.reduce((count, {stargazers_count}) => count + stargazers_count, 0)
}

function calculateScore(profile, repos){
  const followers = profile.followers; 
  return (followers * 3)+ getStarCount(repos);
}

function handleError(error) {
  console.warn(error); 
  return null
}

function getUserData(player){
  return Promise.all([
    getProfile(player), 
    getRepos(player)
  ]).then(([profile, repos]) => ({ 
      profile, 
      score: calculateScore(profile, repos)
    }))
  }
// since we destructured above don't need variables below. 
// const profile = data[0]; 
// const repos = data[1];
// also don't need return cause we are implicit returning an object


function sortPlayers(players){
  return players.sort((a,b) => b.score - a.score)
}

module.exports = {

  battle(players) {
    return axios.all(players.map(getUserData))
    .then(sortPlayers)
  }, 

  fetchPopularRepos(language) {
    const encoded = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+${language}:'/${language}/'&sort=stars&order=desc&type=Repositories`);

    return axios.get(encoded)
    .then(response => response.data.items);
  }
}
