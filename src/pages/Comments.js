import React, {useState, useEffect, useRef} from 'react';
import {AutoSizer, InfiniteLoader, List, WindowScroller} from 'react-virtualized';
import Loader from '../components/Loader';
import {useComments} from '../contexts/Comments';

const Comments = () => {
  const {comments, setComments, globalScrollTop, setGlobalScrollTop} = useComments();
  const [loading, setLoading] = useState(false);
  const localScrollTop = useRef(0);

  useEffect(() => {
    return () => {
      setGlobalScrollTop(localScrollTop.current)
    }
  }, [setGlobalScrollTop]);

  const onScroll = ({scrollTop}) => {
    localScrollTop.current = scrollTop;
  };

  const renderRow = ({index, key, style}) => {
    const commentsRow = comments.slice(2 * index, 2 * index + 2);

    return (
      <div style={{
        ...style,
        padding: 5,
        height: 200,
        display: 'flex',
        justifyContent: 'space-around'
      }}
           key={key}>
        {commentsRow.map(cr => (
          <div key={cr.id}
               style={{width: '40%', backgroundColor: 'orange', padding: 5}}
          >
            <div>Id: {cr.id}</div>
            <div>Name: {cr.name}</div>
            <div>Email: {cr.email}</div>
            <div style={{wordBreak: 'break-word'}}>{cr.body}</div>
          </div>
        ))}
      </div>
    );
  };

  const isRowLoaded = ({index}) => {
    return !!comments[index * 2];
  };

  const loadMoreRows = async ({startIndex}) => {
    setLoading(true);

    const page = Math.ceil(startIndex / 5 + 1);
    // await new Promise((resolve => setTimeout(resolve, 500)))
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}`);
    const newComments = await response.json();

    setLoading(false);
    setComments(prev => [...prev, ...newComments]);
  };

  return (
    <>
      <div>Comments list (Count: {comments.length})</div>
      <div>
        <Loader loading={loading}/>
        <WindowScroller>
          {({height, scrollTop}) => (
            <div style={{display: 'flex'}}>
              <div style={{width: 300, height: 200, backgroundColor: 'blue'}}>
              </div>
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={250}
                minimumBatchSize={5}
                threshold={1}>
                {({onRowsRendered, registerChild}) => (
                  <AutoSizer disableHeight>
                    {({width}) => (
                        <List
                          autoHeight
                          ref={registerChild}
                          onRowsRendered={onRowsRendered}
                          height={height}
                          width={width - 300}
                          scrollTop={scrollTop}
                          onScroll={onScroll}
                          rowHeight={200}
                          rowRenderer={renderRow}
                          rowCount={comments.length / 2 + 1}
                          overscanRowCount={5}
                        />
                      )
                    }
                  </AutoSizer>
                )}
              </InfiniteLoader>
            </div>
          )}
        </WindowScroller>
      </div>
    </>
  );
};

export default Comments;