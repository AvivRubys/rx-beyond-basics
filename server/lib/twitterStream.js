import Twitter from 'twitter-stream-api';
import {Observable} from 'rxjs';
import {fromStream} from './fromStream';

export function getTwitterStream(track) {
    return Observable.create(observer => {
        const twitter = new Twitter({
            consumer_key: 'CONSUMER_KEY',
            consumer_secret: 'CONSUMER_SECRET',
            token: 'TOKEN',
            token_secret: 'TOKEN_SECRET',
        });

        twitter.stream('statuses/filter', {
            track,
        });

        const subscription = fromStream(twitter, {
            data: 'data',
            close: 'connection aborted',
            error: 'connection error http',
        }).subscribe(observer);
        subscription.add(() => twitter.close());
        return subscription;
    });
};
