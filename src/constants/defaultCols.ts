import { Column } from "../types";

const defaultCols: Column[] = [
    {
      id: "tierS",
      title: "Tier S",
      color: "yellow",
    },
    {
      id: "tierA",
      title: "Tier A",
      color: "yellow",
    },
    {
      id: "tierB",
      title: "Tier B",
      color: "yellow",
    },
  ];
 export default defaultCols.concat({
  id: "thevoid",
  title: "THE VOID",
  color: "red",
});