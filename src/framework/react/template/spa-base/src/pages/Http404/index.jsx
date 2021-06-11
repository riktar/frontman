import React, { useEffect } from "react";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { pageNameState, activeUserState } from "store/atoms";
import PageName from "components/PageName";

const Http404 = (props) => {
  const setPageName = useSetRecoilState(pageNameState);
  const activeUser = useRecoilValue(activeUserState);
  useEffect(() => {
    setPageName("Not Found");
  }, []);

  return (
    <>
      <div className={classes.main}>
        <div className="w-full text-center">
          <h1 className={classes.title}>Ops Page not found!</h1>
          <p className="mt-10 text-gray-400 align-center">
            Are you lost? Go to the{" "}
            <Link to={"/"}>
              <span className="text-green-500">Home</span>
            </Link>
          </p>
          <PageName />
          <p className="mt-10">
            <strong>User Recoil:</strong> {activeUser.name} {activeUser.surname}
          </p>
        </div>
      </div>
    </>
  );
};

export default Http404;
