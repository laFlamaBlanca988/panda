import { Flex } from "../styled-system/jsx";
import { FormBuilderView } from "./components/preview/FormBuilderView";
import { LivePreviewView } from "./components/preview/LivePreviewView";

function App() {
  return (
    <Flex
      css={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "2rem",
      }}
    >
      <Flex css={{ width: "50%", justifyContent: "center" }}>
        <FormBuilderView />
      </Flex>
      <Flex css={{ width: "50%", justifyContent: "center" }}>
        <LivePreviewView />
      </Flex>
    </Flex>
  );
}

export default App;
