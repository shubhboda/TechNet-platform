import React from "react";
import { Routes as RouterRoutes, Route, BrowserRouter } from "react-router-dom";
// Add your imports here
import Register from "pages/register";
import JobSearch from "pages/job-search";
import Network from "pages/network";
import Profile from "pages/profile";
import Companies from "pages/companies";
import NotFound from "pages/NotFound";
import ResumeMaker from "pages/ResumeMaker";

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<JobSearch />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/network" element={<Network />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/resume-maker" element={<ResumeMaker />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;