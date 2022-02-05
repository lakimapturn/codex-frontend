import Dashboard from "views/Dashboard.js";
import Community from "views/Community.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import UserPage from "views/UserPage.js";

import { FaBone, FaDog } from "react-icons/fa";
import { RiQuestionAnswerLine, RiDashboardLine } from "react-icons/ri";
import { IoMapSharp } from "react-icons/io5";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: <RiDashboardLine size={30} />,
    component: Dashboard,
    layout: "",
  },
  {
    path: "/recommended-food",
    name: `Foods For Your Dog 💗`,
    icon: <FaBone size={30} />,
    component: TableList,
    layout: "",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: <IoMapSharp size={30} />,
    component: Maps,
    layout: "",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   // icon: "design_image",
  //   component: Icons,
  //   layout: "",
  // },
  {
    path: "/questions",
    name: "Questions",
    icon: <RiQuestionAnswerLine size={30} />,
    component: Community,
    layout: "",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: Typography,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
