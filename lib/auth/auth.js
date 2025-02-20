import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID, // Your Cognito User Pool ID
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID, // Your Cognito App Client ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// ✅ Sign-In Function
export const signIn = (email, password, router) => {
  return new Promise((resolve, reject) => {
    const userData = { Username: email, Pool: userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("Sign-in successful:", result);
        window.location.href = "/hr/dashboard/";

        resolve(result);
      },
      onFailure: (err) => {
        console.error("Sign-in error:", err.message);
        reject(err);
      },
    });
  });
};

// ✅ Sign-Up Function
export const signUp = (email, password, name) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "name",
        Value: name,
      }),
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.error("Sign-up error:", err.message);
        reject(err);
      } else {
        console.log("Sign-up successful:", result.user);
        resolve(result.user);
      }
    });
  });
};

// ✅ Confirm Sign-Up Function
export const confirmSignUp = async (email, code) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error("Confirm sign-up error:", err.message);
        reject(err);
      } else {
        console.log("Confirmation successful", result);
        resolve(result);
        window.location.href = "/";
      }
    });
  });
};
