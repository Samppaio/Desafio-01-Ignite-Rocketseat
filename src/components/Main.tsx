import styles from "./Main.module.css";
import Plus from "../images/plus.svg";
import Clipboard from "../images/Clipboard.svg";
import { Task } from "./Task";
import { ChangeEvent, useState } from "react";

interface iTask {
  id: number;
  title: string;
  isComplete: boolean;
}

export function Main() {
  const [tasks, setTasks] = useState<iTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

  function handleChangeTask(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(e.target.value);
  }

  function handleNewTask(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTaskTitle) {
      window.alert("Nomeie a tarefa!");
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: newTaskTitle,
        isComplete: false,
      };

      setTasks([...tasks, newTask]);
    }

    setNewTaskTitle("");
  }

  function onTaskCompleted(id: number) {
    const completedTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    const completedTasks = completedTask.filter(
      (task) => task.isComplete === true
    );

    setTasks(completedTask);
    setCompletedCount(completedTasks.length);
  }

  function onDeleteTask(id: number) {
    const deletedTask = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(deletedTask);
  }

  return (
    <main>
      <form onSubmit={handleNewTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskTitle}
          onChange={handleChangeTask}
        />
        <button type="submit">
          Criar <img src={Plus} />
        </button>
      </form>
      <div className={styles.tasksContent}>
        <div className={styles.info}>
          <div className={styles.created}>
            <h2>Tarefas criadas</h2>
            <p>
              <span>{tasks.length}</span>
            </p>
          </div>
          <div className={styles.done}>
            <h2>Concluídas</h2>
            <p>
              <span>{`${completedCount} de ${tasks.length}`}</span>
            </p>
          </div>
        </div>
        <div className={styles.tasksList}>
          {!!tasks.length ? (
            tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                content={task.title}
                onDeleteTask={onDeleteTask}
                onTaskCompleted={onTaskCompleted}
                isComplete={task.isComplete}
              />
            ))
          ) : (
            <>
              <img src={Clipboard} />
              <p className={styles.first}>
                Você ainda não tem tarefas cadastradas
              </p>
              <p className={styles.second}>
                Crie tarefas e organize seus itens a fazer
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
