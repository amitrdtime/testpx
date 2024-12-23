import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomeComponent from "./pages/home";
import Layout from "./components/layout";
import Spinner from "./components/spinner";
import TimeSheetComponent from "./pages/timesheet";
export default function Approute() {
  const LazyClientModule = React.lazy(() => import("./pages/client"));
  const LazyUserModule = React.lazy(() => import("./pages/user"));
  const LazySowModule = React.lazy(() => import("./pages/sow"));
  const LazyProjectInfoModule = React.lazy(() =>
    import("./pages/projectInformation")
  );
  const LazyResourceModule = React.lazy(() =>
    import("./pages/resourceAllocation")
  );
  const LazyTimesheetModule = React.lazy(() => import("./pages/timesheet"));
  const LazyManagersViewModule = React.lazy(() => import("./pages/managersView"));
  const LazyRolePermissionViewModule = React.lazy(() => import("./pages/rolePermission"));
  const LazySettingsModule = React.lazy(() => import("./pages/settings"));


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout>
            <HomeComponent />
          </Layout>
        </>
      ),
    },
    {
      path: "/user",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazyUserModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/customers",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazyClientModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/customers/:id",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazySowModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/customers/:clientId/sows/:sowNo",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazyProjectInfoModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/customers/:customerId/sows/:sowId/projects/:projectId",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazyResourceModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/timesheets",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazyTimesheetModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/managers-view",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazyManagersViewModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/userroles",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazyRolePermissionViewModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
    {
      path: "/settings",
      element: (
        <>
          <Layout>
            <Suspense fallback={<Spinner />}>
              <LazySettingsModule />
            </Suspense>
          </Layout>
        </>
      ),
    },
  ]);

  return (
    <div className="app">
      <main className="content">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}
