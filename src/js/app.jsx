let App = React.createClass({
  getInitialState () {
    return {
      message: 'Hello!'
    };
  },
  render () {
    return (
      <div>
        <h1>{ this.state.message }</h1>
      </div>
    );
  }
});

export default App;
