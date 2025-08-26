import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
// Add your imports here
import Register from "pages/register";
import JobSearch from "pages/job-search";
import Dashboard from "pages/Dashboard";
import ResumeMaker from "pages/ResumeMaker";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Define your routes here */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/job-search" element={<JobSearch />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume-maker" element={<ResumeMaker />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;