import React, { Component } from 'react';
import Loading from './Loading'
const PropTypes = require('prop-types');
import {fetchPopularRepos} from '../utils/api';

// stateless functional component.
// Has no state. Recieve everything as props.
// just a function that returns some UI - in this case will change the language red when click and map the languages.
function SelectLanguage({selectedLanguage, onSelect}) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
    <ul className="languages" >
      {languages.map((lang) => (
          <li
            style={lang === selectedLanguage ? { color: '#d0021b' } : null }
            key={lang}
            onClick={() => onSelect(lang)} >
            {lang}
          </li>
      ))}
    </ul>
  )
};

function RepoGrid({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map((repo, index) => (
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
        ))}
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
    this.setState(() => ({selectedLanguage: lang, repos: null}));
    
  // make the GET request in API.
    fetchPopularRepos(lang)
    .then((repos) => {
      this.setState(() => ({ repos }))
    })
  };

  render() {
    const {selectedLanguage, repos} = this.state
  return(
    <div>
      <SelectLanguage
      selectedLanguage={selectedLanguage}
      onSelect={this.updateLanguage}
      />

      {!repos
        ? <Loading text="Downloading" speed={300}/>
      : <RepoGrid repos={repos} />}

    </div>
    )
  }
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Popular;
