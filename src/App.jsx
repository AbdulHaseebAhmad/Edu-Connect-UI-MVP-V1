import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./Routes/Routes";
import {store,persistor} from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
