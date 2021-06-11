import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { useSetRecoilState } from "recoil";
import { activeUserState } from "store/atoms";
import { useUser } from "hooks/useUserRequest";

const App = (props) => {
  const setActiveUser = useSetRecoilState(activeUserState);
  const { data, isLoading, isError } = useUser({ id: 1 });

  useEffect(() => {
    setActiveUser(isLoading ? {} : data);
  }, [isLoading]);

  return <div className={styles.root}>{isLoading || props.children}</div>;
};

App.propTypes = {
  children: PropTypes.any,
};

export default App;
