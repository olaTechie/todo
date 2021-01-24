import { atom, selector } from 'recoil';
const wordscount = require('count-words-occurance');
export const todoListState = atom({
  key: 'todoListState',
  default: [],
});

export const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;
    const text = todoList.map((item) => item.text);
    const all = text.join(' ');
    const { wordsCount } = totalNum >= 1 && wordscount(all, true);
    let wordCount =
      totalNum >= 1 &&
      Object.keys(wordsCount).map((key) => ({
        text: key,
        value: wordsCount[key],
      }));

    return {
      wordCount,
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
      // wordCount,
    };
  },
});
