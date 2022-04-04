import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Post } from '../models/post.model'

export const ADD_POST       = '[POST] Add'
export const REMOVE_POST    = '[POST] Remove'


// Section 3
export class AddPost implements Action {
    readonly type = ADD_POST

    constructor(public payload: Post) {}
}

export class RemovePost implements Action {
    readonly type = REMOVE_POST

    constructor(public payload: number) {}
}

// Section 4
export type Actions = AddPost | RemovePost