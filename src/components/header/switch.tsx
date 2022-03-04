import { SwitchTheme } from "@dataesr/react-dsfr";
import { ToolItem } from "@dataesr/react-dsfr";
import { useHeaderStore } from "./store";
import { SwitchProps } from "./type";

export const Switch = (props: SwitchProps): JSX.Element => {
  const [isOpen, onSwitchMode] = useHeaderStore(state => [
    state.isSwitchModeOpen,
    state.onSwitchMode,
  ]);

  return (
    <>
      <ToolItem onClick={onSwitchMode}>
        <span
          className="fr-fi-theme-fill fr-link--icon-left"
          aria-controls="fr-theme-modal"
          data-fr-opened={isOpen}
        >
          {props.label}
        </span>
      </ToolItem>
      <SwitchTheme isOpen={isOpen} setIsOpen={onSwitchMode} />
    </>
  );
};
