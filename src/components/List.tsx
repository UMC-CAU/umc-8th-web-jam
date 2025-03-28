import React, { ReactElement } from 'react';

interface ListProps {
    tea: string;
}

// props를 호출했을 때 
const List = (props: ListProps): ReactElement => {
    const { tea } = props;
   return (
    <li style={{listStyle: 'none'}}>
       {tea}
    </li>
   )
 }
 
 export default List
  