import React, { useEffect, useState } from 'react';
import { fetchStories } from '../api';

const NewsList = ({ match, staticContext }) => {
  const { data } = staticContext || window.__STATE__ || {};

  const [stories, setStories] = useState(data);

  useEffect(() => {
    if (!stories) {
      (async () => setStories(await fetchStories()))();
    }
  }, []);

  if (!stories) {
    return <h4>Loading...</h4>;
  }

  return (
    <table className='newsList'>
      <thead>
        <tr>
          <th>Comments</th>
          <th>Vote Count</th>
          <th>Up Vote</th>
          <th className='textLeft'>News Details</th>
        </tr>
      </thead>
      <tbody>
        {stories.hits.length == 0 ? (
          <tr className='noRecords'>
            <td colSpan={4} className='noRecords'>
              No records found!
            </td>
          </tr>
        ) : (
          stories.hits.map((item, index) => {
            return (
              <tr
                key={item.objectID}
                className={index % 2 == 0 ? 'even' : 'odd'}>
                <td className='textCenter'>{item.num_comments}</td>
                <td className='textCenter'>{item.points}</td>
                <td className='textCenter'>#</td>
                <td>{item.title}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default NewsList;
