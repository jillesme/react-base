const React = require('react');

class App extends React.createClass {
  constructor (props) {
    this.state = {
      message: 'Hello!'
    };
    document.title = props.title;
  }
  render () {
    return (
      <div>
        <h1>{ this.state.message }</h1>
      </div>
    );
  }
}

export default App;
