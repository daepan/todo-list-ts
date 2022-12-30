import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TodoItemRequest } from 'api/interface';
import TodoListItem from "./TodoListItem";
import { useTodoListData } from "hooks";
import { ReactComponent as LoadingSpinner } from '../../assets/loading-spinner.svg';
import Modal from "components/Modal";
import styled from 'styled-components';

const TodoContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 20px 5px;
  display: flex;
  justify-content: center;
`

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

function TodoContent() {
  let todoList = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    },
    {
      "userId": 1,
      "id": 4,
      "title": "et porro tempora",
      "completed": true
    },
    {
      "userId": 1,
      "id": 5,
      "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
      "completed": false
    },
  ]
  const todo = useTodoListData();
  
  console.log(todo);
  return (
    <TodoContentWrapper>
      {
        todoList === null ? (
          <LoadingWrapper>
            <LoadingSpinner />
          </LoadingWrapper>
        ) : (
          <TransitionGroup>
            {
              todo?.map((items: TodoItemRequest) => (
                <CSSTransition
                  key={items.id}
                  timeout={500}
                  classNames="item"
                  mountOnEnter
                  unmountOnExit
                >
                  <TodoListItem
                    key={items.id}
                    todoItem={items}
                  />
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
