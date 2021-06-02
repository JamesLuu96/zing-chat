import React, { useState } from "react";
import PrivateChat from "./index";
import { MessageOutlined } from "@ant-design/icons";
import { Badge } from "antd";
function Private() {
  const [visible, setVisibility] = useState(false);
  const showPrivateMessage = (e) => {
    e.preventDefault();
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  return (
    <div>
      <Badge count={4} overflowCount={4} className="message-badge">
        <MessageOutlined
          onClick={showPrivateMessage}
          className="message-icon"
        />
      </Badge>
      <PrivateChat visible={visible} onClose={onClose} />
    </div>
  );
}

export default Private;
