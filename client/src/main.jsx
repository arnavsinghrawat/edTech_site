import { createRoot } from "react-dom/client";
import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import {ClerkProvider} from '@clerk/clerk-react';

//import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl={'/'}>
      <AppContextProvider>
        <App/>
      </AppContextProvider>
    </ClerkProvider>  
  </BrowserRouter>
)