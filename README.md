# TodoList

## Library
* React-Query
* React-transition-group
* styled-components
* React
* typescript

## structure

TodoList의 전체를 렌더링 하는 App.tsx를 기준으로 작성하였습니다.

* api
    * index.ts (TodoList에 대한 수정, 삭제, 추가, 데이터 요청 등의 API 요청에 대한 기능)
    * interface.ts (api로 불러오는 데이터 타입에 대한 interface 선언)
* asset
    * loading-spinner.svg (로딩 시 보여주는 로딩스피너)
* components
    * TodoContent.tsx (TodoList에 대한 할 일들을 보여주는 컴포넌트)
* hooks
    * useTodoList.ts (React Query에서의 useQuery통해 데이터를 불러오는 방법)
    * useTodoListMutation.ts (React Query에서의 useMutation을 활용한 데이터의 변환에 사용하는 훅)


