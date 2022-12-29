import TodoHeader from "./TodoHeader";
import TodoContent from "./TodoContent";
import styled from "styled-components"

const TodoListBox = styled.div`
  width: 512px;
  height: 614px;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  border-radius: 10%;
  box-shadow: 5px 5px 5px 5px black;
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
