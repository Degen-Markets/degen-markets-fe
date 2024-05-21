import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
} from "@/app/components/Tabs/Tabs";

const BetsTab = async () => {
  return (
    <Tabs>
      <TabList>
        <Tab index={0} className="bg-indigo-medium">
          Tab 1
        </Tab>
        <Tab index={1} className="bg-purple-medium">
          Tab 2
        </Tab>
        <Tab index={2} className="bg-white text-prussian-dark">
          Tab 3
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0}>Content 1</TabPanel>
        <TabPanel index={1}>Content 2</TabPanel>
        <TabPanel index={2}>Content 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default BetsTab;
