declare module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss";

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare const api: typeof import("../api").default;

declare module "!raw-loader*" {
  const content: string;
  export default content;
}
