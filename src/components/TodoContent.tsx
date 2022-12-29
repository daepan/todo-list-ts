import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TodoItemRequest } from '../api/interface';
import styled from 'styled-components';

interface TodoContentProps {
  todoItem: TodoItemRequest[]
  onHandleDeleteItem: (id: number) => void
  onHandleCheckedItem: (items: TodoItemRequest) => void
}

const TodoContentWrapper = styled.div`
  width: 512px;
  height: 514px;
  overflow: scroll;
`

const TodoListItem = styled.div`
  width: 492px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px;
  color: #333;
  background-color: rgba(51,51,255,.5);
  margin-bottom: 15px;
  border-radius: 21px;
  box-shadow: 5px 5px 5px 5px gray;
  filter: brightness(1.75);

  &.item-enter {
    opacity: 0;
  }

  &.item-enter-active {
    opacity: 0.9;
    transition: all 500ms;
  }

  &.item-exit {
    opacity: 0.01;
    transition: opacity 1000ms ease-out;
  }
`
const ItemTitle = styled.div`
  width: 400px;
  margin-left: 10px;
`

const ItemCheckBox = styled.input`
  width: 20px;
  height: 20px;
`

const ItemDeleteButton = styled.button`
  width: 30px;
  height: 30px;
  float:right;
  display:flex;
  text-align: center;
  align-items:center;
  justify-content:center;
  font-size: 1.5em;
  background-color: rgb(255, 0, 117);
  outline: 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  :hover,active {
    background-color: initial;
    background-position: 0 0;
    color: #FF4742;
  }
  :active {
    opacity: .5;
  }
`

function TodoContent({todoItem, onHandleCheckedItem, onHandleDeleteItem}: TodoContentProps) {
  return (
    <TodoContentWrapper>
      {
        todoItem === null ? (
          <div>
            loading...
          </div>
        ) : (
          <TransitionGroup>
            {
              todoItem.map((items: TodoItemRequest) => (
                <CSSTransition
                  key={items.id}
                  timeout={500}
                  classNames="item"
                  mountOnEnter
                  unmountOnExit
                >
                  <TodoListItem>
                    <ItemCheckBox
                      type="checkbox"
                      checked={items.completed} 
                      onChange={() => onHandleCheckedItem(items)} />
                    <ItemTitle>{items.title}</ItemTitle>
                    <ItemDeleteButton onClick={() => onHandleDeleteItem(items.id)}>X</ItemDeleteButton>
                  </TodoListItem>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        )
      }
    </TodoContentWrapper>
  )
}

export default TodoContent;
