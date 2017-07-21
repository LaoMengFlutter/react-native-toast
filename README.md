# react-native-toast
消息提示，适配android和ios

项目中依赖了mobx（https://github.com/mobxjs/mobx） 和  babel-plugin-transform-decorators-legacy（https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy）

使用：

1、在终端进入到项目目录：npm i react-native-mobx-toast --save

2、在整个app的最外层添加 ToastContainer 控件，一般项目我们都会用到react-navigation，所以使用react-navigation实例：
      import {ToastContainer} from 'react-native-mobx-toast'
      import Toast from 'react-native-mobx-toast'
      
      render() {
        return (
            <View style={{flex: 1}}>
                <Navigator/>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,justifyContent:'center',alignItems:'center'}}>
                    <ToastContainer/>
                </View>
            </View>
        );
    }
    
    
 3、在需要弹出的地方调用：  Toast.show('this is message');
 
 
 show方法等参数：
 
 message：显示的消息
 
 position：消息显示的位置，top和bottom，默认bottom
 
 duration：消息显示的时间，Toast.durations.LONG（3500ms）和Toast.durations.SHORT（2000ms），默认short
 
 textColor：消息字体颜色，默认‘white’，
 
 backgroundColor：背景颜色，默认‘#00000066’，
 
 isFillWidth：框宽度是否充满父组件（全屏），默认false，随消息的长度而变化
 
 height：消息框的高度，默认消息的高度而变化，
 
 
 ![image](https://github.com/781238222/react-native-toast/blob/master/examples/screen/1.png)
  ![image](https://github.com/781238222/react-native-toast/blob/master/examples/screen/2.png)
