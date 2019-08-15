import React from 'react';

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{ anecdote.content }</h2>
      Has {anecdote.votes} votes
      For more info see <a href={anecdote.info} target='_blank'>{anecdote.info}</a>
    </div>
  );
};

export default Anecdote;