export default function appReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "UPDATE_ITEM": {
      const updateItem = action.payload;

      const updateItems = state.items.map((item) => {
        if (item.id === updateItem.id) {
          
          return updateItem;
        }
        return item;
      });
      return {
        ...state,
        items: updateItems,
      };
    }

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((items) => items.id !== action.payload),
      };

      case "ADD_QUANT":
        return {
          ...state,
          quant: action.payload
        };

      case "DEL_QUANT":
        return {
          ...state,
          quant: action.payload
        };

        case "DEL_ALL":
          return {
            
            ...state,
            quant: 0,
            items: [],
          };
          

    default:
      return state;
  }
}