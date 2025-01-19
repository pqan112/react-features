import { useState } from "react";

import "./App.css";
import clsx from "clsx";

const PAGE_SIZE = 20;
const RANGE = 2;

function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const renderPagination = () => {
    let dotBefore = false;
    let dotAfter = false;

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;

        return (
          <span
            key={index}
            className="px-3 py-2 mx-2 bg-white rounded shadow-sm"
          >
            ...
          </span>
        );
      }
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;

        return (
          <span
            key={index}
            className="px-3 py-2 mx-2 bg-white rounded shadow-sm"
          >
            ...
          </span>
        );
      }
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        return (
          <button
            key={index}
            className={clsx(
              "mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm",
              {
                "border-cyan-500": pageNumber === page,
                "border-transparent": pageNumber !== page,
              }
            )}
            onClick={() => setPage(index + 1)}
          >
            {pageNumber}
          </button>
        );
      });
  };

  console.log("page", page);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="flex flex-wrap items-center justify-center">
      <select onChange={handleChangePageSize}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>

      {page === 1 ? (
        <button className="px-3 py-2 mx-2 bg-white border rounded shadow-sm cursor-not-allowed opacity-40">
          Prev
        </button>
      ) : (
        <button
          className="px-3 py-2 mx-2 bg-white border rounded shadow-sm cursor-pointer"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <button className="px-3 py-2 mx-2 bg-white border rounded shadow-sm cursor-not-allowed opacity-40">
          Next
        </button>
      ) : (
        <button
          onClick={() => setPage(page + 1)}
          className="px-3 py-2 mx-2 bg-white border rounded shadow-sm cursor-pointer"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default App;
