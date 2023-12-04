import ReactDOM from 'react-dom/client';
// import App from './01_类组件和函数组件/AppClass';
// import App from './02_组件生命周期函数/App';
// import App from './03_组件开发的嵌套关系/App';
// import App from './04_组件通信-父传子/App';
// import App from './05_组件通信-子传父/App';
// import App from './06_组件通信案例练习/App';
// import App from './07_组件插槽实现/App';
// import App from './08_组件作用域插槽/App';
import App from './09_非父子通信-Context/App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App></App>);
