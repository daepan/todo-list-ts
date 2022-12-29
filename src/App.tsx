import React from 'react';
import TodoContent from './components/TodoContent';
import useTodoList from './hooks/useTodoList';
import useTodoListMutation from './hooks/useTodoListMutation';
import { TodoItemRequest } from './api/interface';
import styled  from 'styled-components';

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
  const { deleteTodoListItem, updateTodoListItem, addTodoListItem } = useTodoListMutation();
  const [todoItem, setTodoItem] = React.useState(todoList);
  const todoRef = React.useRef<HTMLInputElement | null>(null);

  const onHandleDeleteItem = (id: number) => {
    deleteTodoListItem.mutate(id)
    setTodoItem(todoItem.filter((item: TodoItemRequest) => item.id !== id));
  };

  const onHandleCheckedItem = (items: TodoItemRequest) => {
    items.completed = !items.completed;
    updateTodoListItem.mutate({id: items.id, completed: items.completed})
  }

  const onHandleAddItem = () => {
    const todoText = String(todoRef.current?.value);
    setTodoItem((current: string[]) => [...current, {id: todoItem.length + 1, title: todoText, completed: false, userId: 1}]);
    todoRef.current!.focus();
    addTodoListItem.mutate({id: todoItem.length + 1, title: todoText, completed: false, userId: 1})
  }

  React.useEffect(()=>{
    setTodoItem(todoList);
  }, [todoList])

  return (
    <Main>
      <TodoListBox>
        <TodoHeader>
          TodoList
        </TodoHeader>
        <TodoContent
          todoItem={todoItem}
          onHandleCheckedItem={onHandleCheckedItem}
          onHandleDeleteItem={onHandleDeleteItem}
        />
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

