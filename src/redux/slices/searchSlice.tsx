import {createSlice} from "@reduxjs/toolkit";


type searchType = {
    programmers: string,
    tasks: string,
    chat: string,
}

interface searchSliceType {
    search: searchType
}

const initialState: searchSliceType = {
    search: {
        programmers: '',
        tasks: '',
        chat: '',
    }
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {


        setProgrammersSearch(state, action) {
            state.search.programmers = action.payload
        },
        setTasksSearch(state, action) {
            state.search.tasks = action.payload
        },
        setChatSearch(state, action) {
            state.search.chat = action.payload
        },
        clearAllSearch(state) {
            state.search = {
                programmers: '',
                tasks: '',
                chat: '',
            }
        },
    }
})

export const {setProgrammersSearch, setTasksSearch, setChatSearch, clearAllSearch,} = searchSlice.actions
export default searchSlice.reducer