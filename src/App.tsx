// src/App.tsx
import { Flex, VStack } from "../styled-system/jsx";
import { FormBuilderView } from "./components/preview/FormBuilderView";
import { LivePreviewView } from "./components/preview/LivePreviewView";
import { Header } from "./components/shared/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <VStack width="100%" height="100vh" gap="0">
      <Header />
      <Flex
        css={{
          width: "100%",
          flexGrow: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        <Flex css={{ width: "50%", justifyContent: "center" }}>
          <FormBuilderView />
        </Flex>
        <Flex css={{ width: "50%", justifyContent: "center" }}>
          <LivePreviewView />
        </Flex>
      </Flex>
      <ToastContainer position="bottom-right" />
    </VStack>
  );
}

export default App;
