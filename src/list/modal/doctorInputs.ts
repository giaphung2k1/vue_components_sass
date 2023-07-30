import { DoctorInput } from "@/types/dataTypes";

const doctorInput: Array<DoctorInput> = [
  {
    id: 0,
    label: "Last Name",
    name: "lastName",
    type: "text",
    cols: 12,
  },
  {
    id: 1,
    label: "First Name",
    name: "firstName",
    type: "text",
    cols: 12,
  },
  {
    id: 2,
    label: "NPI Code",
    name: "npi",
    type: "text",
    cols: 12,
  },
  {
    id: 3,
    label: "License Number",
    name: "licenseNumber",
    type: "text",
    cols: 12,
  },
  {
    id: 4,
    label: "Specialty",
    name: "specialty",
    type: "text",
    cols: 12,
  },
  {
    id: 5,
    label: "Address, City, State",
    name: "addressCityState",
    type: "text",
    cols: 12,
  },
];

export default doctorInput;
