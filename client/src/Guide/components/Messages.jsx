import React, { useState } from 'react';
import Navbar from '../../pages/Navbar';
import GuideSidebar from '../GuideSidebar';

function Messages() {
  // Sample chat data
  const initialChats = [
    { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?', messages: ['Hello Alice!', 'How are you?', 'I am doing great!'] },
    { id: 2, name: 'Bob', lastMessage: 'Can we meet tomorrow?', messages: ['Hello Bob!', 'Sure, what time?', '10 AM sounds good.'] },
    { id: 3, name: 'Charlie', lastMessage: 'Let’s catch up later!', messages: ['Hi Charlie!', 'Yes, let’s do it.', 'Talk soon!'] },
  ];

  // State management
  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() && selectedChat) {
      const updatedChats = chats.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
            }
          : chat
      );

      setChats(updatedChats);
      const updatedChat = updatedChats.find(chat => chat.id === selectedChat.id);
      setSelectedChat(updatedChat);
      setNewMessage('');
    }
  };

  return (
    <div className="flex">
      {/* Navbar and Sidebar */}
      <Navbar />
      <GuideSidebar />

      <div className="flex ml-[360px] mt-[56px] w-full h-[calc(100vh-56px)] bg-gradient-to-r from-gray-100 to-gray-300">
        {/* Chat List */}
        <div className="w-1/3 bg-white border-r border-gray-300 overflow-y-auto mt-4 shadow-lg rounded-lg">
          <ul>
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`p-4 m-2 rounded-lg shadow-sm cursor-pointer transition duration-300 
                ${selectedChat?.id === chat.id ? 'bg-blue-200 border-l-4 border-blue-600' : 'bg-gray-50 hover:bg-blue-50'}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                    <p className="text-gray-500 text-sm">{chat.lastMessage}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chatbox */}
        <div className="w-2/3 bg-white flex flex-col rounded-lg shadow-lg mt-4">
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              <div className="bg-blue-500 text-white p-4 rounded-t-lg shadow-md">
                <h3 className="font-bold text-lg">{selectedChat.name}</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-100 rounded-b-lg">
                {selectedChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block p-2 rounded-md transition duration-300 ${
                        index % 2 === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white border-t border-gray-300">
                <form className="flex" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;