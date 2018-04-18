/// <reference types="react" />
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
export interface AlertButtonType {
    text: string;
    onPress?: () => void | Promise<any>;
    style?: StyleProp<TextStyle>;
}
export interface AlertContainerProps {
    title: JSX.Element;
    content: JSX.Element;
    actions: AlertButtonType[];
    onAnimationEnd?: (visible: boolean) => void;
}
export default class AlertContainer extends React.Component<AlertContainerProps, any> {
    constructor(props: AlertContainerProps);
    onClose: () => void;
    render(): JSX.Element;
}
