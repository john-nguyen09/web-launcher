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
  export default any;
}

interface Window {
  SpatialNavigation: any;
}

window.SpatialNavigation = window.SpatialNavigation || {};
