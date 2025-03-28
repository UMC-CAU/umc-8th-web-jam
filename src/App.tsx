import React from 'react';
import './App.css';
import List from './components/List';

function App(){
  const nickname: string = '브라키오사우르스';
  const favoriteFood: string = '피자';
  const tea: string[] = ['녹차','홍차','우롱차','매실차','오미자차'];
  const movie: string[] = ['콘클라베', '미키17', '와일드 투어', '쉬리'];
  const university: string[] = ['중앙대학교', '앙중대학교', '웅장대학교', '장웅대학교'];

  return (
    <>
      <strong className='school'>중앙대학교</strong>
      <p style={{color: 'purple', fontWeight:'bold', fontSize:'8rem'}}>
        {nickname}/권재민
      </p>
      <h1>{`${nickname}는 ${favoriteFood} 좋아합니다.`}</h1>
      <ul>
        {tea.map((tea, idx) => (
          <List key={idx} tea={tea} />
        ))}
      </ul>
    </>
  );
}

export default App;