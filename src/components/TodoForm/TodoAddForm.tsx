import React from "react";
import { useAddTodo } from "hooks";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`

`

const FormContent = styled.form`
`

const TodoTitleInput = styled.input`

`


function TodoAddForm() {
  const addTodo = useAddTodo();
  const [todoTitle, setTodoTitle] = React.useState("");
  const onHandleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value);
  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo.mutate({userId: 1, title: todoTitle, completed: false});
  }

  return (
    <FormWrapper>
      <Header>Add Todo</Header>
      <FormContent onSubmit={onHandleSubmit}>
        <TodoTitleInput type="text" value={todoTitle} onChange={onHandleTitle} />
        <button type="submit">Add</button>
      </FormContent>
    </FormWrapper>
  )
}

export default TodoAddForm;
