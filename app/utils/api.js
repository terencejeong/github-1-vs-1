var axios = require('axios')

// const params = `?client_id=${id}&client_secret`

function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}`)
  .then(user => {
    console.log(user.data)
    return user.data
  })
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos`)
}

function getStarCount(repos){
  return repos.data.reduce(function(count, repo){
    return count + repo.stargazers_count
  }, 0)
}

function calculateScore(profile, repos){
  const followers = profile.followers; 
  const totalStars = getStarCount(repos)

  return (followers * 3) + totalStars
}

function handleError(error) {
  console.warn(error); 
  return null
}

function getUserData(player){
  return axios.all([
    getProfile(player), 
    getRepos(player)
  ]).then((data) => {
    const profile = data[0]; 
    const repos = data[1]; 

    return {
      profile: profile, 
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers(players){
  return players.sort(function(a,b){
    return b.score - a.score; 
  })
}

module.exports = {

  battle(players) {
    console.log('players', players)
    return axios.all(players.map(getUserData))
    .then(sortPlayers)
  }, 

  fetchPopularRepos(language) {
    var encoded = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+${language}:'/${language}/'&sort=stars&order=desc&type=Repositories`);

    return axios.get(encoded)
    .then(response => {
      console.log(response.data.items)
      return response.data.items
    });
  }
}
