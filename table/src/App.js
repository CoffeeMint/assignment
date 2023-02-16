import { Provider } from "react-redux";
import AttendeesTableContainer from "./modules/attendees/containers";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AttendeesTableContainer />
      </div>
    </Provider>
  );
}

export default App;
