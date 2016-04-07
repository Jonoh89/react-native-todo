export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';

export function setIsConnected(isConnected) {
  return {
    type: SET_IS_CONNECTED,
    isConnected,
  };
}
