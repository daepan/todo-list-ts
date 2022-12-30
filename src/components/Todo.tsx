import TodoHeader from "./TodoHeader";
import TodoContent from "./TodoContent";
import styled from "styled-components"

const TodoListBox = styled.div`
  width: 788px;
  height: 500px;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 0, 0, 0.5);
  box-shadow: 1px 1px 1px 1px gray;
  padding: 20px;
`

function Todo() {
  return (
    <TodoListBox>
      <TodoHeader />
      <TodoContent />
    </TodoListBox>
  )
}

export default Todo;
