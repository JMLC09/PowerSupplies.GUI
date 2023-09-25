import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./context/AuthContext";
import { Toaster } from "sonner";
import Header from "./components/Header/Header";
import config from "./config/config.json";
import routes from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import "primereact/resources/themes/lara-light-blue/theme.css";

//core
import "primereact/resources/primereact.min.css";

function App() {
  document.title = config.appTitle;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className="min-h-screen bg-stone-200">
          <Header />
          <div className="fixed top-[60px] w-full h-full">
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute
                      isProtected={route.isProtected}
                      allowedRoles={route.allowedRoles}
                      element={<route.component />}
                    />
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
        <Toaster richColors position="bottom-center" />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
