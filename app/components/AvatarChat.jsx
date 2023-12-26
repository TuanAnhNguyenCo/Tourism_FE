import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const AvatarChatComponent = ({ user, iconSize = "8" }) => {
  return (
    <div className="flex flex-col items-center">
      <UserIcon
        className={`h-${iconSize} w-${iconSize} text-gray-500`} // Adjust size with iconSize prop
      />
      <span className="text-sm mt-1">{user.name}</span>
    </div>
  );
};

export default AvatarChatComponent;
