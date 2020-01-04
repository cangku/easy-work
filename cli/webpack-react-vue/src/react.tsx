import * as React from 'react';
import * as ReactDOM from 'react-dom';
// 创建一个 global.d.ts
// declare module '*.css';
import './react.module.css';

interface Props {
    name: string;
}

class App extends React.Component<Props> {
    render() {
        return <div className="name">Hello {this.props.name}</div>;
    }
}

var mountNode = document.getElementById('app-react');
ReactDOM.render(<App name="unofficial" />, mountNode);
