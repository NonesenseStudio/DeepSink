import { createDiscreteApi } from "naive-ui";
import { NIcon } from 'naive-ui'

export const { message, notification, dialog, loadingBar, modal } =
  createDiscreteApi([
    "message",
    "dialog",
    "notification",
    "loadingBar",
    "modal",
  ]);

export const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
