import type { Preview } from "@storybook/react";
import "../src/styles/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Welcome",
          "Button",
          "Icon",
          "Alert",
          "Input",
          "AutoComplete",
          "Select",
          "Form",
          "Menu",
          "Tab",
          "Progress",
          "Transition",
          "Upload",
        ],
      },
    },
  },
};

export default preview;
