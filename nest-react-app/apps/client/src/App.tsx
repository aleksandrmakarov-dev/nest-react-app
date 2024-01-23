import { AuthProvider, QueryProvider, Router } from "./context";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
