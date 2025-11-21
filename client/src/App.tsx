import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Referral from "@/pages/Referral";
import Docs from "@/pages/Docs";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import BeginersGuide from "@/pages/BeginersGuide";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/referral" component={Referral} />
      <Route path="/docs" component={Docs} />
      <Route path="/beginners-guide" component={BeginersGuide} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
