import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function MyTabs({
  headers,
  components,
}: {
  headers: string[];
  components: JSX.Element[];
}) {
  return (
    <>
      <Tabs>
        <TabList className="flex p-1  border-b-primary ">
          {headers.map((item, index) => (
            <Tab
              key={index}
              className="px-4 py-2 cursor-pointer"
              selectedClassName="tab-active text-primary border-transparent"
            >
              {item}
            </Tab>
          ))}
        </TabList>

        {components.map((item, index) => (
          <TabPanel key={index}>{item}</TabPanel>
        ))}
      </Tabs>
    </>
  );
}
