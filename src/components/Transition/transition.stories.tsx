import React, { useRef, useState } from "react";
import Transition from "./Transition";
import { Meta, StoryFn } from "@storybook/react";
import Button from "../Button/Button";

const TransitionMeta: Meta<typeof Transition> = {
  title: "Transition",
  component: Transition,
};

export default TransitionMeta;

const SampleElement: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const nodeRef = useRef(null);

  return (
    <>
      <Button onClick={() => setShow(!show)}>Transition</Button>
      <Transition
        nodeRef={nodeRef}
        in={show}
        timeout={300}
        animation="ete-in-top"
      >
        <div ref={nodeRef}>我是变化的内容</div>
      </Transition>
    </>
  );
};

let flag: boolean = false;
export const sample: StoryFn<typeof Transition> = () => (
  <SampleElement></SampleElement>
);
