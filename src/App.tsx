import React from 'react';
import { useQuery } from 'react-query';
import styled  from 'styled-components';
import * as api from './api';


const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 0.5;
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
  border: 1px solid red;  
`

const TodoContent = styled.div`
  width: 512px;
  height: 514px;
  border: 1px solid black;
  overflow: scroll;
`
const TodoFooter = styled.div`
  width: 512px;
  height: 100px;
  border: 1px solid red;  
`

function App() {
  return (
    <Main>
      <TodoListBox>
        <TodoHeader>
          오늘 할 일  
        </TodoHeader>
        <TodoContent>
        </TodoContent>
        <TodoFooter>
          추가하기
        </TodoFooter>
      </TodoListBox>
    </Main>
  );
}


export default App;

