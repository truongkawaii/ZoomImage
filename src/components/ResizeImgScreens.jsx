import React, {Component} from 'react';
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
      'https://oecdenvironmentfocusblog.files.wordpress.com/2020/06/wed-blog-shutterstock_1703194387_low_nwm.jpg?w=640',
    scaleNote: 1,
    measurements: {},
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

  onLeftIconHeader = () => {
    this._goBack();
  };

  pan = new Animated.ValueXY({x: 0, y: 0});
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });
    },

    // onPanResponderMove: Animated.event([
    //   null,
    //   {dx: this.pan.x, dy: this.pan.y},
    // ]),
    // onPanResponderMove: (...args ) => {
    //   console.log("arg", ...args)
    // },
    onPanResponderRelease: () => {
      // console.log("before_x", {...this.pan.x})
      // console.log("before_y", {...this.pan.y})

      this.pan.flattenOffset();
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

  render() {
    const {imgSource} = this.state;
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
            <PinchGestureHandler
              onGestureEvent={this._onPinchGestureEvent}
              onHandlerStateChange={this._onPinchHandlerStateChange}>
              <Animated.View
                // pointerEvents="none"
                style={{
                  transform: [
                    {translateX: this.pan.x},
                    {translateY: this.pan.y},
                  ],
                }}
                {...this.panResponder.panHandlers}>
                {/* transform: [{perspective: 200}, {scale: this._scale}], */}
                <ImageZoom
                  style={{borderWidth: 1}}
                  cropWidth={300}
                  cropHeight={400}
                  imageWidth={300}
                  imageHeight={400}>
                  <Animated.Image
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{uri: imgSource}}
                    resizeMode={'contain'}
                  />
                </ImageZoom>
              </Animated.View>
            </PinchGestureHandler>
          </View>
          <View>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{uri: this.state.imgSource}}
            />
            <Text>width :{this.state.measurements.width} </Text>
            <Text>height : {this.state.measurements.height}</Text>
            <Text>X:{this.state.measurements.x} </Text>
            <Text>Y: {this.state.measurements.y}</Text>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{
                uri:
                  'https://oecdenvironmentfocusblog.files.wordpress.com/2020/06/wed-blog-shutterstock_1703194387_low_nwm.jpg?w=640',
              }}
            />
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
