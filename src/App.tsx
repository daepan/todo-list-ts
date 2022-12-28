import React from 'react';
import { useQuery } from 'react-query';
import styled  from 'styled-components';
import Checkbox from './components/CheckBox';
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

const deleteTodoListItem = () => {
  console.log("delete");
}

const onHandleTodoListCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log("check");
  console.log(e.target.checked);
}


function App() {
  const { data: todoList, isLoading } = useQuery('todoList', api.fetchTodoList);
  const [text, setText] = React.useState('');

  if (isLoading) return <div>Loading...</div>;

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  const onClickAddButton = () => {
    setText('');
  }
  
  console.log(todoList);
  return (
    <Main>
      <TodoListBox>
        <TodoHeader>
          Todo-List
        </TodoHeader>
        <TodoContent>
          {
            todoList.map((items: TodoListItemElements) => (
              <TodoListItem key={items.id}>
                <Checkbox checked={items.completed} onChange={onHandleTodoListCheck} />
                <ItemTitle>{items.title}</ItemTitle>
                <ItemDeleteButton onClick={() => deleteTodoListItem()}>X</ItemDeleteButton>
              </TodoListItem>
            ))
          }
        </TodoContent>
        <TodoFooter>
          <TodoAddInput type="text" value={text} onChange={onChangeText} placeholder="할 일을 입력해주세요" />
          <TodoAddButton type="submit" onClick={onClickAddButton}>Add</TodoAddButton>
        </TodoFooter>
      </TodoListBox>
    </Main>
  );
}


export default App;

