type Flags = {
  isIntroMode: boolean;
  isMenuTransforming: boolean;
  shouldSectionsBeUpdated: boolean;
  isScrollEnabled: boolean;
  isFastScroll: boolean;
  isMobileHeader: boolean;
  media: string | null;
  menuLayout: string | null;
};

type Item = {
  index: number;
  node: HTMLElement;
  offset: number;
  height: number;
  currentSectionIndex: number;
  width: number;
};

type Media = {
  sm: number;
  md: number;
  lg: number;
};

type Section = {
  index: number;
  id: string;
  node: HTMLElement;
  offset: number;
};

type TimeoutId = string | number | NodeJS.Timeout | undefined;

type AlertButton = HTMLElement & { index: number; alertTimeoutId: NodeTimeout };

type Alert = {
  box: HTMLElement;
  button: AlertButton;
};

type ReadMoreButton = HTMLElement & { index: number; innerHTML: string };
