import React, { FC } from 'react';

import { useAppSelector } from '../../hook/hooks';

import './mem.scss';
import cat1 from './7d7e62c7cc37b18f7002e93dded59853.jpg';
import cat2 from './1644872517_1-kartinkin-net-p-kotiki-kartinki-1.jpg';
import cat3 from './1619541010_52-oir_mobi-p-nyashnie-kotiki-zhivotnie-krasivo-foto-57-730x856.jpg';
import cat4 from './a23d68b6ee75f6fe6fa67.jpg';
import cat5 from './photo_2022-07-09_09-47-03.jpg';

const Mem: FC = () => {
  const isTime = useAppSelector((state) => state.mem.isMemTime);
  const catArray = [cat1, cat2, cat3, cat4, cat5];
  const random = Math.floor(Math.random() * 5);
  return (
    <div className={`mem-container ${isTime ? 'hide' : ''}`}>
      <p>Котики делают все лучше, даже мой проект!</p>
      <img className={'cats'} src={catArray[random]} alt="cats" />
    </div>
  );
};

export default Mem;
