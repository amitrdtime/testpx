import React, { useEffect, useState, createContext } from 'react';
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../../authConfig";
import { callMsGraph } from '../../appSession';
const ContextData = createContext()
export { ContextData };
function AppSession(props) {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [userAccountData, setuserAccountData] = useState({})
  const isAuthenticated = useIsAuthenticated();

  const getUserInfoMSGraph = async function (uniqueId) {
    const token = sessionStorage.getItem('accesstoken');
    if (uniqueId) {
      //This Part gets the User
      try {
          const userData = await callMsGraph(token);
          sessionStorage.setItem("appsession", userData);
          setuserAccountData(userData.data);
      }
      catch (error) {
        console.error("Throwing an error object", error);
      }
    }
  }
  useEffect(() => {
    if (isAuthenticated && account) {
      instance.acquireTokenSilent({
        ...loginRequest,
        account: account
      }).then((response) => {
        sessionStorage.setItem("accesstoken", response.accessToken);
        getUserInfoMSGraph(response.uniqueId);
      }).catch((error) => {
        console.error("Throwing an error object", error);
      })
    }
  }, [isAuthenticated, account, instance])

  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect({
        ...loginRequest,
        account: account
      }).then((response) => {
        sessionStorage.setItem("accesstoken", response.accessToken);
        getUserInfoMSGraph(response.uniqueId);
      })
    }
  }, [isAuthenticated, inProgress, account, instance]);

  return (
    <>
      {
        userAccountData !== undefined ? (
          <ContextData.Provider value={[userAccountData, setuserAccountData]}>
            {props.children}
          </ContextData.Provider>
        ) :
          (
            <div id="wrapper">
              {/* <Header></Header>
              <AppBar></AppBar> */}
              <div className="card" >
                <div className="card-body">
                  <h5 className="card-title">Session Error</h5>
                  <h6 className="card-subtitle mb-2 text-muted">There is no user session!</h6>
                  <p className="card-text">Either your account is not valid or your account is yet to be created. Please try refreshing the page to initiate the session. If it does not work, please contact system administrator.</p>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}
export default AppSession;