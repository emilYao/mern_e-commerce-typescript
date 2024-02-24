import { Link } from "react-router-dom";

const navs = [
  {
    name: "Add Product",
    url: "add-product",
  },
  {
    name: "Orders",
    url: "orders",
  },
  {
    name: "Customers",
    url: "cusotmers",
  },
  {
    name: "Sales and Analytics",
    url: "sales-analytics",
  },
  {
    name: "Inventory",
    url: "inventory",
  },
  {
    name: "settings",
    url: "settings",
  },
  {
    name: "Logout",
    url: "logout",
  },
];
export default function SideBar() {
  return (
    <>
        <div className="font-bold text-3xl text-center">MAKA </div>
      {navs.map((value, key) => {
        return (
          <Link to={value.url} key={key}>
            {value.name}
          </Link>
        );
      })}
    </>
  );
}
