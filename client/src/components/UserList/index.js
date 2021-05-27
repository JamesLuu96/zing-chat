import React, { useEffect } from "react";
import UserCard from "../UserCard";
import { Layout } from "antd";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { UPDATE_USERS } from "../../utils/actions";
import { useStoreContext } from "../../utils/globalState";
const { Content } = Layout;

export default function UserList() {
  const { loading, data } = useQuery(QUERY_USERS);
  const [state, dispatch] = useStoreContext();
  const { users } = state;

  useEffect(() => {
    if (data) {
      const { users } = data;

      dispatch({
        type: UPDATE_USERS,
        users: users,
      });
    } else if (!loading) {
      console.log("something went wrong!!");
    }
  }, [loading, data]);

  return (
    <>
      <Content style={{ padding: "20px" }}>
        {users[0] &&
          users[0].map((user, i) => {
            return <UserCard key={i} user={user} />;
          })}
      </Content>
    </>
  );
}
