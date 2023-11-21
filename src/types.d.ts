type ResumeDetailsProps = {
  label?: string;
  items: string[];
};

type AccordionProps = {
  label: string;
  items: AccordionItemProps[];
  isExpanded: boolean;
  setExpanded: (param: string | null) => void;
};

type AccordionsGroupProps = {
  title: string;
  content: AccordionProps[];
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
