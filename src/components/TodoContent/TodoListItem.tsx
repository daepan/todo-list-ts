import React from "react";
import Modal from "components/Modal";
import { TodoItemRequest } from "api/interface";
import styled from "styled-components";
import { useDeleteTodo, useUpdateTodo } from "hooks";
import TodoEditForm from "components/TodoForm/TodoEditForm";
import { ReactComponent as Pencil } from '../../assets/pencil.svg';
import { ReactComponent as TrashBin } from '../../assets/trash-bin.svg';

interface ListItemProps {
  todoItem: TodoItemRequest
}

const ListItemContainer = styled.div`
  width: 452px;
  height: 80px;
  display: flex;
  border: 1px solid rgb(0, 0, 10);
  border-radius: 4px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 3px 3px gray;
`

const ListItemTaskContent = styled.div`
  width: 390px;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20px;
`

const ListItemTaskOption = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
`

const ListItemType = styled.div`
  height: 10px;
  color: rgb(0, 0, 0, 0.8);
  display: flex;
  font-size: 10px;
  margin-bottom: 10px;
`

const ListItemTitle = styled.div`
  height: 20px;
  color: rgb(0, 0, 0);
  display: flex;
  font-size 15px;
`

const ListItemDeleteButton = styled(TrashBin)`
  width: 20px;
  height: 20px;
  display: flex;
`

const ListItemEditButton = styled(Pencil)`
  width: 20px;
  height: 20px;
  display: flex;
  margin-right: 20px;
`

function TodoListItem(todoItem: ListItemProps) {
  const itemDelete = useDeleteTodo();
  const [isOpen, setIsOpen] = React.useState(false);
  const onHandleDeleteTask = (id: number) => {
    itemDelete.mutateAsync(id);
  }
  const onHandleEditTask = () => {
    console.log("수정");
    setIsOpen(true);
  }

  return (
    <>
      <ListItemContainer>
        <ListItemTaskContent>
          <ListItemType>Task</ListItemType>
          <ListItemTitle>{ todoItem.todoItem.title }</ListItemTitle>
        </ListItemTaskContent>
        <ListItemTaskOption>
          <ListItemEditButton onClick={onHandleEditTask} />        
          <ListItemDeleteButton onClick={() => onHandleDeleteTask(todoItem.todoItem.id)} />
        </ListItemTaskOption>
      </ListItemContainer>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <TodoEditForm todoItem={todoItem.todoItem} />
      </Modal>
    </>
  )  
}

export default TodoListItem;
