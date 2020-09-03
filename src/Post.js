import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from "firebase";

function Post({postId, user, username, caption, imageUrl}) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc => doc.data())));
            })
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

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

            <div className="post_comments">
                {comments.map((comment) => (
                    <p>
                        <strong> {comment.username} </strong> {comment.text}
                    </p>
                ))}
            </div>

            { user && (
                <form className="post_commentBox">
                    <input className="post_input" type="text" placeholder="Add a comment.."
                    value={comment} onChange={(e) => setComment(e.target.value)} />

                    <button disabled={!comment} className="post_button" type="submit" 
                    onClick={postComment}> Post </button>
                </form>
            )}
        </div>
    )
}

export default Post
