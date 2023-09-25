import { useState, useEffect } from "react";
import Table from "../src/components/Table";
import {GetServerSideProps} from "next";
import initMiro from "../initMiro";

export const getServerSideProps: GetServerSideProps =
    async function getServerSideProps({req}) {
      const {miro} = initMiro(req);

      // redirect to auth url if user has not authorized the app
      if (!(await miro.isAuthorized(''))) {
        return {
          props: {
            boards: [],
            authUrl: miro.getAuthUrl(),
          },
        };
      }

      const api = miro.as('');

      const boards: string[] = [];

      for await (const board of api.getAllBoards()) {
        boards.push(board.name || '');
      }

      return {
        props: {
          boards,
        },
      };
    };

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
    fetch("api/authenticate", {credentials: "include"})
        .then((response) => response.json())
        .then((result) => {
          setAuthenticated(result.authenticated)
        });
  }, []);

  useEffect(() => {
    fetch("api/confluence/fetchSpaces", {credentials: "include"})
        .then((response) => response.json())
        .then((result) => {
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
