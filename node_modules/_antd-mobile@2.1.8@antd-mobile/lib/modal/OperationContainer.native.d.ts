/// <reference types="react" />
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
export interface OperationButtonType {
    text: string;
    onPress?: () => void;
    style?: StyleProp<TextStyle>;
}
export interface OperationContainerProps {
    actions: OperationButtonType[];
    onAnimationEnd?: (visible: boolean) => void;
}
export default class OperationContainer extends React.Component<OperationContainerProps, any> {
    constructor(props: OperationContainerProps);
    onClose: () => void;
    render(): JSX.Element;
}
