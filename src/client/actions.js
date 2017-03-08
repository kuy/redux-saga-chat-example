import { createAction } from 'redux-act';

export const login = createAction('login');
export const logout = createAction('logout');

export const addUser = createAction('add user');
export const removeUser = createAction('remove user');

export const newMessage = createAction('new message');
export const sendMessage = createAction('send message');

export const ws_disconnected = createAction('ws is disconnected');
export const connecting = createAction('connecting');
