
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
              <Main />
          </BrowserRouter>
        </PersistGate>
      </Provider>
      
      
    </div>
  );
}

export default App;
