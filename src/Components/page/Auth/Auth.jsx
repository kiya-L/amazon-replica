import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Signup.module.css";
import { ClipLoader } from "react-spinners";
import { auth } from "../../../Utility/firebase";
import { Type } from "../../../Utility/Action";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../DataProvider.js/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navstateData = useLocation();
  const [Loading, setLoading] = useState({ signIn: false, signUp: false });

  //console.log(user);
  const authHandeler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      //firebase auth
      setLoading({ ...Loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...Loading, signIn: false });
          navigate(navstateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.massage);
          setLoading({ ...Loading, signIn: false });
        });
    } else {
      setLoading({ ...Loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          //console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...Loading, signUp: false });
          navigate(navstateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.massage);
          setLoading({ ...Loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* {logo} */}
      <Link to={"/"}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjCWR7BH8bw7fCERAWEt7cXoKtfokn7Lj7mdyE9RasNP3t9KwltwIiOHVOA&s"
          alt=""
        />
      </Link>
      {/* {form} */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navstateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navstateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            name="signin"
            onClick={authHandeler}
            className={classes.login__signInButton}
          >
            {Loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* {agrement} */}
        <p>
          By signing-in you agree to be the AMAZON FAKE REPLICA conditions of
          Use & sale.please see our privacy Notice,our cookies Notice and our
          inserest-base ads Notice
        </p>

        {/* {create account} */}
        <button
          type="submit"
          name="signup"
          onClick={authHandeler}
          className={classes.login__registerbutton}
        >
          {Loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
