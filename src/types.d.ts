type ResumeDetailsProps = {
  label?: string;
  items: string[];
};

type AccordionProps = {
  label: string;
  children: React.ReactNode;
  view: string;
  isSmall: boolean;
  isExpanded: boolean;
  setExpanded: (param: string | null) => void;
};

type AccordionItemProps = {
  label: string;
  items: AccordionItemProps[] & string[];
};

type AccordionsGroupProps = {
  title: string;
  content: AccordionItemProps[];
};

type ProjectProps = {
  name: string;
  title: string;
  about: string[];
  features: {
    label: string;
    items: string[];
  }[];
  icons: IconDetails[];
  url: ProjectUrls;
};

type TextGroupProps = {
  title: string;
  projectName: string;
  content: string[];
};

type ListGroupProps = {
  title: string;
  projectName: string;
  content: string[];
};

type IconDetails = {
  name: string;
  totalSVG: number;
};

type IconProps = {
  view: string;
  details: IconDetails;
};

type IconsList = {
  view: string;
  icons: IconDetails[];
};

type ProjectUrls = {
  repo: string;
  demo: string;
};

type ProjectLinksProps = {
  projectName: string;
  url: ProjectUrls;
};

type ProjectFeaturesProps = {
  projectName: string;
  title: string;
  content: {
    label: string;
    items: string[];
  }[];
};

type BlockTitleProps = {
  title: string;
  view: string;
  isLarge?: boolean;
};
