import React from "react";
import { useUpdateTodo } from "hooks";
import { TodoItemRequest } from "api/interface";
import styled from "styled-components";

interface TodoEditFormProps {
  todoItem: TodoItemRequest
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`

`

const FormContent = styled.form`
`

const EditInput = styled.input`

`

function TodoEditForm(props: TodoEditFormProps) {
  const { todoItem } = props;
  const updateTodo = useUpdateTodo();
  const [todoTitle, setTodoTitle] = React.useState(todoItem.title);

  const onHandleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value);
  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo.mutate({id: todoItem.id, title: todoTitle, completed: todoItem.completed});
  }

  React.useEffect(()=>{
    setTodoTitle(todoItem.title);
  },[todoItem.title])
  return (
    <FormWrapper>
      <Header>EditTodoId : {todoItem.id} </Header>
      <FormContent onSubmit={onHandleSubmit}>
        <EditInput type="text" value={todoTitle} onChange={onHandleTitle} />
        <button type="submit">Edit</button>
      </FormContent>
    </FormWrapper>
  )
}

export default TodoEditForm;