/// <reference types="react" />
export default function alert(title: JSX.Element, message: JSX.Element, actions?: {
    text: string;
}[], platform?: string): {
    close: () => void;
};
