import { FacilityInput } from "@/types/dataTypes";

const facilityInputs: Array<FacilityInput> = [
  {
    id: 0,
    label: "Name",
    name: "hospitalName",
    type: "text",
    cols: 12,
  },
  {
    id: 1,
    label: "Report Name",
    name: "reportName",
    type: "text",
    cols: 12,
  },
  {
    id: 2,
    label: "Address #1",
    name: "addressNo1",
    type: "text",
    cols: 12,
  },
  {
    id: 3,
    label: "Address #2",
    name: "addressNo2",
    type: "text",
    cols: 12,
  },
  {
    id: 4,
    label: "City",
    name: "city",
    type: "text",
    cols: 6,
  },
  {
    id: 5,
    label: "State",
    name: "state",
    type: "select",
    cols: 6,
  },
  {
    id: 6,
    label: "Postal Code",
    name: "stateCod",
    type: "text",
    cols: 6,
  },
  {
    id: 7,
    label: "NPI#",
    name: "npi",
    type: "text",
    cols: 6,
  },
  {
    id: 8,
    label: "ID#",
    name: "id",
    type: "text",
    cols: 6,
  },
  {
    id: 9,
    label: "Other ID",
    name: "otherID", 
    type: "text",
    cols: 6,
  },
];

export default facilityInputs;
