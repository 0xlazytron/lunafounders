import { lazy, Suspense, useEffect, useMemo } from "react";
import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { connect, useDispatch } from "react-redux";
import { PrivyProvider } from "@privy-io/react-auth";
import { AuthProvider } from "./context/AuthContext";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import MainLayout from "./jsx";

import { checkAutoLogin } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";

import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FAQPage = lazy(() => import("./jsx/pages/FAQPage"));
const LunaAGB = lazy(() => import("./jsx/pages/AGBPage"));
const SignUp = lazy(() => import("./jsx/pages/Registration"));

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});
const Landing = lazy(() => import("./jsx/pages/Landing"));

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ReferralsPage = lazy(() => import("./pages/ReferralsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ReferralRulesPage = lazy(() => import("./pages/ReferralRulesPage"));
const BadgesPage = lazy(() => import("./pages/BadgesPage"));
const TicketsPage = lazy(() => import("./pages/TicketsPage"));
const AdminOverviewPage = lazy(() => import("./pages/AdminOverviewPage"));
const AdminRewardsPage = lazy(() => import("./pages/AdminRewardsPage"));

function AppContent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  useEffect(() => {
    const publicPaths = [
      "/",
      "/landing",
      "/login",
      "/page-register",
      "/page-forgot-password",
      "/faq",
      "/agb",
    ];
    if (!publicPaths.includes(location.pathname)) {
      checkAutoLogin(dispatch, navigate);
    }
  }, [dispatch, navigate, location]);
  if (isAuthenticated) {
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/my-ref-profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/referral-rules" element={<ReferralRulesPage />} />
          <Route path="/badges" element={<BadgesPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/admin-overview" element={<AdminOverviewPage />} />
          <Route path="/admin-rewards" element={<AdminRewardsPage />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/page-register" element={<SignUp />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/agb" element={<LunaAGB />} />
        {/* <Route path="/page-lock-screen" element={<LockScreen />} />
        <Route path="/page-error-400" element={<Error400 />} />
        <Route path="/page-error-403" element={<Error403 />} />
        <Route path="/page-error-404" element={<Error404 />} />
        <Route path="/page-error-500" element={<Error500 />} />
        <Route path="/page-error-503" element={<Error503 />} /> */}
        {/* <Route path="/page-forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

const ConnectedAppContent = connect(mapStateToProps)(AppContent);

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <PrivyProvider
            appId="cm9bs2m2k01j5la0n69v2cake"
            config={{
              loginMethods: ["email", "wallet"],
              appearance: {
                theme: "light",
                accentColor: "#000000",
              },
            }}
          >
            <AuthProvider>
              <UserProvider>
                <Suspense
                  fallback={
                    <div id="preloader">
                      <div className="sk-three-bounce">
                        <div className="sk-child sk-bounce1"></div>
                        <div className="sk-child sk-bounce2"></div>
                        <div className="sk-child sk-bounce3"></div>
                      </div>
                    </div>
                  }
                >
                  <ConnectedAppContent />
                </Suspense>
              </UserProvider>
            </AuthProvider>
          </PrivyProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
