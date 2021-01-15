import React, { useEffect } from "react";
import { Input, Menu } from "semantic-ui-react";
// const sourceTree = require( "react-treeview-semantic" );
import SourceTree from "react-treeview-semantic";
import menuEle from "../menuData";

function MenuBar() {
  const [Search, setSearch] = React.useState("");
  const z = menuEle.map(function (item) {
    // const reqArry = [];
    const obj = {
      name: "",
      children: [{}],
    };
    const x = item.name
      .toLocaleLowerCase()
      .includes(Search.toLocaleLowerCase());
    if (x) {
      obj.name = item.name;
    }
    obj.children = item.children.filter((child: { name: string }) =>
      child.name.toLowerCase().includes(Search.toLowerCase())
    );
    // reqArry.push(obj);
    if (obj.children.length > 0) {
      if (obj.name === null) {
        obj.name = item.name;
      }
    }
    return obj;
  });

  const [Results, setResults] = React.useState(z);

  useEffect(() => {
    setResults(
      menuEle.map(function (item) {
        // const reqArry = [];
        const obj = {
          name: "",
          children: [{}],
        };
        const x = item.name
          .toLocaleLowerCase()
          .includes(Search.toLocaleLowerCase());
        if (x) {
          obj.name = item.name;
        }
        obj.children = item.children.filter((child: { name: string }) =>
          child.name.toLowerCase().includes(Search.toLowerCase())
        );
        // reqArry.push(obj);
        if (obj.children.length > 0) {
          if (obj.name === "") {
            obj.name = item.name;
          }
        }
        return obj;
      })
    );
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
        <Menu.Item>
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
              baseColor={null}
              checkable={true}
              singleChecked={true}
              treeData={Results}
              getChecked={console.log}
            />
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default MenuBar;
