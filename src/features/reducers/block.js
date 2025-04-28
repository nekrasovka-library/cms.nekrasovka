const initialState = {
  data: [],
  total: 0,
  selectedBlockIndex: null,
};

// Обновление элементов блока
const updateBlockItems = ({ data }, { elementIndex, blockIndex, text }) => {
  return data.map((block, index) => {
    if (index === blockIndex) {
      return {
        ...block,
        items: block.items.map((item, index) =>
          index === elementIndex ? { ...item, text } : item,
        ),
      };
    } else return block;
  });
};

const insertNewBlock = (blocks, index, newBlock) => [
  ...blocks.slice(0, index + 1),
  newBlock,
  ...blocks.slice(index + 1),
];

// Удаление блока
const deleteBlock = ({ data }, { blockIndex }) => {
  return data.filter((_, index) => index !== blockIndex);
};

// Основной редьюсер
const block = (state = initialState, action) => {
  switch (action.type) {
    case "COPY_BLOCK":
      return {
        ...state,
        total: state.total + 1,
        data: insertNewBlock(state.data, action.payload.blockIndex, {
          id: state.total + 1,
          items: action.payload.items,
        }),
      };
    case "ADD_BLOCK":
      return {
        ...state,
        total: state.total + 1,
        data: insertNewBlock(state.data, state.selectedBlockIndex, {
          id: state.total + 1,
          items: action.payload.items,
        }),
      };
    case "UPDATE_BLOCK":
      return {
        ...state,
        data: updateBlockItems(state, action.payload),
      };
    case "DELETE_BLOCK":
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
