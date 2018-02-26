import React, {Component} from 'react';
import axios from 'axios';

class Quote extends Component {
    constructor(props){
        super(props);
        this.state = {
            quote: {}
        }
    }

    componentWillMount() {
        var self = this;
        axios.get('/sample/quote/route').then(function(res) {
            //example returned quote data
            self.setState({quote: res.data.quote});
            //would then render quote data below via state
        });
    }

    render() {
        return (
            <div className="quoteHolder">
                <div className="quoteTextWrapper">
                    <div className="quoteText">
                        "I came. I saw. I conquered."
                    </div>
                    <div className="authorLikeTwitter">
                        <div className="quoteAuthor">
                            Julius Caesar
                        </div>
                        <div className="like">
                            <i className="far fa-heart"></i>
                        </div>
                        <div className="twitterIcon">
                            <i className="fab fa-twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quote;
