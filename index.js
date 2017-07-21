import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing,
} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, computed, action, autorun} from 'mobx';


class ToastMobx {

    durations = {
        LONG: 3500,
        SHORT: 2000
    }

    positions = {
        TOP: 1,
        BOTTOM: 2,
    }


    @observable
    isShow = false;

    message = '';

    duration;

    position;

    textColor;

    backgroundColor;

    isFillWidth;//宽度是否全屏

    height;

    @action
    show = (message, options) => {
        this.isShow = true;
        this.message = message;
        this.position = (options && options.position) || this.positions.BOTTOM;
        this.duration = (options && options.duration) || this.durations.SHORT;
        this.textColor = (options && options.textColor) || 'white';
        this.backgroundColor = (options && options.backgroundColor) || '#00000066';
        this.isFillWidth = (options && options.isFillWidth) || false;
        this.height = options && options.height;
    }

    @action
    hide = () => {
        this.isShow = false;
    }
}

export default Toast = new ToastMobx();

@observer
export class ToastContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacityValue: new Animated.Value(0.4),
        }
    }

    animDuration = 300;
    _startAnim = () => {
        Animated.timing(this.state.opacityValue,
            {
                toValue: 1,
                duration: this.animDuration,
                easing: Easing.out(Easing.ease)
            }).start(() => {
            setTimeout(() => this._hideAnim(), Toast.duration - this.animDuration * 2)

        });
    }

    _hideAnim = () => {
        Animated.timing(this.state.opacityValue,
            {
                toValue: 0.4,
                duration: this.animDuration,
                easing: Easing.in(Easing.ease)
            }).start(() => {
            Toast.hide();
        });
    }

    generateContainerStyle() {
        var style = {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Toast.backgroundColor,
            position: 'absolute',
        }
        if (Toast.height) {
            style = Object.assign(style, {
                height: Toast.height,
            });
        } else {
            style = Object.assign(style, {
                paddingTop: 8,
                paddingBottom: 8,
            });
        }

        if (Toast.position == Toast.positions.TOP) {
            style = Object.assign(style, {
                top: 0,
            });
        } else {
            style = Object.assign(style, {
                bottom: 30,
            });
        }

        if (Toast.isFillWidth) {
            style = Object.assign(style, {
                left: 0,
                right: 0
            });
        } else {
            style = Object.assign(style, {
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 60,
            });
        }
        return style;
    }

    render() {
        if (!Toast.isShow) {
            return null;
        }
        var props = Object.assign({}, this.props);
        if (props.style) {
            props.style = Object.assign(props.style, this.generateContainerStyle());
        } else {
            props.style = Object.assign({}, this.generateContainerStyle());
        }

        if (Toast.isShow) {
            this._startAnim();
        }
        return (
            <Animated.View
                style={[props.style, {opacity: this.state.opacityValue}]}>
                <Text style={{color: Toast.textColor}}>{Toast.message}</Text>
            </Animated.View>

        );
    }
}

