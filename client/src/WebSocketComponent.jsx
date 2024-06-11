import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        // subscribe();
    }, []);

    const subscribe = async () => {
        try {
            const response = await fetch('http://localhost:5000/lp/get-messages');
            const result = await response.json();
            setMessages((prev) => [...prev, { value: result.message, id: result.id }]);
            subscribe();
        } catch (error) {
            console.error(error);
            setTimeout(subscribe, 1000);
        }
    };

    const sendMessage = async () => {
        try {
            // const response = await fetch('http://localhost:5000/lp/send-message', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         message: value,
            //         id: Date.now(),
            //     }),
            // });
            // if (response.ok) {
            //     setValue('');
            // }
        } catch (error) {
            console.error(error);
        }
    };

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
                        {message.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WebSocketComponent;
