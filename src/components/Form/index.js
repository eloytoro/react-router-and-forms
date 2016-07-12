import { setState, getState, connectToState } from '../../state';
import style from '../style.css';

class Input extends React.Component {
  updateState(newValue) {
    var state = getState();
    setState({
      ...state,
      [this.props.name]: newValue
    });
  }

  render() {
    const {
      value = '',
      ...props
    } = this.props;
    return (
      <input
        {...props}
        value={value}
        onChange={(event) => this.updateState(event.target.value)}
      />
    );
  }
};

const ConnectedInput = connectToState(Input, (state, props) => {
  return {
    value: state[props.name]
  };
});

class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form:', getState());
  }

  render() {
    return (
      <form className={style.row} onSubmit={this.handleSubmit}>
        <div className={style.field}>
          <label>Nombre</label>
          <ConnectedInput name="name" type="text" />
        </div>
        <div className={style.field}>
          <label>Email</label>
          <ConnectedInput name="email" type="text" />
        </div>
        <div className={style.field}>
          <label>Password</label>
          <ConnectedInput name="password" type="password" />
        </div>
        <div className={style.row}>
          <button type="submit">
            Send
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
