import axios from 'axios'; 

// const params = `?client_id=${id}&client_secret`

async function getProfile(username) {
  const profile = await axios.get(`https://api.github.com/users/${username}`)
  return profile.data
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

async function getUserData(player){
    const [ profile, repos ] = await Promise.all([
      getProfile(player), 
      getRepos(player)
    ])

    return {
      profile, 
      score: calculateScore(profile, repos)
    }
  }
// since we destructured above don't need variables below. 
// const profile = data[0]; 
// const repos = data[1];
// also don't need return cause we are implicit returning an object


function sortPlayers(players){
  return players.sort((a,b) => b.score - a.score)
}

export async function battle(players) {
  const results = await Promise.all(players.map(getUserData))
  .catch(handleError);

  return results === null 
  ? results 
  : sortPlayers(results)
 
}

export async function fetchPopularRepos(language) {
  const encoded = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+${language}:'/${language}/'&sort=stars&order=desc&type=Repositories`);

  const repos = await axios.get(encoded)
    .catch(handleError);
  return repos.data.items; 
}

// before refactor. 
// module.exports = {

//   battle(players) {
//     return axios.all(players.map(getUserData))
//     .then(sortPlayers)
//   }, 

//   fetchPopularRepos(language) {
//     const encoded = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+${language}:'/${language}/'&sort=stars&order=desc&type=Repositories`);

//     return axios.get(encoded)
//     .then(response => response.data.items);
//   }
// }
