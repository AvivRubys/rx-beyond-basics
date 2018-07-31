import {createWebsocketObservable} from '../WebSocket';
import {Observable} from 'rxjs';
import TweetStore from './store';
import {getTweetScore} from '../sentiment';

const tweet$ = createWebsocketObservable('ws://localhost:8080/tweets?track=trump')
    .retry()
    .repeat()
    .map(JSON.parse)
    .map(tweet => ({...tweet, score: getTweetScore(tweet)}))
    .share();

Observable.merge(
    tweet$.do(tweet => TweetStore.printTweet(tweet)),
    tweet$.scan(count => count + 1, 0).do(count => TweetStore.printTweetCount(count))
)
    .takeUntil(tweet$.bufferCount(3).filter(tweets => tweets.every(tweet => !tweet.score)))
    .subscribe();
