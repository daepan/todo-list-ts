import { ReactComponent as Plus } from '../../assets/plus.svg';
import styled from 'styled-components';

const AddButtonWrapper = styled.div`
  width: 200px;
  display: flex;
`

const PlusButton = styled(Plus)`
  width: 20px;
  height: 20px;
  padding-top: 2px;
  margin-right: 10px;
`

const AddText = styled.div`
  width: 100px;
  height: 25px;
  font-size: 20px;
`

function TodoAddButton() {
  const onHandleAddItem = () => {
    console.log("추가")
  }
  return (
    <AddButtonWrapper onClick={onHandleAddItem}>
      <PlusButton />
      <AddText>New Task</AddText>
    </AddButtonWrapper>
  )
}

export default TodoAddButton;
