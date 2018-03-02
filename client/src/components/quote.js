import React, {Component} from 'react';
import axios from 'axios';

class Quote extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            author: ''
        }
    }

    componentWillMount() {
        var self = this;
        axios.get('https://momentum-server-bt13.herokuapp.com/api/get_quote').then(function(res) {
            //example returned quote data
            self.setState({text: res.data.quoteText, author: res.data.quoteAuthor});
        });
    }

    render() {
        return (
            <div className="quoteHolder">
                <div className="quoteTextWrapper">
                    <div className="quoteText">
                        "{this.state.text}"
                    </div>
                    <div className="authorLikeTwitter">
                        <div className="quoteAuthor">
                            - {this.state.author}
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
