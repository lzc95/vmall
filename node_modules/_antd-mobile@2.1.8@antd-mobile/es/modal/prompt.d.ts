/// <reference types="react" />
import { CallbackOrActions } from './PropsType';
export default function prompt(title: JSX.Element, message: JSX.Element, callbackOrActions: CallbackOrActions, type?: string, defaultValue?: string, placeholders?: string[], platform?: string): {
    close: () => void;
};
