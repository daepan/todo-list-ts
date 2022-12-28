import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
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
`

const TodoHeader = styled.div`
  width: 512px;
  height: 100px;
  color: rgb(0, 0, 128);
  font-size: 80px;  
`

const TodoContent = styled.div`
  width: 512px;
  height: 514px;
  border: 1px solid black;
  overflow: scroll;
`
const TodoListItem = styled.div`
  width: 512px;
  height: 70px;
  display: flex;
  border: 1px solid blue;
  align-items: center;
`
const ItemTitle = styled.div`
  width: 440px;
  margin-left: 10px;
`

const ItemCheckBox = styled.input`
  width: 20px;
  height: 20px;
`

const ItemDeleteButton = styled.button`
  width: 20px;
  height: 20px;
  margin: 10px;
`

const TodoFooter = styled.div`
  width: 512px;
  height: 100px;
  border: 1px solid red;
  display: flex;
  align-items: center;
`

const TodoAddInput = styled.input`
  width: 440px;
  margin: 10px;
` 

const TodoAddButton = styled.button`
  width: 55px;
  height: 35px;
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
      todoRef.current!.focus();
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
          Todo-List
        </TodoHeader>
        <TodoContent>
          {
            todoItem === null ? (
              <div>
                loading...
              </div>
            ) : (
              todoItem.map((items: TodoListItemElements) => (
                <TodoListItem key={items.id}>
                  <ItemCheckBox
                    type="checkbox"
                    checked={items.completed} 
                    onChange={() => onHandleCheckedItem(items)} />
                  <ItemTitle>{items.title}</ItemTitle>
                  <ItemDeleteButton onClick={() => onHandleDeleteItem(items.id)}>X</ItemDeleteButton>
                </TodoListItem>
              ))
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

