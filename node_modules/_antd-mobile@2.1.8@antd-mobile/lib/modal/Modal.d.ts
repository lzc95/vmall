/// <reference types="react" />
import React from 'react';
import { Action, ModalComponent, ModalPropsType } from './PropsType';
export interface ModalProps extends ModalPropsType {
    prefixCls?: string;
    transitionName?: string;
    maskTransitionName?: string;
    className?: string;
    wrapClassName?: string;
    wrapProps?: Partial<React.HTMLProps<HTMLDivElement>>;
    platform?: string;
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}
export default class Modal extends ModalComponent<ModalProps, any> {
    static defaultProps: {
        prefixCls: string;
        transparent: boolean;
        popup: boolean;
        animationType: string;
        animated: boolean;
        style: {};
        onShow(): void;
        footer: never[];
        closable: boolean;
        operation: boolean;
        platform: string;
    };
    renderFooterButton(button: Action, prefixCls: string | undefined, i: number): JSX.Element;
    render(): JSX.Element;
}
