import {io} from 'socket.io-client'

// base url
export const BASE_URL = 'http://localhost:5050'

// socket
export const SOCKET = io('ws://localhost:5050')