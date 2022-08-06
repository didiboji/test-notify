import "./App.css";
// import NewDom from "./Demo";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function App() {
  const child = (index) => <Child key={index} i={index + 1} />;

  const [arr, setArr] = useState([child(1), child(2)]);
  console.log("arr: ", arr);

  const createOneDom = () => {
    let list = [...arr];
    list.push(child(list.length + 1));
    setArr(list);
  };

  const children = () => {
    let list = [...arr];
    return (
      <React.Fragment>
        {list.map((item, index) => {
          console.log("item(index): ", item);
          return item;
        })}
      </React.Fragment>
    );
    // arr.map((item, index) => (
    //
    // ));
  };

  return (
    <div className="App">
      <button onClick={createOneDom}>多挂几个</button>
      <Modal>{children()}</Modal>
    </div>
  );
}

export default App;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.root = document.getElementById("root");

    this.el = document.createElement("div");
    this.el.className = "protal-div";
    this.el.style.cssText =
      "width:800px;height:200px;background-color: crimson;";

    this.divArr = document.getElementsByClassName("protal-div");
  }

  componentDidMount() {
    // 在 Modal 的所有子元素被挂载后，
    // 这个 portal 元素会被嵌入到 DOM 树中，
    // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
    // 如果要求子组件在挂载时可以立刻接入 DOM 树，
    // 例如衡量一个 DOM 节点，
    // 或者在后代节点中使用 ‘autoFocus’，
    // 则需添加 state 到 Modal 中，
    // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
    this.root.appendChild(this.el);
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  render() {
    return createPortal(
      this.props.children,
      this.divArr.length < 1 ? this.el : this.divArr[0]
    );
  }
}

function Child(props) {
  const [second, setSecond] = useState(4);
  console.log("second: ", second);
  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);
  const time = setTimeout(() => {
    console.log("time");
    setSecond(0);
    // let arr = props.arr;
    // arr.splice(props.i - 1, 1);
    // props.set(arr);
    clearTimeout(time);
  }, props.i * 1000);
  if (document.getElementsByClassName("protal-div")?.childNodes?.length === 0) {
    clearTimeout(time);
  }
  // 这个按钮的点击事件会冒泡到父元素
  // 因为这里没有定义 'onClick' 属性
  return second === 4 ? (
    <div className="modal">
      <button>淦挂不上{props.i}</button>
    </div>
  ) : null;
}

// function Modal(props) {
//   console.log("props: ", props);
//   // 在 DOM 中有两个容器是兄弟级 （siblings）
//   // console.log("root: ", root);
//   const divArr = document.getElementsByClassName("protal-div");
//   useEffect(() => {
//     return () => {
//       if (divArr.length > 0) {
//         root.removeChild(divArr[0]);
//       }
//     };
//   }, []);
//   if (divArr.length < 1) {
//     const el = document.createElement("div");

//     root.appendChild(el);
//     return createPortal(props.children, el);
//   }
//   return createPortal(props.children, divArr[0]);
// }
