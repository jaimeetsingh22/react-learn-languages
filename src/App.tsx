import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./components/Home")); // lazy :- A function that returns a Promise or another thenable (a Promise-like object with a then method). React will not call load until the first time you attempt to render the returned component. After React first calls load, it will wait for it to resolve, and then render the resolved value’s .default as a React component. Both the returned Promise and the Promise’s resolved value will be cached, so React will not call load more than once. If the Promise rejects, React will throw the rejection reason for the nearest Error Boundary to handle.
// Lets you defer loading a component’s code until it is rendered for the first time.
// iss falback loader ya lazy loader jo kaho isko use karne ke jis v component ko render karna hai to iss syntax ki madad se karna hoga

const Learning = lazy(() => import("./components/Learning"));
const Loader = lazy(() => import("./components/Loader"));
const Quize = lazy(() => import("./components/Quize"));
const Result = lazy(() => import("./components/Result"));

const App = () => {
  return (
    <Router>
      <Header />
      {/*Suspense Lets you display a fallback until its children have finished loading. matlab ki jab v heavy page load hone me time lega to ye fallback wala component show karega */}
      <Suspense  fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learning />} />
        <Route path="/quize" element={<Quize />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
