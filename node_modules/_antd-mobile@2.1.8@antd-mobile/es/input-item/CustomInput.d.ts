/// <reference types="react" />
import React from 'react';
import CustomKeyboard from './CustomKeyboard';
import { InputEventHandler } from './PropsType';
export interface NumberInputProps {
    placeholder?: string;
    disabled?: boolean;
    editable?: boolean;
    moneyKeyboardAlign?: 'left' | 'right' | string;
    value?: string;
    defaultValue?: string;
    prefixCls?: string;
    keyboardPrefixCls?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: InputEventHandler;
    onBlur?: InputEventHandler;
    confirmLabel: any;
    maxLength?: number;
    type?: string;
    style?: React.CSSProperties;
}
declare class NumberInput extends React.Component<NumberInputProps, any> {
    static defaultProps: {
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        placeholder: string;
        disabled: boolean;
        editable: boolean;
        prefixCls: string;
        keyboardPrefixCls: string;
    };
    container: Element;
    inputRef: HTMLDivElement | null;
    constructor(props: NumberInputProps);
    onChange: (value: any) => void;
    componentWillReceiveProps(nextProps: NumberInputProps): void;
    componentDidMount(): void;
    addBlurListener: () => void;
    removeBlurListener: () => void;
    componentWillUnmount(): void;
    saveRef: (el: CustomKeyboard | null) => void;
    getComponent(): JSX.Element;
    getContainer(): Element;
    renderCustomKeyboard(): void;
    doBlur: (ev: MouseEvent) => void;
    unLinkInput: () => void;
    onInputBlur: (value: string) => void;
    onInputFocus: () => void;
    onKeyboardClick: (KeyboardItemValue: string) => void;
    onFakeInputClick: () => void;
    focus: () => void;
    renderPortal(): JSX.Element | null;
    render(): JSX.Element;
}
export default NumberInput;
