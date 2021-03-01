import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  CardText: {
    height: 44,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: '#4DD2D2',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    justifyContent: 'space-between',
  },
  textCard: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  checkbox: {
    borderColor: '#fff',
    // backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 320,
    height: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: 220,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default styles;
