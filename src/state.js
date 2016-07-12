import io from 'socket.io-client';

const ENABLE_SOCKETS = true;

const socket = io.connect(window.location.origin);

// El estado global de nuestra aplicacion
const state = {};

// Listeners suscritos a cambios (es un array de funciones [fn, fn2, fn3, ...])
const listeners = [];

/**
  * Suscribe la funcion al cambio del estado y devuelve una funcion que cuando es llamada quita la
  * suscripcion
  *
  *
  * function onChange() { this.forceUpdate() }
  * const unsubscribe = subscribe(onChange);
  * ...
  * unsubscribe()
  */
const subscribe = fn => {
  listeners.push(fn);
  return () => {
    const index = listeners.indexOf(fn);
    listeners.splice(index, 1);
  };
};

const assignState = (newState) => {
  console.log('Estado actual:', state);
  Object.assign(state, newState);
  console.log('Nuevo estado:', state);
  listeners.forEach(fn => fn());
};

/**
 * Cambia el estado de la aplicacion,
 * console.log(state) -> { value: 'hola' }
 * setState({ value: 'adios' })
 * console.log(state) -> { value: 'adios' }
 */
export const setState = (newState) => {
  if (ENABLE_SOCKETS) {
    socket.emit('setState', newState);
  }
  assignState(newState);
};

export const getState = () => state;

if (ENABLE_SOCKETS) {
  socket.on('setState', function (data) {
    assignState(data);
  });
}

/**
 * Suscribe automaticamente el componente a cambios en el estado, el parametro `setState` va a
 * determinar que parte del estado esta pidiendo para ver cambios.
 * Nota: todas las "keys" presentes en el objeto retornado al llamar esta funcion se le pasaran
 * al componente como propiedades
 * E.j.
 *
 * state = {
 *   values: ['hola', 'mundo']
 * }
 * class Title extends Component {
 *   render() {
 *     return <h1>{this.props.text}</h1> // <- "text" no esta definido, necesita ser pasado como un prop
 *   }
 * }
 *
 * const ConnectedTitle = connectToState(Title, state => {
 *   return { text: state.values[0] } // <- la llave "text" se le pasara al componente como un prop
 * });
 *
 * <ConnectedTitle /> // <- imprime `<h1>hola</h1>`
 */
export const connectToState = (ConnectedComponent, selectState) => {
  class ConnectedInput extends React.Component {
    // tenemos que llevar un registro de cual era el estado del componente antes de que cambie el
    // estado asi que lo guardaremos en `state.prevState` para comparar
    state = {
      prevState: {}
    }

    componentWillMount() {
      // cuando el componente va a hacer mount guardamos el estado actual en memoria, notese que
      // selectState va a devolver solo la parte del estado que queremos
      this.setState({ prevState: selectState(state, this.props) });

      this.unsubscribe = subscribe(() => {
        // la parte del estado nuevo que el objeto esta viendo
        const innerState = selectState(state, this.props);
        // el estado guardado en memoria
        const prevState = this.state.prevState;
        // revisar si el estado es igual al anterior por referencia de memoria, recuerda que
        // `{} == {}` es `false` asi que esto solo revisa que sea exactamente el mismo
        let isEqual = state === prevState;
        // En caso de ser diferente, pero el estado nuevo es un objeto vamos a comparar key por key
        // a ver si se hizo algun cambio
        if (!isEqual && typeof innerState === 'object') {
          // La function `.every` va a iterar sobre cada elemento del array y espera que para todos
          // devuelva `true`, si alguno de los resultados devuelve `false` la iteracion se detiene y
          // devuelve `false`
          isEqual = Object.keys(innerState).every(key => {
            return innerState[key] === prevState[key];
          });
        };
        // Si el estado en efecto cambio entonces hay que hacer update al componente, y llamar
        // `setState` hace eso por nosotros
        if (!isEqual) {
          this.setState({ prevState: innerState });
        }
      });
    }

    // Cuando el componente es desmontado hay que eliminar el listener de la lista de listeners
    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return (
        <ConnectedComponent
          {...this.props}
          {...this.state.prevState}
        />
      );
    }
  }

  return ConnectedInput;
};
