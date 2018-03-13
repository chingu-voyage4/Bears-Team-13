import React from 'react';

const BackgroundCredit = (props) => {
    const link = props.pictureLink;
    return(
        <div className="BGHolder">
            <div className="BGTextWrapper animation-element">
                <div className="BGText">
                    {props.pictureLocation}
                </div>
                <div className="authorLikeTwitter animation-element">
                    <div className="BGAuthor">
                        <a className="unsplash-link" href={link}>Photo by {props.pictureByName} / Unsplash </a>
                    </div>
                    <div className="like">
                        <i className="far fa-heart"></i>
                    </div>
                </div>
            </div>
        </div>  
    )
}
export default BackgroundCredit