import React, { useReducer, createContext, useContext, useRef } from 'react';

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
const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// 커스텀 Hook 만들기
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }

    return context;
}
export function useTodoDispatchContext() {
    const context =  useContext(TodoDispatchContext);

    if(!context) {
        throw new Error('Cannot find TodoDispatchContext');
    }

    return context;
}
export function useTodoNextId() {
    const context =  useContext(TodoNextIdContext);
    if(!context) {
        throw new Error('Cannot find TodoNextIdContext');
    }

    return context;
}