import React, {Component} from 'react';
import axios from 'axios';

class Quote extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            author: '',
            tweet: '',
            liked: false
        }
        this.changeLikeStatus = this.changeLikeStatus.bind(this);
    }

    componentWillMount() {
        var storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
        var currentTime = new Date().getTime();
        var self = this;
        //check to see if previous quote was stored more than 15 min ago
        if (storedQuotes.length == 0 || storedQuotes[storedQuotes.length - 1].time + 90000 < currentTime) {
            
            axios.get('https://momentum-server-bt13.herokuapp.com/api/get_quote').then(function(res) {
                self.setState({
                    text: res.data.quoteText, 
                    author: res.data.quoteAuthor || 'Unknown', 
                    tweet: 'https://twitter.com/intent/tweet?text=' + res.data.quoteText + '- ' + res.data.quoteAuthor + 'via @chingumentum'
                });

                var newQuote = {
                    text: res.data.quoteText,
                    author: res.data.quoteAuthor || 'Unknown',
                    time: currentTime,
                    liked: false
                };

                storedQuotes.push(newQuote);
                //set max amount of quotes to 20 and remove any excess quotes from beginning of array (oldest ones)
                if (storedQuotes.length > 20) {
                    storedQuotes.pop();
                }

                localStorage.setItem('quotes', JSON.stringify(storedQuotes));
            });
        }

        else {
            self.setState({text: storedQuotes[storedQuotes.length - 1].text, author: storedQuotes[storedQuotes.length - 1].author, liked: storedQuotes[storedQuotes.length - 1].liked});
        }
    }

    changeLikeStatus() {
        if (this.state.liked) {
            this.setState({liked: false});
            //post to backend to save
        }

        else {
            this.setState({liked: true});
            //post to backend to save
        }

        var quotes = JSON.parse(localStorage.getItem('quotes'));
        quotes[quotes.length-1].liked = !quotes[quotes.length-1].liked;
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    render() {
        return (
            <div className={`quoteHolder ${this.props.visibility}`}>
                <div className="quoteTextWrapper animation-element">
                    <div className="quoteText">
                        "{this.state.text}"
                    </div>
                    <div className="authorLikeTwitter animation-element">
                        <div className="quoteAuthor">
                            - {this.state.author}
                        </div>
                        <div className="like" onClick={this.changeLikeStatus}>
                            <span className={this.state.liked ? 'hidden' : ''}>
                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                            </span>
                            <span className={this.state.liked ? 'fadeIn red-background' : 'hidden'}>
                                <i className="fa fa-heart"></i>
                            </span>
                        </div>
                        <div className="twitterIcon">
                            <a href={this.state.tweet} target="_blank">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quote;
