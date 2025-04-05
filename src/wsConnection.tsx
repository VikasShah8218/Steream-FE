import  store from "./app/store" 
import { getAuthToken } from "./globals/auth";
import { setWsMessage , setWsConnection } from "./app/slices/authSlice";

export const initializeWebSocket = () => {
  let ws: WebSocket | null = null;

  const connectWebSocket = () => {
    ws = new WebSocket("ws://13.49.145.155:8000/ws?token=" + getAuthToken());
    // ws = new WebSocket("ws://13.49.145.155:8000/ws");
    ws.onopen    = () => {console.log("WebSocket connection established");};
    ws.onmessage = (event) => { store.dispatch(setWsMessage(JSON.parse(event.data))) };
    ws.onclose   = () => {console.log("WebSocket connection closed. Reconnecting...");reconnectWebSocket();};
    ws.onerror   = (error) => {console.error("WebSocket error:", error); ws?.close();};
    store.dispatch(setWsConnection(ws));
  };
  const reconnectWebSocket = () => {setTimeout(() => {console.log("Attempting to reconnect WebSocket...");connectWebSocket();},2000);};
  connectWebSocket(); 
  return ws;
};
