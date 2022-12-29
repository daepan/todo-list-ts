import styled from "styled-components";
import { ReactComponent as Pencil } from '../../assets/pencil.svg';
import { ReactComponent as TrashBin } from '../../assets/trash-bin.svg';

const ListItemContainer = styled.div`
  width: 452px;
  height: 75px;
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

function TodoListItem() {
  const onHandleEditTask = () => {
    console.log("수정");
  }

  const onHandleDeleteTask = () => {
    console.log("삭제");
  }

  return (
    <ListItemContainer>
      <ListItemTaskContent>
        <ListItemType>Task</ListItemType>
        <ListItemTitle>숨 쉬기</ListItemTitle>
      </ListItemTaskContent>
      <ListItemTaskOption>
        <ListItemEditButton onClick={onHandleEditTask} />        
        <ListItemDeleteButton onClick={onHandleDeleteTask} />
      </ListItemTaskOption>
    </ListItemContainer>
  )  
}

export default TodoListItem;
