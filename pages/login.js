import "../configureAmplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

const Login = () => {
  return (
    <div>
      <h1>Hello from AWS Amplify</h1>
      <AmplifySignOut />
    </div>
  );
};

export default withAuthenticator(Login);
