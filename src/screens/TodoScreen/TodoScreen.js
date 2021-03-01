import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TextInput, Button} from 'react-native';
import styles from './TodoScreen.style';
import {addDataTodo, RemoveMuchData} from '../../redux/actions';
import CardText from '../../components/CardText';

const TodoScreen = ({navigation}) => {
  const listTodo = useSelector((state) => state.todo.listtodos);

  useEffect(() => {
    console.log(listTodo, 'listTodo');
  }, []);

  const [value, onChangeText] = useState('Add an task');
  const dispatch = useDispatch();
  return (
    <View style={styles.scrollView}>
      <View style={styles.topHead}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
        <Button
          onPress={() => {
            dispatch(
              addDataTodo({
                id:
                  Math.random().toString(36).substring(2, 15) +
                  Math.random().toString(36).substring(2, 15),
                name: value,
              }),
            );
            onChangeText('');
          }}
          title="Add Task"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <Button
        title="Remove Selected"
        onPress={() => {
          dispatch(RemoveMuchData());
        }}
        color="#841584"
      />
      <View style={{marginTop: 10}}>
        {listTodo?.map((item) => (
          <CardText key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default TodoScreen;
