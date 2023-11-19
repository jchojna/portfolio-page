type ItemPropertiesProps = {
  items: string[];
};

type AccordionItemProps = {
  accordionLabel?: string;
  itemLabel?: string;
  items: string[];
};

type AccordionProps = {
  accordionLabel: string;
  items: AccordionItemProps[];
  isExpanded: boolean;
  setExpanded: (param: string | null) => void;
};

type NestedAccordionProps = {
  content: AccordionProps[];
};
