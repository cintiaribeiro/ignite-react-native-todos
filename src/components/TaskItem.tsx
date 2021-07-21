import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

import { Task, TaskEdit } from './TasksList';

interface TaskItem {
  index: number,
  item: Task,
  toggleTaskDone: (id: number) => void,
  removeTask : (id: number) => void,
  editTask: (taskEdit: TaskEdit) => void,
}

export function TaskItem( {index, item, toggleTaskDone, removeTask, editTask}: TaskItem ){

    const [edit, setEdit] = useState(false);
    const [taskEdit, setTaskEdit] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
      setEdit(true);
    }

    function handleCancelEditing(){
      setTaskEdit(item.title);
      setEdit(false);
    }

    function handleSubmitEditing(){
      editTask({id:item.id, title: taskEdit});
      setEdit(false);
    }

    useEffect(() => {
      console.log(edit);
      if (textInputRef.current) {
        if (edit) {
          textInputRef.current.focus();
        } else {
          textInputRef.current.blur();
        }
      }
    }, [edit])

    return (
      <>
        <View>
            <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => toggleTaskDone(item.id)}
            >
            <View
                style={item.done == false ? styles.taskMarker : styles.taskMarkerDone }
                testID={`marker-${index}`}
            >
                { 
                item.done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>

            <TextInput
               value={taskEdit}
               onChangeText={setTaskEdit}
               editable={edit}
               onSubmitEditing={handleSubmitEditing}
               ref={textInputRef}
               style={item.done == false ? styles.taskText : styles.taskTextDone }
            />
                
            </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer } >
        { edit ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            testID={`trash-${index}`}
						style={{ paddingHorizontal: 24 }}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            testID={`trash-${index}`}
						style={{ paddingHorizontal: 24 }}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        ) }

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          disabled={edit}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: edit ? 0.2 : 1 }} />
        </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    check:{
      width:16,
      height: 16,
      borderRadius: 4,
      borderColor: '#B2B2B2',
      borderWidth: 1.5,
      marginRight: 15
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
      flexDirection: 'row',
    },
    iconsDivider: {
      width: 1,
      height: 24,
      backgroundColor: 'rgba(196, 196, 196, 0.24)',
    }
  })