import * as React from "react";
import {createMindmap} from "../midmap";

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Table({spaces, title, description,}: {
  spaces: { name: string, key: string, id: number }[],
  title: string,
  description: string
}) {

  const handleMindMapCreation = async (spacesId: number, spaceName: string) => {
    console.log(spacesId);
    fetch(`api/confluence/fetchSpacePages?id=${spacesId}`, {credentials: "include"})
        .then((response) => response.json())
        .then(async (result) => {
          const pageTrees = result.pages.results;
          await createMindmap(spaceName, pageTrees);
        });

  }


  return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-700">
              {description}
            </p>
          </div>
        </div>
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" className="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                ID
              </th>
              <th
                  scope="col"
                  className=" hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                KEY
              </th>
              <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                NAME
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Mind Map</span>
              </th>
            </tr>
            </thead>
            <tbody>
            {spaces.map((space, spcIdx) => (
                <tr key={space?.key}>
                  <td
                      className={classNames(
                          spcIdx === 0 ? '' : 'border-t border-transparent',
                          'hidden relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                      )}
                  >
                    <div className="font-medium text-gray-900">
                      {space.id}
                    </div>
                    {spcIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200"/> : null}
                  </td>
                  <td
                      className={classNames(
                          spcIdx === 0 ? '' : 'border-t border-gray-200',
                          'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                      )}
                  >
                    {space.key}
                  </td>
                  <td
                      className={classNames(
                          spcIdx === 0 ? '' : 'border-t border-gray-200',
                          'px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                      )}
                  >
                    {space.name}
                  </td>
                  <td
                      className={classNames(
                          spcIdx === 0 ? '' : 'border-t border-transparent',
                          'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                      )}
                  >
                    <button
                        type="button"
                        onClick={() => handleMindMapCreation(space.id, space.name)}
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Create Mind Map <span className="sr-only">, {space.name}</span>
                    </button>
                    {spcIdx !== 0 ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200"/> : null}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}
