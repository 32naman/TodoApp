// import { History } from 'history';
import React, { useEffect } from "react";
import "./Login.css";
// import { Redirect } from 'react-router-dom';
// import { rootCertificates } from 'tls';
declare var gapi: any;

interface Props {
  updateState: (id_token: string) => void;
  state: {
    id_token: string;
  };
  /* other props for ChildComponent */
}
function Login(props: Props) {
  let onSignIn = (googleUser: {
    getAuthResponse: () => { (): any; new (): any; id_token: string };
  }) => {
    // console.log(googleUser);
    for (let i = 0; i < 10; i++) console.log("\n");
    const id_token: string = googleUser.getAuthResponse().id_token;
    props.updateState(id_token);
    localStorage.setItem("id_token", id_token);
    window.location.assign("https://todoappdeploy.netlify.app/todos");
  };

  useEffect(() => {
    console.log("Component Mounted");
    gapi.signin2.render("gsign", {
      scope: "profile email",
      width: 200,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSignIn,
    });
  }, []);

  return (
    <div className="container">
      <div className="g-signin2" id="gsign">
        {" "}
      </div>
    </div>
  );
}

export default Login;
