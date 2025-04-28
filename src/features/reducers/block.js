const initialState = {
  data: [],
  total: 0,
  selectedBlockIndex: null,
};

// Обновление элементов блока
const updateBlockItems = ({ data }, { elementIndex, ...payload }) => {
  return data.map((block) => ({
    ...block,
    items: block.items.map((item, index) =>
      index === elementIndex ? { ...item, ...payload } : item,
    ),
  }));
};

// Удаление блока
const deleteBlock = ({ data }, { blockIndex }) => {
  return data.filter((_, index) => index !== blockIndex);
};

// Создание нового блока
const createBlock = (id, payload) => ({ id, ...payload });

// Добавление блока
const addBlock = (state, payload) => {
  const { data, total, selectedBlockIndex } = state;
  const newBlock = createBlock(total + 1, payload);

  return total > 0
    ? [
        ...data.slice(0, selectedBlockIndex + 1),
        newBlock,
        ...data.slice(selectedBlockIndex + 1),
      ]
    : [newBlock];
};

// Основной редьюсер
const block = (state = initialState, action) => {
  switch (action.type) {
    case "UPD_BLOCK":
      return {
        ...state,
        data: updateBlockItems(state, action.payload),
      };
    case "ADD_BLOCK":
      return {
        ...state,
        data: addBlock(state, action.payload),
        total: state.total + 1,
      };
    case "DEL_BLOCK":
      return {
        ...state,
        data: deleteBlock(state, action.payload),
        total: state.total - 1,
      };
    case "SET_BLOCK":
      return {
        ...state,
        selectedBlockIndex: action.payload.blockIndex,
      };
    case "RESET_BLOCKS":
      return initialState;
    default:
      return state;
  }
};

export default block;
