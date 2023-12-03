import ReactDOM from 'react-dom/client';
// import App from './01_类组件和函数组件/AppClass';
import App from './02_组件生命周期函数/App';
// import AppFun from './AppFun';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// 类组件
root.render(<App></App>);
// 函数组件
// root.render(<AppFun></AppFun>);
