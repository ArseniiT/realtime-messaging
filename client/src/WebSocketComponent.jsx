import React, { useRef, useState } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [isConnected, setIsConnected] = useState(false);
    const [userName, setUserName] = useState('');


    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            setIsConnected(true);
            const message = {
                type: 'connection',
                data: userName,
                id: Date.now(),
            };
            socket.current.send(JSON.stringify(message));
            console.log('Connection opened');
        };

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev) => [message, ...prev]);
        };

        socket.current.onclose = () => {
            console.log('Connection closed');
        };

        socket.current.onerror = () => {
            console.error('Socket error');
        }
    };


    const sendMessage = async () => {
        const message = {
            type: 'message',
            data: userName,
            message: value,
            id: Date.now(),
        };

        socket.current.send(JSON.stringify(message));
        setValue('');
    };

    if (!isConnected) {
        return (
            <div className='flex flex-col justify-start items-center h-screen pt-16'>
                <div className='w-full max-w-xs m-0'>
                    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                                Username
                            </label>
                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='username'
                                type='text'
                                placeholder='John Doe'
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <button
                                onClick={() => {
                                    connect();
                                }}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                type='button'
                            >
                                Connect
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-start items-center h-screen pt-16'>
            <div className='w-full max-w-xs m-0'>
                <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
                            Message
                        </label>
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='message'
                            type='text'
                            placeholder='Hello'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            onClick={sendMessage}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            <div className='w-full max-w-xs'>
                {messages.map((message) => (
                    <div key={message.id} className='bg-gray-200 p-2 m-2 rounded-lg'>
                        {message.type === 'connection' ?
                            <div>User {message.data}  connected.</div> :
                            <div>{message.data}. {message.message}</div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WebSocketComponent;
