import React, { useEffect } from "react";
import { pageNameState, activeUserState } from "store/atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";
import PageName from "../../components/PageName";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";

const Home = (props) => {
  const setPageName = useSetRecoilState(pageNameState);
  const activeUser = useRecoilValue(activeUserState);
  useEffect(() => {
    setPageName("Home");
  }, []);

  return (
    <>
      <div className={classes.main}>
        <div className="w-full text-center">
          <h1 className={classes.title}>Ready to Code!</h1>
          <h2 className={classes.subtitle}>
            Powered by <strong className="text-green-600">Frontman</strong>
          </h2>
          <PageName />
          <p className="mt-10">
            <Link to={"/aaa"}>
              <span className="text-indigo-500">Go to "Not Found" Page</span>
            </Link>
          </p>

          <p className="mt-10">
            <strong>User Recoil:</strong> {activeUser.name} {activeUser.surname}
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
