import { atom, useRecoilState } from "recoil";
import styled from "styled-components";
import useSWR from "swr";

interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const LoadingContainer = styled.div`
  color: red;
`;

const TodoContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px 1fr;
`;

const globalState = atom({
  key: "global",
  default: "1234",
});

export default function Home() {
  const { data: todos, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    async (url) => {
      const response = await fetch(url);
      const result = await response.json();
      return result as Todo[];
    }
  );

  const [global] = useRecoilState(globalState);

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <>
      {global}
      <TodoContainer>
        {todos?.map((todo) => {
          const { userId, id, title, body } = todo;

          return (
            <>
              <div>{userId}</div>
              <div>{id}</div>
              <div>{title}</div>
              <div>{body}</div>
            </>
          );
        })}
      </TodoContainer>
    </>
  );
}
