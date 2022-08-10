import * as React from "react";
import { ToastProvider } from "react-toast-notifications";
import { Dashboard } from "./components/organisms/dashboard";
import useConfig from "./state/useConfig";

export default function App() {
  const config = useConfig();
  return (
    <ToastProvider>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to {config.app.TITLE}</h1>
        </header>
        <Dashboard />
      </div>
    </ToastProvider>
  );
}
