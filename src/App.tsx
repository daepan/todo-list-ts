import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useTodoList from './hooks/useTodoList';
import styled  from 'styled-components';
import * as api from './api';

interface TodoListItemElements {
  userId: number
  id: number
  title: string
  completed: boolean
}

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgba(0, 0, 0, 0.8);
`;

const TodoListBox = styled.div`
  width: 512px;
  height: 614px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10%;
  box-shadow: 5px 5px 5px 5px black;
`

const TodoHeader = styled.div`
  width: 512px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(0, 0, 204);
  font-size: 65px;  
`

const TodoContent = styled.div`
  width: 512px;
  height: 514px;
  overflow: scroll;
`
const TodoListItem = styled.div`
  width: 492px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px;
  color: #333;
  background-color: rgba(51,51,255,.5);
  margin-bottom: 15px;
  border-radius: 21px;
  box-shadow: 5px 5px 5px 5px gray;
  filter: brightness(1.75);

  &.item-enter {
    opacity: 0;
  }

  &.item-enter-active {
    opacity: 0.9;
    transition: all 500ms;
  }

  &.item-exit {
    opacity: 0.01;
    transition: opacity 1000ms ease-out;
  }
`
const ItemTitle = styled.div`
  width: 400px;
  margin-left: 10px;
`

const ItemCheckBox = styled.input`
  width: 20px;
  height: 20px;
`

const ItemDeleteButton = styled.button`
  width: 30px;
  height: 30px;
  float:right;
  display:flex;
  text-align: center;
  align-items:center;
  justify-content:center;
  font-size: 1.5em;
  background-color: rgb(255, 0, 117);
  outline: 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  :hover,active {
    background-color: initial;
    background-position: 0 0;
    color: #FF4742;
  }
  :active {
    opacity: .5;
  }
`

const TodoFooter = styled.div`
  width: 492px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TodoAddInput = styled.input`
  width: 370px;
  height: 40px;
  margin: 10px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  box-shadow: 5px 5px 5px 5px gray;
` 

const TodoAddButton = styled.button`
  width: 55px;
  height: 35px;
  float:right;
  display:flex;
  text-align: center;
  align-items:center;
  justify-content:center;
  font-size: 1.5em;
  background-color: rgb(255, 100, 100);
  outline: 0;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  box-shadow: 5px 5px 5px 5px gray;
` 

function App() {
  const todoList = useTodoList();
  const [todoItem, setTodoItem] = React.useState(todoList);
  const todoRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const deleteTodoListItem = useMutation(api.deleteTodoListItem, {
    onSuccess: () => {
      console.log("삭제되었습니다.")
    }
  })

  const updateTodoListItem = useMutation(api.updateTodoListItem, {
    onSuccess: () => {
      console.log('변경되었습니다.')
    }
  })

  const addTodoListItem = useMutation(api.addTodoListItem, {
    onSuccess: () => {
      console.log('추가되었습니다.');
      queryClient.invalidateQueries("todoList");
    },
  });

  const onHandleDeleteItem = (id: number) => {
    deleteTodoListItem.mutate(id)
    setTodoItem(todoItem.filter((item: TodoListItemElements) => item.id !== id));
  };

  const onHandleCheckedItem = (items: TodoListItemElements) => {
    items.completed = !items.completed;
    updateTodoListItem.mutate({id: items.id, completed: items.completed})
  }

  const onHandleAddItem = () => {
    const todoText = String(todoRef.current?.value);
    setTodoItem((current: string[]) => [...current, {id: todoItem.length + 1, title: todoText, complted: false, userId: 1}]);
    todoRef.current!.focus();
    addTodoListItem.mutate({id: todoItem.length + 1, title: todoText, completed: false, userId: 1})
  }

  React.useEffect(()=>{
    setTodoItem(todoList);
  }, [todoList])
  
  console.log(todoList);
  return (
    <Main>
      <TodoListBox>
        <TodoHeader>
          TodoList
        </TodoHeader>
        <TodoContent>
          {
            todoItem === null ? (
              <div>
                loading...
              </div>
            ) : (
              <TransitionGroup>
              {
                todoItem.map((items: TodoListItemElements) => (
                  <CSSTransition
                    key={items.id}
                    timeout={500}
                    classNames="item"
                    mountOnEnter
                    unmountOnExit
                    onExit={() => {
                      console.log("jeje");
                    }}
                    onEnter={() => {
                      console.log("jeje");
                    }}>
                    <TodoListItem>
                      <ItemCheckBox
                        type="checkbox"
                        checked={items.completed} 
                        onChange={() => onHandleCheckedItem(items)} />
                      <ItemTitle>{items.title}</ItemTitle>
                      <ItemDeleteButton onClick={() => onHandleDeleteItem(items.id)}>X</ItemDeleteButton>
                    </TodoListItem>
                  </CSSTransition>
                ))
              }
              </TransitionGroup>
            )
          }
        </TodoContent>
        <TodoFooter>
          <TodoAddInput
            ref={(inputRef) => todoRef.current = inputRef}
            type="text"
            placeholder="할 일을 입력해주세요"
          />
          <TodoAddButton
            onClick={onHandleAddItem}
          >
            Add
          </TodoAddButton>
        </TodoFooter>
      </TodoListBox>
    </Main>
  );
}


export default App;

