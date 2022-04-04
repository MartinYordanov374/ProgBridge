import { Action } from '@ngrx/store'
import { Post } from '../models/post.model'
import * as PostActions from '../actions/crud.actions'

// Section 1
const initialState: Post = {

    Author: '',
    Content: '',
    Likes: [],
    Shares: [],
    Comments: []
}

// Section 2
export function reducer(state: Post[] = [initialState], action: Action) {
    const postAction = action as PostActions.Actions; 

    // Section 3
    switch(postAction.type) {
        
        case PostActions.ADD_POST:

            return [...state, postAction.payload]

        // case PostActions.REMOVE_POST:
        //     state.splice(postAction.payload,1)
        //     return state
        default:
            return state;
    }
}