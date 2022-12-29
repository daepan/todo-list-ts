import Todo from 'components/Todo';
import styled  from 'styled-components';

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgba(255, 255, 255, 0.8);
`;

function App() {


  return (
    <Main>
     <Todo />
    </Main>
  );
}


export default App;

