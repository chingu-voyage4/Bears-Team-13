import React, {Component} from 'react';
import axios from 'axios';
import customLocalStorage from '../customLocalStorage';

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
        var storedQuotes = JSON.parse(customLocalStorage.getItem('quotes')) || [];
        var currentTime = new Date().getTime();
        var self = this;
        //check to see if previous quote was stored more than 15 min ago
        if (storedQuotes.length === 0 || storedQuotes[storedQuotes.length - 1].time + 900000 < currentTime) {
            
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

                customLocalStorage.setItem('quotes', JSON.stringify(storedQuotes), self.props.loggedInUser);
            });
        }

        else {
            self.setState({text: storedQuotes[storedQuotes.length - 1].text, author: storedQuotes[storedQuotes.length - 1].author, liked: storedQuotes[storedQuotes.length - 1].liked});
        }
    }

    //For Sync
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataInStorage === 'server') {
            var storedQuotes = JSON.parse(customLocalStorage.getItem('quotes')) || [];
            var currentTime = new Date().getTime();
            var self = this;
            //check to see if previous quote was stored more than 15 min ago
            if (storedQuotes.length === 0 || storedQuotes[storedQuotes.length - 1].time + 900000 < currentTime) {
                
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
                });
            }

            else {
                self.setState({text: storedQuotes[storedQuotes.length - 1].text, author: storedQuotes[storedQuotes.length - 1].author, liked: storedQuotes[storedQuotes.length - 1].liked});
            }
        }
    }

    changeLikeStatus() {
        this.setState({liked: !this.state.liked});
        this.props.favorite(!this.state.liked)

        var quotes = JSON.parse(customLocalStorage.getItem('quotes'));
        quotes[quotes.length-1].liked = !quotes[quotes.length-1].liked;
        customLocalStorage.setItem('quotes', JSON.stringify(quotes), this.props.loggedInUser);
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
