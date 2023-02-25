declare module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss";

declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

declare const api: typeof import("../../common/api").default;
