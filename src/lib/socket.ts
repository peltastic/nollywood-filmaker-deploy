import {io} from "socket.io-client"

import config from "@/config/config"

export const primary_socket = io(config.API_URL)

export function initializeTransactionListener (userId:string) {
    primary_socket.emit("register", userId)
}