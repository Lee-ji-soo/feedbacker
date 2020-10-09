import React, { useState } from 'react';
import { diary } from '../assets/diary';
import '../css/main.scss';
import { useInput } from '../customs/useInput';

const News = () => {
    const [input, handleInput, setInput] = useInput('');
    const [posts, setPosts] = useState([]);

    const handleSubmit = () => {
        const newPosts = posts.concat(...posts, [input]);
        setPosts(newPosts)
        setInput('');
    }

    return (
        <main>
            <section className='articles'>
                {
                    diary.map((con, i) =>
                        <article className='article' key={`con${i}`}>
                            <h2>[{con.title}]</h2>
                            <p>{con.content}</p>
                            <img src={con.src} alt={con.alt} />
                            <p>이미지 출처: {con.alt}</p>
                        </article>
                    )
                }
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
        </main>
    )
};

export default News;
