import React from 'react';
import './Event.css';

const Event = () => {
  return (
    <div className="Event">

  <div class="d-demo">
    <div class="d-demo__wrap">
        <ul class="d-demo__list d-demo__list--left">
            <li class="d-demo__item"><img src="mypika.jpg" alt="mypika"/></li>
            <li class="d-demo__item"><img src="emol.jpg"   alt="emol  "/></li>
            <li class="d-demo__item"><img src="mypika.jpg" alt="mypika"/></li>
            <li class="d-demo__item"><img src="emol.jpg"   alt="emol  "/></li>
         </ul>
         <ul class="d-demo__list d-demo__list--left">
            <li class="d-demo__item"><img src="mypika.jpg" alt="mypika"/></li>
            <li class="d-demo__item"><img src="emol.jpg"   alt="emol  "/></li>
            <li class="d-demo__item"><img src="mypika.jpg" alt="mypika"/></li>
            <li class="d-demo__item"><img src="emol.jpg"   alt="emol  "/></li>
         </ul>
    </div>
 </div>



      <header className="App-header">
        <h1>イベントページ</h1>
          <ul>
            <li>イベント1</li>
            <li>イベント2</li>
            <li>イベント3</li>
          </ul>
      </header>
    </div>
    
  );
};

export default Event;
