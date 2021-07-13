import type { RootState, AppDispatch } from "./store";
// hooks
import {
  TypedUseSelectorHook,
  useDispatch as hook_useDispatch,
  useSelector as hook_useSelector,
} from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// 不要直接用store.getState(),useSelector會在你store發生改變時重新渲染，省掉"訂閱"部分
export const useSelector: TypedUseSelectorHook<RootState> = hook_useSelector;

// redux會自動幫我們創建context
export const useDispatch = () => hook_useDispatch<AppDispatch>();

