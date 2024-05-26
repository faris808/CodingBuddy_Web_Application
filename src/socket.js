import {io} from 'socket.io-client';
export const initSocket=async()=>{  //ye function basically client ka ek instance return karegi, isliye hamein jaha bhi iska instance chahiye hoga wahn ham sirf iss function ko call kardenge
    const options={
        'force new connection':true,
        reconnectionAttempts:'infinity',
        timeout:10000,
        transports:['websocket'],
    };
    return io(process.env.REACT_APP_BACKEND_URL,options);   //It will return the instance of socket client
};
