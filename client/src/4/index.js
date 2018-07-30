import React from 'react';
import {observer} from 'mobx-react';
import TweetStore from './store';
import '../App.css';
import './show';

const App = observer(() => (
    <div className="App-intro">
        {TweetStore.count && 'Tweet count ' + TweetStore.count}
        <br />
        <div className="tweet-container">
            {TweetStore.tweets.map((tweet, i) => (
                <span key={i.toString()} className={tweet.score >= 0 ? 'positive' : 'negative'}>
                    {tweet.text}
                    <br />
                </span>
            ))}
        </div>
    </div>
));

export default App;
