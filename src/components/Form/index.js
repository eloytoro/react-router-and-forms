import { connect } from 'react-redux';
import { increment, decrement } from '../../actions/counter';
import style from '../style.css';

class Input extends React.Component {
  render() {
    return (
      <input {...this.props} />
    );
  }
};

const stateToProps = (state, props) => {
  return {
    value: state.register[props.name] || ''
  };
};

const dispatchToProps = (dispatch, props) => {
  return {
    onChange: (event) => dispatch(setValueRegister(props.name, event.target.value))
  };
};

const ConnectedInput = connect(stateToProps, dispatchToProps)(Input);

class Counter extends React.Component {
  render() {
    var value = this.props.value;

    return (
      <div className={style.field}>
        <button type="button" onClick={this.props.onDecrement}>-</button>
        <span>{value}</span>
        <button type="button" onClick={this.props.onIncrement}>+</button>
      </div>
    );
  }
}

const ConnectedCounter = connect(
  (state, props) => {
    return {value: state.counter};
  },
  (dispatch, props) => {
    return {
      onIncrement: (event) => dispatch(increment()),
      onDecrement: (event) => dispatch(decrement())
    };
  }
)(Counter);

class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form className={style.row} onSubmit={this.handleSubmit}>
        <div className={style.field}>
          <label>Nombre</label>
          <ConnectedInput name="name" type="text" />
        </div>
        <div className={style.field}>
          <label>Apellido</label>
          <ConnectedInput name="apellido" type="text" />
        </div>
        <div className={style.field}>
          <label>Nombre de nuevo</label>
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
        <ConnectedCounter />
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
