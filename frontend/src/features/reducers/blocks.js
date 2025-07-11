import { generateUniqueId } from "../../helpers";

const initialState = {
  blocks: [],
  block: null,
  totalBlocks: 0,
  selectedBlockIndex: null,
};

const updateBlockItems = ({ blocks }, { blockId, text }) => {
  return blocks.map((block) => {
    if (block.id === blockId) {
      return {
        ...block,
        items: block.items.map((item, index) =>
          index === 0 ? { ...item, text } : item,
        ),
      };
    } else return block;
  });
};

const updateBlockStyles = ({ blocks, selectedBlockIndex }, payload) => {
  return blocks.map((block, index) => {
    if (index === selectedBlockIndex) {
      return {
        ...block,
        styles: payload,
      };
    } else return block;
  });
};

const insertNewBlock = (blocks, index, newBlock) => [
  ...blocks.slice(0, index + 1),
  newBlock,
  ...blocks.slice(index + 1),
];

const deleteBlock = ({ blocks }, { id }) => {
  return blocks.filter((item) => item.id !== id);
};

const moveBlock = (blocks, fromIndex, toIndex) => {
  if (toIndex < 0 || toIndex >= blocks.length) {
    return blocks; // Возвращаем массив без изменений
  }

  const updatedBlocks = [...blocks];
  const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
  updatedBlocks.splice(toIndex, 0, movedBlock);

  return updatedBlocks;
};

const blocks = (state = initialState, action) => {
  switch (action.type) {
    case "COPY_BLOCK":
      return {
        ...state,
        totalBlocks: state.totalBlocks + 1,
        blocks: insertNewBlock(state.blocks, action.payload.blockIndex, {
          id: state.totalBlocks + 1,
          items: action.payload.items,
          styles: action.payload.styles,
        }),
      };
    case "ADD_BLOCK":
      return {
        ...state,
        totalBlocks: state.totalBlocks + 1,
        blocks: insertNewBlock(state.blocks, state.selectedBlockIndex, {
          ...action.payload,
          id: generateUniqueId(),
        }),
      };
    case "UPDATE_BLOCK":
      return {
        ...state,
        blocks: updateBlockItems(state, action.payload),
      };
    case "MOVE_BLOCK_UP":
      return {
        ...state,
        blocks: moveBlock(
          state.blocks,
          action.payload.blockIndex,
          action.payload.blockIndex - 1,
        ),
      };
    case "MOVE_BLOCK_DOWN":
      return {
        ...state,
        blocks: moveBlock(
          state.blocks,
          action.payload.blockIndex,
          action.payload.blockIndex + 1,
        ),
      };
    case "UPDATE_BLOCK_STYLES":
      return {
        ...state,
        blocks: updateBlockStyles(state, action.payload),
      };
    case "DELETE_BLOCK":
      return {
        ...state,
        blocks: deleteBlock(state, action.payload),
        totalBlocks: state.totalBlocks - 1,
      };
    case "SET_BLOCK":
      return {
        ...state,
        selectedBlockIndex: action.payload.blockIndex,
      };
    case "GET_BLOCK":
      return {
        ...state,
        block: state.blocks[state.selectedBlockIndex],
      };
    case "GET_BLOCKS_SUCCESS":
      return {
        ...state,
        blocks: action.payload,
        totalBlocks: action.payload.length,
      };
    case "RESET_BLOCKS":
      return initialState;
    default:
      return state;
  }
};

export default blocks;
