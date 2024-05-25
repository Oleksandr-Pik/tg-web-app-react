import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Route, Router, Routes } from "react-router-dom";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      {/* <button onClick={onToggleButton}>toggle</button> */}
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
