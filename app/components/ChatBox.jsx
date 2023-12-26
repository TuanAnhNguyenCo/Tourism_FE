import React, { useState, useContext } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChatContext } from "../context/ChartContext";
import { UserContext } from "../context/UserContext";
import AvatarChatComponent from "./AvatarChat";

function Messages({ index, isCurrentUser, username, message }) {
  return (
    <div key={index} className={`flex ${isCurrentUser ? "justify-end" : ""}`}>
      {!isCurrentUser && (
        <AvatarChatComponent
          user={{ name: username, avatarUrl: "" }}
          avatarSize="6"
        />
      )}
      <p
        className={`max-w-xs ml-2 px-4 py-2 my-1 rounded-lg ${
          isCurrentUser ? "bg-blue-200" : "bg-white"
        }`}
      >
        {message}
      </p>
    </div>
  );
}
const ChatBoxComponent = ({ chatMode }) => {
  const [message, setMessage] = useState("");

  const { messages, sendMessage } = useContext(ChatContext);

  const { user } = useContext(UserContext);

  console.log(chatMode);

  const handleSendMessage = () => {
    sendMessage(`${chatMode}: ${user.name}: ${message}`);
    setMessage("");
  };

  const chatWithAdminMessages = messages.filter((msg) => {
    return msg.split(":")[0].trim() === "admin";
  });

  const diccusionMessages = messages.filter((msg) => {
    return msg.split(":")[0].trim() === "discussion";
  });

  const messages_ =
    chatMode === "admin" ? chatWithAdminMessages : diccusionMessages;

  return (
    <div className="rounded-xl shadow-xl fixed bottom-4 right-[10rem] w-96 z-40">
      <div
        className={`text-white px-2 text-center ${
          chatMode === "admin" ? "bg-orange-400" : "bg-blue-400"
        }`}
      >
        {chatMode === "admin" ? "アドバイス" : "話し合う"}
      </div>
      <div
        className={
          chatMode === "admin" ? "bg-orange-100 p-4" : "bg-blue-100 p-4"
        }
      >
        <div className="overflow-y-auto h-[30rem] mb-4">
          {messages_.map((msg, index) => {
            const senderName = msg.split(":")[1].trim();
            const senderMessage = msg.split(":")[2].trim();
            const isCurrentUser = senderName === user.name;

            return (
              <Messages
                key={index}
                index={index}
                isCurrentUser={isCurrentUser}
                username={senderName}
                message={senderMessage}
              />
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => {
            e.preventDefault();
            setMessage(e.target.value);
          }}
          type="text"
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="メッセージを入力してください..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-2"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBoxComponent;
