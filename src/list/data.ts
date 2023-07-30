import { v4 as uuid } from "uuid";
import {
  OWAItem,
  Facility,
  State,
  HeaderItem,
  Country,
  Doctor,
  Agent,
  AgentColumn,
  FacilityColumn,
  DoctorColumn,
  Race,
  ClassSuffix,
} from "@/types/dataTypes";

const OWALookupData: Array<OWAItem> = [
  {
    id: "1",
    description: "A",
  },
  {
    id: "2",
    description: "AB",
  },
  {
    id: "3",
    description: "ABC",
  },
  {
    id: "4",
    description: "B",
  },
  {
    id: "5",
    description: "C",
  },
  {
    id: "6",
    description: "D",
  },
  {
    id: "7",
    description: "E",
  },
  {
    id: "8",
    description: "F",
  },
  {
    id: "9",
    description: "G",
  },
  {
    id: "10",
    description: "H",
  },
  {
    id: "11",
    description: "I",
  },
  {
    id: "12",
    description: "J",
  },
  {
    id: "13",
    description: "K",
  },
];

const facilities: Array<Facility> = [
  {
    id: uuid(),
    stateCod: "6080010",
    hospitalName: "Kwjalein Missile Range Hospital",
    city: "APO Miami",
    state: "FL",
  },
  {
    id: uuid(),
    stateCod: "6530170",
    hospitalName: "The childrens Hospital of Alabama",
    city: "Birmingham",
    state: "AL",
  },
  {
    id: uuid(),
    stateCod: "6530170",
    hospitalName: "The childrens Hospital of Alabama",
    city: "Birmingham",
    state: "AL",
  },
];

const fakeStateData: Array<State> = [
  {
    id: uuid(),
    value: "AL",
    name: "Alabama",
  },
  {
    id: uuid(),
    value: "AK",
    name: "Alaska",
  },
  {
    id: uuid(),
    value: "AZ",
    name: "Arizona",
  },
  {
    id: uuid(),
    value: "AR",
    name: "Arkansas",
  },
  {
    id: uuid(),
    value: "CA",
    name: "California",
  },
  {
    id: uuid(),
    value: "CO",
    name: "Colorado",
  },
  {
    id: uuid(),
    value: "CT",
    name: "Connecticut",
  },
];

const headers: Array<HeaderItem> = [
  {
    id: uuid(),
    name: "State Cod",
  },
  {
    id: uuid(),
    name: "Hospital Name",
  },
  {
    id: uuid(),
    name: "City",
  },
  {
    id: uuid(),
    name: "State",
  },
];

const countries: Array<Country> = [
  {
    id: uuid(),
    code: "000",
    name: "United States",
  },
  {
    id: uuid(),
    code: "101",
    name: "Puerto Rico",
  },
  {
    id: uuid(),
    code: "102",
    name: "U.S Virgin Islands",
  },
  {
    id: uuid(),
    code: "103",
    name: "Jersey",
  },
  {
    id: uuid(),
    code: "104",
    name: "Serbia",
  },
  {
    id: uuid(),
    code: "105",
    name: "Mali",
  },
  {
    id: uuid(),
    code: "106",
    name: "Congo",
  },
  {
    id: uuid(),
    code: "107",
    name: "Togo",
  },
  {
    id: uuid(),
    code: "108",
    name: "Ethiopia",
  },
  {
    id: uuid(),
    code: "109",
    name: "Oman",
  },
  {
    id: uuid(),
    code: "110",
    name: "Bahrain",
  },
  {
    id: uuid(),
    code: "111",
    name: "Qatar",
  },
  {
    id: uuid(),
    code: "112",
    name: "Kuwait",
  },
];

const doctors:Doctor[] = [
  {
    id: "00000312",
    lastName: "Last",
    firstName: "First",
    npi: "NPI",
    licenseNumber: "123",
    specialty: "Doctor",
    addressCityState: "address, city, state",
  },
  {
    id: "00000313",
    lastName: "Last",
    firstName: "First",
    npi: "NPI",
    licenseNumber: "123",
    specialty: "Doctor",
    addressCityState: "address, city, state",
  },
  {
    id: "00000314",
    lastName: "Last",
    firstName: "First",
    npi: "NPI",
    licenseNumber: "123",
    specialty: "Doctor",
    addressCityState: "address, city, state",
  },
  {
    id: "00000315",
    lastName: "Last",
    firstName: "First",
    npi: "NPI",
    licenseNumber: "123",
    specialty: "Doctor",
    addressCityState: "address, city, state",
  },
  {
    id: "00000316",
    lastName: "Last",
    firstName: "First",
    npi: "NPI",
    licenseNumber: "123",
    specialty: "Doctor",
    addressCityState: "address, city, state",
  },
]

const columnsDoctor: DoctorColumn[] = [
  {
    key: "id",
    class: "id-cell",
    title: "ID#"
  },
  {
    key: "lastName",
    class: "last-name-cell",
    title: "Last Name",
  },
  {
    key: "firstName",
    class: "first-name-cell",
    title: "First Name",
  },
  {
    key: "npi",
    class: "npi-cell",
    title: "NPI Code"
  },
  {
    key: "licenseNumber",
    class: "license-number-cell",
    title: "License Number",
  },
  {
    key: "specialty",
    class: "specialty-cell",
    title: "Specialty",
  },
  {
    key: "addressCityState",
    class: "address-city-state-cell",
    title: "Address, City, State",
  },
]

const displayedColumnsAgent:(keyof Agent)[] = ["code", "description"]

const columnsAgent: AgentColumn[] = [
  {
    key: "code",
    class: "code-cell",
    title: "Code",
  },
  {
    key: "description",
    class: "description-cell",
    title: "Description"
  }
]

const columnsFacility: FacilityColumn[] = [
  {
    key: "stateCod",
    class: "state-cod-cell",
    title: "State Cod"
  },
  {
    key: "hospitalName",
    class: "hospital-name-cell",
    title: "Hospital Name",
  },
  {
    key: "city",
    class: "city-cell",
    title: "City"
  },
  {
    key: "state",
    class: "state-cell",
    title: "State"
  },
]


const races:Race[] = [
  {
    title: "White Please Select",
    value: "1",
    key: "01"
  },
  {
    title: "Black Please Select",
    value: "2",
    key: "02"
  },
]

const classSuffixs: ClassSuffix[] = [
  {
    title: "(m) - Multiple synchronus tumors OR Multifocal tumor (differentiated and anaplastic thyroid only)",
    value: "1",
  },
  {
    title: "(s) - Solitary tumor (differentiated and anaplastic thyroid only)",
    value: "2",
  },
]

export { OWALookupData, facilities, fakeStateData, headers, countries, doctors, columnsDoctor, columnsAgent, displayedColumnsAgent, columnsFacility, races, classSuffixs };
