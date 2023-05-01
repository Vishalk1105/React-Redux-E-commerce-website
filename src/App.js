import "./App.css";
import { Header } from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Cards from "./components/Cards";
import CardsDetails from "./components/CardsDetails";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardsDetails />} />
      </Routes>
    </Fragment>
  );
}

export default App;
