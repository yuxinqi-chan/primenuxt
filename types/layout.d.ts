export type MenuItem = {
  label: string;
  icon?: string;
  visible?: boolean;
  disabled?: boolean;
  command?: (arg: { originalEvent: Event; item: MenuItem }) => void;
  to?: string;
  url?: string;
  target?: string;
  class?: string;
  separator?: boolean;
  items?: MenuItem[];
};
export type ThemeColor = {
  name: string;
  palette: {
    [key: number]: string;
  };
};
