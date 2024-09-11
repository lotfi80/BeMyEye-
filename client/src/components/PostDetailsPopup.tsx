import React from "react";
import {useState , useEffect} from "react";
import { useCategoryUserContext } from "../context/CategoryUser";




interface PostDetailsPopupProps {
  
  selectedPost: {
    // title: string;
    // description: string;
    // address: string;
    // postDate?: string;
    // image: string;
    postid : string;
    
  };
  onClose: () => void;
}



const PostDetailsPopup: React.FC<PostDetailsPopupProps> = ({
    
  // post,
  selectedPost,
  onClose,
}) => {
  const {user} = useCategoryUserContext();
  const [post, setPost] = useState<any>({}); /*interface of object post*/
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]); /*interface of object comment*/
  useEffect(() => {
    const fetchOnePost = async () => {
      const response = await fetch(`http://localhost:5000/posts/${selectedPost.postid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log('dataaa get post', data);
      setPost(data);
      if (data.postcomments) {
        const res = await fetch(`http://localhost:5000/posts/comment/get?postid=${data._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const postComments = await res.json();
        console.log('postCommentssssss', postComments);
        setComments(postComments);
      }
    };
    fetchOnePost();
  }, []);
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Datum nicht verfügbar";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };
  
    const addComment = async () => {
      // setComments((prev) => [...prev, { content: comment }]);
    
      const response = await fetch (`http://localhost:5000/posts/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: user?._id,
          postid: selectedPost.postid,
          content: comment,
        }),
      });
      const data = await response.json();
      console.log('data.newComment', data);
      setComments((prev) => [...prev, data.newComment]);
      setComment("");

      

    }


console.log('testt post', post);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden relative p-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 p-3 rounded-full transition-colors bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          {post.postimage && post.postimage.length > 0 ? (
            <div className="mb-6">
              <img
                src={`http://localhost:5000/${post.postimage[0].image}`}
                alt="Post image"
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Kein Bild verfügbar</span>
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed whitespace-pre-wrap">
            Description :{post.description}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            Erstellt am:{" "}
            <span className="font-medium">{formatDate(post.postDate)}</span>
          </p>

          <p className="text-sm text-gray-600 mb-2">
            Adresse: <span className="font-medium">{post.address}</span>
          </p>
        </div>
        <label htmlFor="">comments</label>
        <input  
        value={comment}
        onChange= {(e)=> 
            setComment(e.target.value)
         }  type="text" />
        <button onClick={addComment} >submit </button>
        {comments.map((cmt) => (
        <div> {cmt.content} </div>
        ))}
      </div>
      
    </div>

  );
};

export default PostDetailsPopup;
