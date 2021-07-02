import { useRef } from "react";
import styles from "./index.module.css";
import styled from "styled-components";
import { useDispatch } from "../../../app/hooks";
import { reqSearchChannel } from "../api";


export default function VisitEditorHeader() {
  const searchInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()

  const handleSubmit = (e: any) => {
    e.preventDefault()
  
    // 提交數據
    commit();
  };
  // const handleKeyUp = (e: any) => {
  //   const { keyCode } = e;
  //   //不是enter就返回
  //   if (keyCode !== 13) {
  //     return; 
  //   }
  //   // 提交數據
  //   commit();
  // };
  const commit = () => {
    const value = searchInput.current?.value + "";
    if (value !== "") {
      // 提交數據
      dispatch(reqSearchChannel(value))
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.label_wrapper}>
          <label htmlFor="new-todo-input" className={styles.label_lg}>
            一緒にddしましょう o(*￣▽￣*)ブ
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className={`input ${styles.input_lg}`}
          name="text"
          autoComplete="off"
          placeholder="Type to add"
          // onKeyUp={handleKeyUp}
          ref={searchInput}
        />
        <AddItemBtn onClick={handleSubmit}>
          Add
        </AddItemBtn>
      </form>
    </>
  );
}


const AddItemBtn = styled.div`
    background: #333;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 35px;
    cursor: pointer;

    padding: 1rem;
    width: 95%;
    border-radius :5px;
    box-shadow: 0px 15px 10px -15px #000
`