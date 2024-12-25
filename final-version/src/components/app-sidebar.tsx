import { useContext } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "./ui/sidebar";
import { DnDContext } from "../providers/dnd-provider";

function AppSidebar() {
  const { setType } = useContext(DnDContext);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Sidebar>
      <SidebarHeader>Logo</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Components
          </SidebarGroupLabel>
          <div className="flex flex-col gap-2">
            <SidebarGroupContent>
              <div
                className="px-3 py-2 font-medium border border-gray-500 rounded-md dndnode input"
                onDragStart={(event) => onDragStart(event, "input")}
                draggable
              >
                Input Node
              </div>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <div
                className="px-3 py-2 font-medium border border-gray-500 rounded-md dndnode"
                onDragStart={(event) => onDragStart(event, "default")}
                draggable
              >
                Default Node
              </div>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <div
                className="px-3 py-2 font-medium border border-gray-500 rounded-md dndnode output"
                onDragStart={(event) => onDragStart(event, "output")}
                draggable
              >
                Output Node
              </div>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
