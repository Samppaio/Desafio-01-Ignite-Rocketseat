import { Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface Content {
  id: number;
  content: string;
  isComplete: boolean;
  onDeleteTask: (id: number) => void;
  onTaskCompleted: (id: number) => void;
}

export function Task({
  id,
  content,
  isComplete,
  onTaskCompleted,
  onDeleteTask,
}: Content) {
  function handleTaskCompleted() {
    onTaskCompleted(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.task}>
      <input id={`${id}`} type="checkbox" />
      <label htmlFor={`${id}`} onClick={handleTaskCompleted} />
      <p className={isComplete ? styles.complete : styles.notComplete}>
        {content}
      </p>
      <button title="Deletar tarefa" onClick={handleDeleteTask}>
        <Trash size={20} />
      </button>
    </div>
  );
}
