import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import DashboardPage from "./pages/DashboardPage";
import DepositPage from "./pages/DepositPage";
import LoginPage from "./pages/LoginPage";
import PlanPage from "./pages/PlanPage";
import ProfilePage from "./pages/ProfilePage";
import ReferPage from "./pages/ReferPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";
import TransactionPage from "./pages/TransactionPage";
import WithdrawPage from "./pages/WithdrawPage";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      throw redirect({ to: "/dashboard" });
    }
    throw redirect({ to: "/login" });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const taskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/task",
  component: TaskPage,
});

const depositRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deposit",
  component: DepositPage,
});

const withdrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/withdraw",
  component: WithdrawPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const referRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/refer",
  component: ReferPage,
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transaction",
  component: TransactionPage,
});

const planRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plan",
  component: PlanPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  taskRoute,
  depositRoute,
  withdrawRoute,
  profileRoute,
  referRoute,
  transactionRoute,
  planRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
