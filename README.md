```js

class Popular extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    // bind property takes in a context and returns a brand new function.
    // no matter what context this updateLangauge is going to be called in, it will always be called with the correct this keyword.
    this.updateLanguage = this.updateLanguage.bind(this);
  }

// will update the state based on what is selected.
// before we didn
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      }
    })
  }


  render() {
  var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
  console.log('up here', this)
  return(
      <ul className="languages" >
        {languages.map(function(lang) {
          console.log(this)
          return (
            <li key={lang} onClick={this.updateLanguage}>
              {lang}
            </li>
          )
        })}
      </ul>
    )
  }
}

module.exports = Popular;
```

this, is still undefined in our map method. Mapping can take a second argument so we pass this in and should be a -ok

```js
updateLanguage(lang) {
  this.setState(function() {
    return {
      selectedLanguage: lang
    }
  })
}


render() {
var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
console.log('up here', this)
return(
    <ul className="languages" >
      {languages.map(function(lang) {
        console.log(this)
        return (
          <li key={lang} onClick={this.updateLanguage}>
            {lang}
          </li>
        )
      }, this)}
    </ul>
  )
}
}

module.exports = Popular;
```

```
