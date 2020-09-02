import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar" alt="Heena" 
                src="https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY"
                />
                <h3>{username}</h3>
            </div>
            {/* header -> avatar + username */}

            <img className="post_image"
            src={imageUrl} alt="" />
            {/* image */}

            <h4 className="post_text"><strong>{username}</strong> {caption}.</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
