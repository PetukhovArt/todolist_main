import { TaskStatuses, TaskType } from "@/api/todolists-api"
import { AddItemForm } from "@/components/AddItemForm/AddItemForm"
import { EditableSpan } from "@/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { Delete } from "@mui/icons-material"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import React, { useCallback, useEffect } from "react"
import { fetchTasksTC } from "../tasks-reducer"
import { FilterValuesType, TodolistDomainType } from "../todolists-reducer"
import { Task } from "./Task/Task"
import s from "./todolist.module.css"

type PropsType = {
   todolist: TodolistDomainType
   tasks: Array<TaskType>
   changeFilter: (value: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
   removeTask: (taskId: string, todolistId: string) => void
   removeTodolist: (id: string) => void
   changeTodolistTitle: (id: string, newTitle: string) => void
   demo?: boolean
}

export const Todolist = React.memo(({ demo = false, ...props }: PropsType) => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (demo) {
         return
      }
      dispatch(fetchTasksTC(props.todolist.id))
   }, [])

   const addTask = useCallback(
      (title: string) => {
         props.addTask(title, props.todolist.id)
      },
      [props.addTask, props.todolist.id],
   )

   const removeTodolist = () => {
      props.removeTodolist(props.todolist.id)
   }
   const changeTodolistTitle = useCallback(
      (title: string) => {
         props.changeTodolistTitle(props.todolist.id, title)
      },
      [props.todolist.id, props.changeTodolistTitle],
   )

   const onAllClickHandler = useCallback(
      () => props.changeFilter("all", props.todolist.id),
      [props.todolist.id, props.changeFilter],
   )
   const onActiveClickHandler = useCallback(
      () => props.changeFilter("active", props.todolist.id),
      [props.todolist.id, props.changeFilter],
   )
   const onCompletedClickHandler = useCallback(
      () => props.changeFilter("completed", props.todolist.id),
      [props.todolist.id, props.changeFilter],
   )

   let tasksForTodolist = props.tasks

   if (props.todolist.filter === "active") {
      tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
   }
   if (props.todolist.filter === "completed") {
      tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
   }

   return (
      <div className={s.main}>
         <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
         <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
            <Delete />
         </IconButton>
         <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
         <div>
            {tasksForTodolist &&
               tasksForTodolist.map((t) => (
                  <Task
                     key={t.id}
                     task={t}
                     todolistId={props.todolist.id}
                     removeTask={props.removeTask}
                     changeTaskTitle={props.changeTaskTitle}
                     changeTaskStatus={props.changeTaskStatus}
                  />
               ))}
         </div>
         <div className={s.buttonWrapper}>
            <Button
               variant={props.todolist.filter === "all" ? "contained" : "text"}
               onClick={onAllClickHandler}
               color={"inherit"}
               sx={{ width: "45px" }}>
               All
            </Button>
            <Button
               variant={props.todolist.filter === "active" ? "contained" : "text"}
               onClick={onActiveClickHandler}
               color={"primary"}
               sx={{ width: "45px" }}>
               Active
            </Button>
            <Button
               variant={props.todolist.filter === "completed" ? "contained" : "text"}
               onClick={onCompletedClickHandler}
               color={"secondary"}
               sx={{ width: "45px" }}>
               Done
            </Button>
         </div>
      </div>
   )
})
