import './App.css';
import { useRecoilValue } from 'recoil';

import { todoListState, todoListStatsState } from './Atoms/atomStates';
import TodoItemCreator from './components/TodoItemCreator';
import TodoItem from './components/TodoItem';
import TodoListStats from './components/TodoListStats';
import TodoListFilters from './components/TodoListFilters';
import ReactWordcloud from 'react-wordcloud';

function App() {
  const todoList = useRecoilValue(todoListState);
  const { wordCount, totalNum } = useRecoilValue(todoListStatsState);

  return (
    <div className="App">
      <h1>TOdo</h1>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}

      {!wordCount ? <h1> Loading </h1> : <ReactWordcloud words={wordCount} />}
    </div>
  );
}

export default App;
