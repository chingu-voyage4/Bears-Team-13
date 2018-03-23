import React from 'react';



const BackgroundCredit = (props) => {
    const background = props.background;
        var likeFav;
        !background.favorite ? likeFav = 'like' : likeFav = 'favorite';
    return(
        <div className="BGHolder">
            <div className="BGTextWrapper animation-element">
                <div className="BGText">
                    {background.pictureLocation}
                </div>
                <div className="authorLikeTwitter animation-element">
                    <div className="BGAuthor">
                        <a className="unsplash-link" href={background.pictureLink}>Photo by {background.pictureByName} / Unsplash </a>
                    </div>
                    <div className= {likeFav}  onClick={e => props.favorite('background', e.target)}>
                        <i className="fa fa-heart-o"></i>
                    </div>
                </div>
            </div>
        </div>  
    )
}
export default BackgroundCredit