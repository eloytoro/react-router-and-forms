import ReactDOM from 'react-dom';
import App from 'components/App';
import Form from 'components/Form'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const NoMatch = () => (
  <h1>404</h1>
);

const OtherView = () => (
  <h1>Hello!</h1>
);

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Form} />
        <Route path="other" component={OtherView} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
