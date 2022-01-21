import { createContext,  useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = {
  quant: 0,
  items: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item  },
    });

  }

  function updateItem(updatedItem) {

    dispatch({
      type: "UPDATE_ITEM",
      payload: updatedItem,
    });

  }

  function deleteItems(id) {

    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });

  }

  function delAll() {
    dispatch({
      type: "DEL_ALL",
    });

  }

  function addQuant(quant) {
    
    dispatch({
      type: "ADD_QUANT",
      payload: quant + state.quant
    });

  }

  function delQuant(quant) {

    if(state.quant >0 ){

    dispatch({
      type: "ADD_QUANT",
      payload: state.quant - quant 
    });

  }

  }

  return (
    <GlobalContext.Provider
      value={{
        items: state.items,
        quant: state.quant,
        addItem,
        updateItem,
        deleteItems,
        addQuant,
        delQuant,
        delAll
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};