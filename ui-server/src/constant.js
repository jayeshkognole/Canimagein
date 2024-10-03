export const BASE_URL = `${window.location.origin}`;
export const TITLE = [
  {
    title: "EHR Console",
    description: [
      "Explorative analysis of WSI using Gemini",
      "Interactively exploring and analyzing specific selected chunks.",
    ],
    url: "EHR",
  },
  {
    title: "Radiology Colsole",
    description: [
      "Generating editable report out of the interactive response and analysis.",
      "Description 2 for Report Generation",
      "Description 3 for Report Generation",
    ],
    url: "Radiology",
  },
];

export const SIMILAR = [
  {
    patient_id: "test_1",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    report:
      "Entity 1 iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC AYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXD IBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
  },
  {
    patient_id: "test_1",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    report:
      "Entity 2 iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFC AYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIB KE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
  },
  {
    patient_id: "test_1",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    report:
      "Entity 2 iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAY AAACNbyblAAAAHElEQVQI12P4//8/w38GIA XDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
  },
  {
    patient_id: "test_1",
    image:
      "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    report:
      "Entity 2 iVBORw0KGgoAAAANSUhEUgAAAAUAAAAF CAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0 DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg== iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
  },
];

export const history = [
  "Button 1",
  "Button 2",
  "Button 3",
  "Button 4",
  "Button 5",
];

export const data = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", age: 25 },
  { id: 3, name: "Peter Jones", email: "peter.jones@example.com", age: 40 },
  { id: 3, name: "Peter Jones", email: "peter.jones@example.com", age: 40 },
  { id: 3, name: "Peter Jones", email: "peter.jones@example.com", age: 40 },
  { id: 3, name: "Peter Jones", email: "peter.jones@example.com", age: 40 },
];

export const columns = ["id", "name", "age", "id", "name", "email", "age"];

export const data1 = [
  {
    table: "Summary",
    columns: ["id", "name", "age", "id", "name", "email", "age"],
    rows: [
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", age: 25 },
    ],
    summary:
      "dfopl[;dfhyuj[;rtgyijkopl [ertuyopl[ertyhu jikopl[ertgyo plrtyuhjiokplftr yuokpertyhjiople rtguykopertfyhuji okdrtyuioert yhujo dfopl[;dfhyuj[;rtgyijkopl [ertuyopl[ertyhu jikopl[ertgyo plrtyuhjiokplftr yuokpertyhjiople rtguykopertfyhuji okdrtyuioert yhujo dfopl[;dfhyuj[;rtgyijkopl [ertuyopl[ertyhu jikopl[ertgyo plrtyuhjiokplftr yuokpertyhjiople rtguykopertfyhuji okdrtyuioert yhujo",
  },
  {
    table: "Medical Information",
    columns: ["id", "name", "age", "id", "name", "email", "age"],
    rows: [
      { id: 1, name: "John Doe", email: "john.doe@example.com", age: 30 },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", age: 25 },
    ],
    summary:
      "dfopl[;dfhyuj[;rtgyijkopl [ertuyopl[ertyhu jikopl[ertgyo plrtyuhjiokplftr yuokpertyhjiople rtguykopertfyhuji okdrtyuioert yhujo dfopl[;dfhyuj[;rtgyijkopl [ertuyopl[ertyhu jikopl[ertgyo plrtyuhjiokplftr yuokpertyhjiople rtguykopertfyhuji okdrtyuioert yhujo dfopl[;dfhyuj[;rtgyijkopl [ertuyopl[ertyhu jikopl[ertgyo plrtyuhjiokplftr yuokpertyhjiople rtguykopertfyhuji okdrtyuioert yhujo",
  },
];

export const services = [
  { screen: "EHR", services: "Cloud run , Cloud SQL , Vertex AI" },
  { screen: "Radiology", services: "Cloud run , Cloud SQL " },
  { screen: "Landing", services: "Cloud run , Cloud SQL " },
];
