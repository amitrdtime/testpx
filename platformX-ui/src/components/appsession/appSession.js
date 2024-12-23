import React, { useEffect } from 'react';
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../../authConfig";
import useUserStore from '../../store/useUserStore';

function AppSessionNew({ children }) {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const isAuthenticated = useIsAuthenticated();
  
  const { setToken, fetchUserData, fetchProfileImage } = useUserStore((state) => ({
    setToken: state.setToken,
    fetchUserData: state.fetchUserData,
    fetchProfileImage: state.fetchProfileImage,
  }));

  useEffect(() => {
    if (isAuthenticated && account) {
      instance.acquireTokenSilent({
        ...loginRequest,
        account: account
      }).then(response => {
        const token = response.accessToken;
        sessionStorage.setItem("accesstoken", token);
        setToken(token);
        fetchUserData(response.uniqueId);
        fetchProfileImage();
      }).catch(error => {
        console.error("Error acquiring token silently:", error);
      });
    }
  }, [isAuthenticated, account, instance, setToken, fetchUserData, fetchProfileImage]);

  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect({
        ...loginRequest,
        account: account
      }).then(response => {
        const token = response.accessToken;
        sessionStorage.setItem("accesstoken", token);
        setToken(token);
        fetchUserData(response.uniqueId);
        fetchProfileImage();
      });
    }
  }, [isAuthenticated, inProgress, account, instance, setToken, fetchUserData, fetchProfileImage]);

  return (
    <>
      <div id="wrapper">
        {isAuthenticated ? children : (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Session Error</h5>
              <h6 className="card-subtitle mb-2 text-muted">There is no user session!</h6>
              <p className="card-text">Either your account is not valid or your account is yet to be created. Please try refreshing the page to initiate the session. If it does not work, please contact system administrator.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AppSessionNew;