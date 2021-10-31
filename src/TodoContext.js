import React, { useReducer, createContext, useContext } from 'react';

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성',
        done: true,
    },
    {
        id: 2,
        text: '컴포넌트 생성',
        done: true,
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false,
    },
    {
        id: 4,
        text: '기능구현',
        done: false,
    },
];

// 3가지 액션 만듬 -> CREATE, TOGGLE, REMOVE
function todoReducer(state, action) {
    switch(action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

// Context 생성
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// 커스텀 Hook 만들기
export function useTodoState() {
    return useContext(TodoStateContext);
}
export function useTodoDispatchContext() {
    return useContext(TodoDispatchContext);
}