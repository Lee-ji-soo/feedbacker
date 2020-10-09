import React, { useState } from 'react';
import { diary } from '../assets/diary';
import '../css/main.scss';
import { useInput } from '../customs/useInput';

const Feed = () => {
    const [input, handleInput, setInput] = useInput('');
    const [posts, setPosts] = useState([]);

    const handleSubmit = () => {
        const newPosts = posts.concat(...posts, [input]);
        setPosts(newPosts)
        setInput('');
    }

    return (
        <main>
            {
                diary.map((con, i) =>
                    <div key={`article${i}`} className='article-wrap'>
                        <section className='article-section'>
                            <article className='article'>
                                <h2>[{con.title}]</h2>
                                <p>{con.content}</p>
                                <img src={con.src} alt={con.title} />
                                <p>이미지 출처: {con.from}</p>
                            </article>
                        </section>
                        <section className='input'>
                            <div className='post'>
                                {posts.map((post, i) =>
                                    <p key={`post${i}`}>〉{post}</p>
                                )}
                            </div>
                            <div className='submit'>
                                <input value={input} onChange={handleInput} />
                                <button onClick={handleSubmit}>⌲</button>
                            </div>
                        </section>
                    </div>
                )
            }
        </main>
    )
};

export default Feed;
