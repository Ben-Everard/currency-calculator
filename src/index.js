import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Selects from './components/selectOption';
import Results from './components/results';

import './styles.scss';

class App extends Component {
  state = {
    baseCurrency: '',
    convertTo: '',
    data: false,
    countries: {
      'Brazilian Real': 'BRL',
      'Mexico Peso': 'MXN',
      'Australian Dollar': 'AUD',
      'Hong Kong Dollar': 'HKD',
      'Romanian Leu': 'RON',
      'Croatian Kuna': 'HRK',
      'Swiss Franc': 'CHF',
      'Indonesian Rupiah': 'IDR',
      'Canadian Dollar': 'CAD',
      'United States Dollar': 'USD',
      'South African Rand': 'ZAR',
      'Japanese Yen': 'JPY',
      'Hungarian Forint': 'HUF',
      'Czech Koruna': 'CZK',
      'Norwegian Krone': 'NOK',
      'Indian Rupee': 'INR',
      'Polish Zloty': 'PLN',
      'Icelandic Krona': 'ISK',
      'Philippine Peso': 'PHP',
      'Swedish Krona': 'SEK',
      'Israeli New Shekel': 'ISL',
      'British Pound': 'GBP',
      'Singapore Dollar': 'SGD',
      'Chinese Yan': 'CNY',
      'Turkish Lira': 'TRY',
      'Malaysian Ringgit': 'MYR',
      'Russian Ruble': 'RUB',
      'New Zealand Dollar': 'NZD',
      'South Korean Won': 'KRW',
      'Thai Baht': 'THB',
      'Bulgarian Lev': 'BGN',
      'Danish Krone': 'DKK',
    },
  };

  baseChangeHandler = event => {
    this.setState({
      baseCurrency: event.target.value,
      baseCountry: event.target.options[event.target.selectedIndex].text,
    });
  };

  convertToChangeHandler = event => {
    this.setState({
      convertTo: event.target.value,
      convertCountry: event.target.options[event.target.selectedIndex].text,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.convertTo !== '' && nextState.baseCurrency !== '') {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.convertTo !== this.state.convertTo ||
      prevState.baseCurrency !== this.state.baseCurrency
    ) {
      let base = this.state.baseCurrency;
      let convert = this.state.convertTo;
      fetch(
        'https://api.exchangeratesapi.io/latest?symbols=' +
          convert +
          '&base=' +
          base +
          '&callback=MY_CALLBACK'
      )
        .then(results => {
          return results.json();
        })
        .then(data => {
          this.setState({
            data,
          });
        });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Currency Exchange with a little SASS</h1>
        <div className="select-container">
          <div className="select-box">
            <h4>Choose your base currency</h4>
            <Selects
              countries={this.state.countries}
              onChange={this.baseChangeHandler}
            />
          </div>
          <div className="select-box">
            <h4>Choose currency to convert into</h4>
            <Selects
              countries={this.state.countries}
              onChange={this.convertToChangeHandler}
            />
          </div>
        </div>
        {this.state.data ? (
          <Results
            data={this.state.data}
            baseCountry={this.state.baseCountry}
            convertCountry={this.state.convertCountry}
            convertTo={this.state.convertTo}
          />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
