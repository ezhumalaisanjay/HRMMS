import { withAuthenticator, createTheme } from "@aws-amplify/ui-react";


const customTheme = createTheme({
  name: "my-custom-theme",
  tokens: {
    colors: {
      brand: {
        primary: "#ff5733",
        secondary: "#4CAF50",
      },
      background: {
        primary: "#f5f5f5",
      },

    }
  }
})

function App() {
  return (
      <div className="App">
        <h1>Welcome to My App!</h1>
      </div>
  );
}

export default withAuthenticator(App);