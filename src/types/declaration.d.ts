declare module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss";

declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

declare const api: typeof import("../../common/api").default;

declare module "spatial-navigation-js" {
  export type SpatialNavigation = {
    add(config: Configuration): void;
  } & Record<string, any>;

  export type Selector = string | NodeList | Node;

  export interface Configuration {
    selector: Selector;
    straightOnly?: boolean;
    straightOverlapThreshold?: number;
    rememberSource?: boolean;
    disabled?: boolean;
    defaultElement?: string;
    enterTo?: "" | "last-focused" | "default-element";
    leaveFor?: {
      left?: Selector;
      right?: Selector;
      bottom?: Selector;
      top?: Selector;
    } | null;
    restrict?: "self-first" | "self-only" | "none";
    tabIndexIgnoreList?: string; // Default: "a, input, select, textarea, button, iframe, [contentEditable=true]";
    navigableFilter?: (HTMLElement) => void | null;
  }
}

interface Window {
  SpatialNavigation: import("spatial-navigation-js").SpatialNavigation;
}

window.SpatialNavigation = window.SpatialNavigation || {};
