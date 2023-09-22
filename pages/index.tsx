import { useState, useEffect } from "react";
import Table from "../src/components/Table";


// async function addSticky() {
//   const stickyNote = await miro.board.createStickyNote({
//     content: 'Hello, World!',
//   });
//
//   await miro.board.viewport.zoomTo(stickyNote);
// }

export default function Main() {
  const [authenticated, setAuthenticated] = useState(false);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('panel')) return;
    window.miro.board.ui.on('icon:click', async () => {
      window.miro.board.ui.openPanel({
        url: `/?panel=1`,
      });
    });
  }, []);

  // On Page Load
  useEffect(() => {
    fetch("api/authenticate")
        .then((response) => response.json())
        .then((result) => {
          console.log('authenticate-result', JSON.stringify(result, null, 2));
          setAuthenticated(result.authenticated)
        });
  }, []);

  useEffect(() => {
    fetch("api/confluence/fetchSpaces")
        .then((response) => response.json())
        .then((result) => {
          console.log('result', JSON.stringify(result, null, 2));
          setSpaces(result.spaces.results)
        });
  }, [authenticated]);


  if (!authenticated) {
    return (
        <div className="grid wrapper">
          <div className="cs1 ce12">
            <button className="button bg-blue" type="button" onClick={() => window.open(`/api/signin`, '_blank')}>
              <span className="icon-eye"></span>
              Login
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="grid wrapper">
        {/*Display all spaces */}
        <div className="cs1 ce12">
          <Table title='Spaces' description='A list of all the spaces in your instance including their id, key, and name.' spaces={spaces}/>
        </div>
      </div>
  );
}
