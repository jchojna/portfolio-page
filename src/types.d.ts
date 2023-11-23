type ResumeDetailsProps = {
  label?: string;
  items: string[];
};

type AccordionProps = {
  label: string;
  children: React.ReactNode;
  isExpanded: boolean;
  setExpanded: (param: string | null) => void;
};

type AccordionItemProps = {
  label: string;
  items: string[] | ResumeDetailsProps[];
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
