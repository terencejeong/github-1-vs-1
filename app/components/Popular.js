import React, { Component } from 'react';
import Loading from './Loading'
var PropTypes = require('prop-types');
var api = require('../utils/api')

// stateless functional component.
// Has no state. Recieve everything as props.
// just a function that returns some UI - in this case will change the language red when click and map the languages.
function SelectLanguage(props) {
  var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
    <ul className="languages" >
      {languages.map((lang) => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null }
            key={lang}
            onClick={props.onSelect.bind(null, lang)} >
            {lang}
          </li>
        )
      })}
    </ul>
  )
};

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return(
        <li key={repo.name} className="popular-item">
            <div className='popular-rank'>#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                className="avatar"
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                 />
              </li>
              <li href={repo.html_url}>{repo.name}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
        </li>
        )
      })}
    </ul>
  )
};

class Popular extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    // bind property takes in a context and returns a brand new function.
    // no matter what context this updateLangauge is going to be called in, it will always be called with the correct this keyword.
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    // AJAX request
    this.updateLanguage(this.state.selectedLanguage)
  }

// will update the state based on what is selected.
  updateLanguage(lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
  // make the GET request in API.
    api.fetchPopularRepos(lang)
    .then((repos) => {
      this.setState(() => {
        return {
          repos: repos
        }
      })
    })
    console.log('selected lang', lang)
  }

  render() {
  return(
    <div>
      <SelectLanguage
      selectedLanguage={this.state.selectedLanguage}
      onSelect={this.updateLanguage}
      />

      {!this.state.repos
        ? <Loading text="Downloading" speed={300}/>
      : <RepoGrid repos={this.state.repos} />}

    </div>
    )
  }
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

module.exports = Popular;
