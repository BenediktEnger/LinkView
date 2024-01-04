import CardContainer from "./components/CardContainer/cardsContainer";
import "./App.css";
import Header from "./components/Header/header";
import { UpdateProvider } from "./UpdateContext";
import { EditProvider } from "./EditContext";

function App() {
  return (
    <EditProvider>
      <UpdateProvider>
        <Header />
        <CardContainer />
      </UpdateProvider>
    </EditProvider>
  );
}

export default App;
