import React, { useEffect } from "react";
import { Input, Menu } from "semantic-ui-react";
// const sourceTree = require( "react-treeview-semantic" );
import SourceTree from "react-treeview-semantic";
import menuEle from "../menuData";

function MenuBar() {
  const [Search, setSearch] = React.useState("");

  const [Results, setResults] = React.useState(menuEle);

  function copy(o){
return Object.assign({},o)
  }
  useEffect(() => {
    
    // eslint-disable-next-line array-callback-return
    let x= menuEle.map(copy).filter(function res(item: any) {
      if (item.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase())) {
        return true;
      } 
       if (item.children) {
        // we are returning children.length as it will be either 0 or not zero
        return (item.children = item.children.map(copy).filter((data: any) => res(data)))
          .length;
      }
    });
    setResults(x);
    
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
          setActiveItem={console.log()}
          baseIcon={null}
          baseColor={"blue"}
          checkable={true}
          singleChecked={false}
          treeData={Results}
          getChecked={console.log()}
        />
      </div>
    </div>
  );
}

export default MenuBar;
