import React, { useState } from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

const ChatButton = ({ onChatWithAdmin, onDiscussion, onToggleChat }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    onToggleChat();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`transition-opacity duration-500 ${
          showOptions ? "opacity-100" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col mb-2 space-y-2">
          <button
            onClick={onChatWithAdmin}
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
          >
            アドバイス
          </button>
          <button
            onClick={onDiscussion}
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
          >
            話し合う
          </button>
        </div>
      </div>
      <button
        onClick={toggleOptions}
        className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ChatButton;
