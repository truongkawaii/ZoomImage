import React, {useState} from 'react';
import {View, Text, CheckBox, Pressable, Modal, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './CardText.style';
import {editDataTodo, removeDataTodo, editTextData} from '../../redux/actions';
// import {v4 as uuidv4} from 'uuid';

const CardText = ({item}) => {
  const dispatch = useDispatch();
  const [isSelected, setSelection] = useState(false);
  const myIcon = <Icon name="trash" size={25} color="#fff" />;
  const user = <Icon name="edit" size={25} color="#fff" />;
  const [modalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = useState(item.name);
  //   const [key, setKey] = useState(null);
  return (
    <View>
      <View style={styles.CardText}>
        <Text style={styles.textCard}>{item.name}</Text>
        <CheckBox
          style={styles.checkbox}
          value={isSelected}
          onValueChange={() => {
            setSelection(!isSelected);
            dispatch(editDataTodo({key: item.id, check: !isSelected}));
          }}
          tintColors={{true: '#fff', false: 'black'}}
        />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{padding: 5}}>
          {user}
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => dispatch(removeDataTodo(item.id))}>
          {myIcon}
        </TouchableOpacity>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={{flex: 1}}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  dispatch(editTextData({objId: item.id, name: value}));
                }}>
                <Text style={styles.textStyle}>Save and Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default CardText;
