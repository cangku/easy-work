import * as React from 'react';
import * as ReactDOM from 'react-dom';
// 创建一个 global.d.ts
// declare module '*.css';
import style from './react.css';

interface Props {
    name: string;
}

class App extends React.Component<Props> {
    render() {
        console.log(style);
        return <div className="name">Hello {this.props.name}</div>;
    }
}

var mountNode = document.getElementById('app-react');
ReactDOM.render(<App name="unofficial" />, mountNode);
