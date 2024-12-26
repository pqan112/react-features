import { cn } from "../lib/utils";
import { useNodeStore } from "../stores/flow-store";
import { useSidebarStore } from "../stores/sidebar-store";

function RightSidebar() {
  const { isOpen, setIsOpen } = useSidebarStore();
  const { nodeLabel, setNodeLabel, setNodeBgColor } = useNodeStore();

  const handleToggle = () => {
    setIsOpen();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNodeLabel(e.target.value);
  };

  const handleChangeColor =(bgColor: string) => {
    setNodeBgColor(bgColor)
  }

  return (
    <div className="relative">
      <div
        className={cn({
          "fixed top-0 left-0 right-0 bottom-0 bg-transparent z-[1000]": isOpen,
        })}
        onClick={handleToggle}
      />
      <div
        className={cn(
          "border-r-black border fixed top-0 right-0 h-full w-[350px] bg-white z-[1001] translate-x-[350px] p-2",
          {
            "translate-x-0": isOpen,
          }
        )}
      >
        <input
          value={nodeLabel}
          onChange={handleChange}
          className="border border-gray-500 border-solid"
        />

        <div className="flex items-center gap-2 mt-3">
          <button className="bg-red-500 text-white min-w-[50px] h-[50px]" onClick={() => handleChangeColor('bg-red-500')}>red</button>
          <button className="bg-blue-500 text-white min-w-[50px] h-[50px]"  onClick={() => handleChangeColor('bg-blue-500')}>blue</button>


        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
