import style from '../style.css';
import Form from '../Form';

class App extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <Form />
      </div>
    );
  }
}

export default App;
