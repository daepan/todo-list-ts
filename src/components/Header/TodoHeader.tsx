import styled from "styled-components";
import TodoAddButton from "./TodoAddButton";

const TodoHeaderWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 40px;
`

function TodoHeader() {
  return (
    <TodoHeaderWrapper>
      <TodoAddButton />
    </TodoHeaderWrapper>
  )
}

export default TodoHeader;
