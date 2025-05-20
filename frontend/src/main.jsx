import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  Home,
  // AllListings,
  ShowListing,
  CreateListing,
  PageNotFound,
  getListings,
  ErrorPage,
  EditListing
} from "./pages/index.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} loader={getListings} />
      {/* <Route 
        path="/listings" 
        element={<AllListings />} 
        loader={getListings}
      /> */}
      <Route path="/listings/:id" element={<ShowListing />} />
      <Route path="/new" element={<CreateListing />} />
      <Route path="/listings/:id/edit" element={<EditListing />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/listings/*" element={<PageNotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
