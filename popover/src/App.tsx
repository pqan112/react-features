import {
  arrow,
  autoUpdate,
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useRef, useState } from "react";

import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end",
    middleware: [offset(5), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const hover = useHover(context, {
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "dialog",
  });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
    hover,
  ]);

  return (
    <>
      <div className="card">
        <button
          className="min-w-56"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          Hover me
          <FloatingPortal id="hover-btn-id">
            {isOpen && (
              // <motion.div
              //   ref={refs.setFloating}
              //   style={{
              //     ...floatingStyles,
              //     position: strategy,
              //     top: y ?? 0,
              //     left: x ?? 0,
              //     width: "max-content",
              //     transformOrigin: `${middlewareData.arrow?.x}px top`,
              //   }}
              //   initial={{ opacity: 0, transform: "scale(0)" }}
              //   animate={{ opacity: 1, transform: "scale(1)" }}
              //   exit={{ opacity: 0, transform: "scale(0)" }}
              //   transition={{ duration: 0.2 }}
              //   className="max-w-max bg-white relative"
              // >
              <FloatingFocusManager context={context} modal={false}>
                <div
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                  className="max-w-max bg-white relative"
                >
                  {/* <span
                ref={arrowRef}
                className="absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white"
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                }}
              /> */}
                  <FloatingArrow
                    ref={arrowRef}
                    context={context}
                    height={10}
                    width={16}
                    tipRadius={2}
                    fill="white"
                  />
                  <div className="test-contain p-6">
                    <p>
                      test title test title test title test title test title
                      test title test title test title test title
                    </p>
                    <p>test content</p>
                  </div>
                </div>
              </FloatingFocusManager>
            )}
          </FloatingPortal>
        </button>
      </div>
    </>
  );
}

export default App;
