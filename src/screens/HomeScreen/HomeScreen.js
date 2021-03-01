import React, {Component, createRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TextInput,
  PanResponder,
  Animated,
  Image,
  Button,
} from 'react-native';
// import colors from '../../../../res/colors';
// import Page from '../../../../components/Page';
// import HeaderText from '../../../../components/HeaderText';

// import BaseButtonEmployeeCard from './BaseButtonEmployeeCard';
// import images from '../../../../res/images';
// import {ImagePickerCrop} from './BaseImgPicker';
// import {ScreenName} from '../../../AppContainer';
// import {mobileLoadingService} from '../../../../components/Loading';
// import ImagePicker from 'react-native-image-crop-picker';
// import {UrlTile} from 'react-native-maps';
// import {showToast} from '../../../../utils/Utils';
// import {any, string} from 'prop-types';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {transform} from 'lodash';

const sizePhone = Dimensions.get('window');

import ImageZoom from 'react-native-image-pan-zoom';
class ResizeImgScreens extends Component {
  _baseScale = new Animated.Value(1);
  _pinchScale = new Animated.Value(1);
  _scale = Animated.multiply(this._baseScale, this._pinchScale);
  _lastScale = 1;
  _onPinchGestureEvent = Animated.event(
    [{nativeEvent: {scale: this._pinchScale}}],
    {useNativeDriver: true},
  );
  containerViewRef = createRef();
  // const [pageY, setPageY] = useState(0);
  _onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };
  // state: State = {
  //   imgSource:null,
  // };
  state = {
    imgSource:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg',
    scaleNote: 1,
    measurements: {},
    pageY: 0,
    minScale: 1,
  };

  imgWidth = 0;
  imgHeight = 0;

  handlerZoomMoveImage = () => {
    this.containerViewRef.current.focus();
  };
  // componentDidMount() {
  //   //@ts-ignore
  //   // let imgSource = this.props.navigation.getParam('urlPicker');
  //   let imgSource = null;
  //   if (imgSource !== undefined) {
  //     this.setState({
  //       imgSource:
  //         'https://i.pinimg.com/originals/61/df/c6/61dfc647ee1b3a2792c0d6d2e3b434da.jpg',
  //     });
  //   }
  // }
  componentDidMount() {
    Image.getSize(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg',
      (w, h) => {
        this.imgWidth = w;
        this.imgHeight = h;
        let ratio;
        if (w > h) {
          ratio = h / 400;
          this.setState({minScale: ratio > 1 ? ratio : 1 / ratio}, () =>
            this.imageZoomRef?.reset(),
          );
        } else {
          ratio = w / 300;
          this.setState({minScale: ratio > 1 ? ratio : 1 / ratio}, () =>
            this.imageZoomRef?.reset(),
          );
        }
      },
    );
  }
  onLeftIconHeader = () => {
    this._goBack();
  };

  pan = new Animated.ValueXY({x: 0, y: 0});
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      console.log(this.pan);
      // this.pan.setOffset({
      //   x: this.pan.x._value,
      //   y: this.pan.y._value,
      // });
    },

    // onPanResponderMove: Animated.event([
    //   null,
    //   {dx: this.pan.x, dy: this.pan.y},
    // ]),
    // onPanResponderMove: (...args ) => {
    //   console.log("arg", ...args)
    // },
    onPanResponderRelease: (e, state) => {
      // console.log("before_x", {...this.pan.x})
      // console.log("before_y", {...this.pan.y})
      console.log(state);
      // this.pan.flattenOffset();
      // console.log("after_x", {...this.pan.x})
      // console.log("after_y", {...this.pan.y})
    },
  });

  // convertToPixelCrop(crop, imageWidth, imageHeight) {
  //   if (!crop.unit) {
  //     return {...crop, unit: 'px'};
  //   }

  //   if (crop.unit === 'px') {
  //     return crop;
  //   }

  //   return {
  //     unit: 'px',
  //     aspect: crop.aspect,
  //     x: (crop.x * imageWidth) / 100,
  //     y: (crop.y * imageHeight) / 100,
  //     width: (crop.width * imageWidth) / 100,
  //     height: (crop.height * imageHeight) / 100,
  //   };
  // }

  onCropImg = (imgSource) => {
    console.log('dsdsdsdsdsdsdsd', this.convertToPixelCrop(20, 30, 40));
  };

  calculateBoundingBox = () => {};

  imageZoomRef;

  printBoundingBox = () => {};

  render() {
    const {imgSource} = this.state;
    // console.log(this.state.minScale);
    return (
      <View style={styles.page}>
        {/* <HeaderText
          leftIconDisable={false}
          title={strings.employee_card_registration}
          showToyalNotify={false}
          leftIconPress={this.onLeftIconHeader}
          rightIconDisable={true}
        /> */}
        <View style={styles.container}>
          <View style={{marginVertical: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>Di chuyển và chia tỷ lệ 3x4</Text>
          </View>

          <View
            style={{alignSelf: 'center'}}
            ref={(ref) => (this.view = ref)}
            onLayout={({nativeEvent}) => {
              this.setState({
                measurements: nativeEvent.layout,
              });
            }}>
            {/* <PinchGestureHandler
              onGestureEvent={this._onPinchGestureEvent}
              onHandlerStateChange={this._onPinchHandlerStateChange}> */}
            <Animated.View
            // pointerEvents="none"
            >
              <ImageZoom
                onMove={this.handlerZoomMoveImage}
                ref={(ref) => (this.imageZoomRef = ref)}
                style={{borderWidth: 1}}
                minScale={this.state.minScale}
                cropWidth={300}
                cropHeight={400}
                imageWidth={300}
                imageHeight={400}>
                <Animated.Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  ref={this.containerViewRef}
                  onLayout={({nativeEvent}) => {
                    console.log(nativeEvent.layout);
                  }}
                  source={{uri: imgSource}}
                  resizeMode={'contain'}
                />
              </ImageZoom>
            </Animated.View>
            {/* </PinchGestureHandler> */}
          </View>
          <View>
            <Text>width :{this.state.measurements.width} </Text>
            <Text>height : {this.state.measurements.height}</Text>
            <Text>X:{this.state.measurements.x} </Text>
            <Text>Y: {this.state.measurements.y}</Text>
          </View>
          {/* <View
            style={{
              position: 'relative',
              height: (sizePhone.height / 3.4) * 2,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <View
              style={{
                position: 'absolute',
                width: 148,
                height: 187,
                backgroundColor: '#fff',
              }}>
              
            </View>

            <View
              style={{
                height: (sizePhone.height / 3.4) * 2,
                width: (sizePhone.width - 196) / 2,
                backgroundColor: 'rgba(112,112,112,0.7)',
                position: 'absolute',
                left: 0,
              }}></View>
            <View
              style={{
                height: (sizePhone.height / 3.4) * 2,
                width: (sizePhone.width - 196) / 2,
                backgroundColor: 'rgba(112,112,112,0.7)',
                position: 'absolute',
                right: 0,
              }}></View>
            <View
              style={{
                height: ((sizePhone.height / 3.4) * 2 - 187) / 2,
                width: sizePhone.width - (sizePhone.width - 148),
                backgroundColor: 'rgba(112,112,112,0.7)',
                position: 'absolute',
                top: 0,
              }}></View>
            <View
              style={{
                height: ((sizePhone.height / 3.4) * 2 - 187) / 2,
                width: sizePhone.width - (sizePhone.width - 148),
                backgroundColor: 'rgba(112,112,112,0.7)',
                position: 'absolute',
                bottom: 0,
              }}>
            </View>
          </View> */}
          <Button title="crop image" onPress={this.printBoundingBox} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'red',
    borderWidth: 1,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  borderBtn: {
    borderWidth: 1,
    borderColor: '#C3112A',
  },
});

export default ResizeImgScreens;
