import React from 'react';
import { feeds } from '../assets/feeds';
import '../css/main.scss';
import Comments from '../components/Comments';

const Feed = () => {
  return (
    <main>
      {
        feeds.map((con, i) =>
          <div key={`article${i}`} className='article-wrap'>
            <section className='article-section'>
              <article className='article'>
                <h2>[{con.title}]</h2>
                <p>{con.content}</p>
                <img src={con.src} alt={con.title} />
                <p>이미지 출처: {con.from}</p>
              </article>
            </section>
            <Comments/>
          </div>
        )
      }
    </main>
  )
};

export default Feed;
