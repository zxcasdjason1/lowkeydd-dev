import { createSlice } from '@reduxjs/toolkit'

type CardsProps = {
    heart:string[]
}

const initialState:CardsProps = {
    heart:[],
}

const slice = createSlice({
    name: "cards",
    initialState,
    reducers: {
    
    }
});

export const {

} = slice.actions
export default slice.reducer