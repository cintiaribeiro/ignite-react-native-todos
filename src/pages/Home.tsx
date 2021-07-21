import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList, TaskEdit } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = tasks.map(task => ({ ...task }));

    const task = newTasks.find((task) => task.title === newTaskTitle);

    if(task){
      Alert.alert(`${newTaskTitle} já cadastrado. Você não pode cadastrar uma task com o mesmo nome `);
      return false;
    }
    
    const data = {
      id : new Date().getTime(),
      title:newTaskTitle,
      done: false
    }

     setTasks(oldTask => [...oldTask, data]);
  }

  function handleToggleTaskDone(id: number) {
    
    const updatedTasks = tasks.map(task => ({ ...task }));

    const task = updatedTasks.find((task) => task.id === id);

    if(task?.done === false){
      task.done = true;
    }else{
      task.done = false;
    }

    setTasks(updatedTasks);  

  }

  function handleRemoveTask(id: number) {
    
    return Alert.alert(
      "Tem certeza que você deseja remover esse item?",
      "",
      [
        
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState =>tasks.filter(
              task => task.id !== id
          ));
          },
        },
        
        {
          text: "Cancelar",
        },
      ]
    );
    
  }

  function handleEditTask(taskEdit: TaskEdit){
    const updatedTasks = tasks.map(task => ({ ...task }));

    const task = updatedTasks.find((task) => task.id === taskEdit.id);

    task.title = taskEdit.title
    
    setTasks(updatedTasks)

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})