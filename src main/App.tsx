import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
//STATE
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');
//CONSTANTS
    const addTask = (input: string) => {
        setTasks([{id: v1(), title: input, isDone: false}, ...tasks])
    } // refactored
    const filterTasks = () => {
        let tasksForTodolist = tasks;
        switch (filter) {
            case 'active':
                tasksForTodolist = tasks.filter(t => t.isDone === false);
                break;
            case 'completed':
                tasksForTodolist = tasks.filter(t => t.isDone === true);
                break;
        }
        return tasksForTodolist;
    } // refactored
//FUNCTIONS
    function changeStatus(taskID: string, newIsDone: boolean) {
        setTasks(tasks.map(t => t.id === taskID ? //нашли соотв таску
            {...t, isDone: newIsDone} // присвоили значение cheked
            : t)) //если нет то просто объект
    } // refactored
    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }  // refactored
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    } // refactored

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filterTasks()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
            <Todolist title="What to learn"
                      tasks={filterTasks()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
