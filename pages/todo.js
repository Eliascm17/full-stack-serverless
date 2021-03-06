import { useEffect, useReducer } from "react";
import { API } from "aws-amplify";
import { listTodos } from "../src/graphql/queries";
import "../configureAmplify";

const initialState = {
  todos: [],
  loading: true,
  error: false,
  form: { name: "", description: "" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.todos, loading: false };
    case "ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTodos = async () => {
    try {
      const todosData = await API.graphql({
        query: listTodos,
      });
      dispatch({ type: "SET_TODOS", todos: todosData.data.listTodos.items });
    } catch (err) {
      console.log("error: ", err);
      dispatch({ type: "ERROR" });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (state.loading) {
    return <div>loading... </div>;
  }

  return (
    <div className="flex justify-center my-8">
      {state.todos.map((item) => {
        return (
          <div className="">
            <div key={item.id} className="text-2xl">
              {item.name}
            </div>
            <div className="text-lg">{item.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
