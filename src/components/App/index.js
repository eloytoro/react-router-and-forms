import style from '../style.css';
import Form from '../Form';
import { Link } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <Link to="/">
          <button>Form</button>
        </Link>
        <Link to="other">
          <button>Other</button>
        </Link>
        {this.props.children}
      </div>
    );
  }
}

export default App;
