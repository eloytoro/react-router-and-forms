var redux = require('redux');

var reducer = (state = [], action) => {
    if (action.type === 'ADD') {
        return [...state, action.item];
    }

    if (action.type === 'REMOVE') {
        return state.filter(item => {
            return item !== action.item;
        });
    }

    if (action.type === 'SET') {
        var index = state.indexOf(action.item);
        return [
            ...state.slice(0, index),
            action.value,
            ...state.slice(index + 1)
        ];
    }

    return state;
};

var store = redux.createStore(reducer);

var add = (item) => ({
    type: 'ADD',
    item: item
});

var remove = (item) => ({
    type: 'REMOVE',
    item: item
});

var set = (item, value) => ({
    type: 'SET',
    item: item,
    value: value
});

console.log(store.getState());

store.dispatch(add(1));
store.dispatch(add(2));
store.dispatch(add(3));
store.dispatch(add(4));

store.dispatch(remove(2));
store.dispatch(set(4, 8));

console.log(store.getState());
