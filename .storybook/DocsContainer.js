import React, { useEffect } from "react";
import { DocsContainer as BaseContainer } from "@storybook/addon-docs";
import { useDarkMode } from "storybook-dark-mode";
import { darkTheme, lightTheme } from "./customTheme";
import "@codegouvfr/react-dsfr/dsfr/dsfr.css";
// Module parse failed: Maximum call stack size exceeded : File was processed with these loaders:
//import "@codegouvfr/react-dsfr/dsfr/utility/icons/icons.min.css";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { useColors } from "@codegouvfr/react-dsfr/useColors";

startReactDsfr({
  defaultColorScheme: "system",
  langIfNoProvider: "fr",
});

export const DocsContainer = ({ children, context }) => {
  const isStorybookUiDark = useDarkMode();
  const { setIsDark } = useIsDark();

  useEffect(() => {
    setIsDark(isStorybookUiDark);
  }, [isStorybookUiDark]);

  const backgroundColor = useColors().decisions.background.default.grey.default;

  return (
    <>
      <style>{`
                body {
                    padding: 0 !important,
                    background-color: ${backgroundColor};
                }

                .docs-story {
                    background-color: ${backgroundColor};
                }
                [id^=story--] .container {
                    border: 1px dashed #e8e8e8;
                }

                .docblock-argstable-head th:nth-child(3), .docblock-argstable-body tr > td:nth-child(3) {
                    visibility: collapse;
                }

            `}</style>
      <BaseContainer
        context={{
          ...context,
          storyById: (id) => {
            const storyContext = context.storyById(id);
            return {
              ...storyContext,
              parameters: {
                ...storyContext?.parameters,
                docs: {
                  ...storyContext?.parameters?.docs,
                  theme: isStorybookUiDark ? darkTheme : lightTheme,
                },
              },
            };
          },
        }}
      >
        {children}
      </BaseContainer>
    </>
  );
};
