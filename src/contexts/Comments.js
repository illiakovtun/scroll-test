import React, {createContext, useContext, useState} from 'react';

const CommentsContext = createContext('comments');

export const useComments = () => useContext(CommentsContext);

const CommentsProvider = ({children}) => {
  const [comments, setComments] = useState([]);
  const [globalScrollTop, setGlobalScrollTop] = useState(0);

  return (
    <CommentsContext.Provider value={{comments, setComments, globalScrollTop, setGlobalScrollTop}}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;