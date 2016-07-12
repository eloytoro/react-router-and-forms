import ReactDOM from 'react-dom';
import App from 'components/App';
import Form from 'components/Form'
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const NoMatch = () => (
  <h1>404</h1>
);

const OtherView = () => (
  <h1>Hello!</h1>
);

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Form} />
          <Route path="other" component={OtherView} />
          <Route path="*" component={NoMatch} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
