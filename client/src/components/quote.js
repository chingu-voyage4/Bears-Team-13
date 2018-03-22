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
        var self = this;
        axios.get('https://momentum-server-bt13.herokuapp.com/api/get_quote').then(function(res) {
            self.setState({
                text: res.data.quoteText, 
                author: res.data.quoteAuthor, 
                tweet: 'https://twitter.com/intent/tweet?text=' + res.data.quoteText + '- ' + res.data.quoteAuthor + 'via @chingumentum'});
        });
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
