import Menu from "./containers/Menu/menu.jsx";
import BlankBlock from "./containers/BlankBlock/blank.block.jsx";
import { useSelector } from "react-redux";

function App() {
  const block = useSelector((state) => state.block);

  return (
    <>
      <Menu />
      {block.data.length > 0 ? (
        block.data.map(({ id, items }, index) => (
          <BlankBlock key={id} blockIndex={index} items={items} />
        ))
      ) : (
        <BlankBlock blockIndex={0} />
      )}
    </>
  );
}

export default App;
