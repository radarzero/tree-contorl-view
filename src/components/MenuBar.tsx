import React, { useEffect } from "react";
import { Input, Menu } from "semantic-ui-react";
// const sourceTree = require( "react-treeview-semantic" );
import SourceTree from "react-treeview-semantic";
import menuEle from "../menuData";

function MenuBar() {
  const [Search, setSearch] = React.useState("");

  const [Results, setResults] = React.useState([
    { name: "home", children: [{}] },
  ]);

  useEffect(() => {
    let rslt = menuEle[0].children.map(function (item) {
      const obj = {
        name: "",
        children: [{}],
      };
      if (item.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase())) {
        obj.name = item.name;
      }
      obj.children = item.children.filter((child: { name: string }) =>
        child.name.toLowerCase().includes(Search.toLowerCase())
      );

      if (obj.children.length > 0) {
        if (obj.name === "") {
          obj.name = item.name;
        }
      }
      if (item.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase())) {
        obj.children = item.children;
      }

      return obj;
    });
    setResults([
      { name: "Home", children: rslt.filter((item) => item.name !== "") },
    ]);
  }, [Search]);

  return (
    <div>
      <Menu vertical dark>
        <Menu.Item>
          <Input
            placeholder="Search..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </Menu.Item>
        <Menu.Item></Menu.Item>
      </Menu>
      <div
        style={{
          borderTop: "solid 1px grey",
          marginTop: "1rem",
          paddingTop: "1rem",
        }}
      >
        <SourceTree
          setActiveItem={console.log}
          baseIcon={null}
          baseColor={"blue"}
          checkable={true}
          singleChecked={true}
          treeData={Results}
          getChecked={console.log}
        />
      </div>
    </div>
  );
}

export default MenuBar;
