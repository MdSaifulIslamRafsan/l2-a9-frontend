"use client";

import { timeAgoFormatter } from "@/lib/timeAgoFormatter";
import { makeComment } from "@/services/comments";
import { TComment } from "@/types/comments";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface CommentSectionProps {
  commentRef: RefObject<HTMLDivElement | null>;
  comments: TComment[];
  reviewId: string;
}

const CommentSection = ({
  commentRef,
  comments,
  reviewId,
}: CommentSectionProps) => {  
  const replyBoxRef = useRef<HTMLDivElement | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [replyContent, setReplyContent] = useState<string>("");

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleCommentSubmit = async () => {
    if (content.length < 0) {
      toast.error("Comment cannot be empty!");
      return;
    }
    const response = await makeComment({
      content,
      reviewId,
    });
    if (response?.success) {
      toast.success("Comment added");
      setContent("");
    } else {
      toast.error("Failed to comment");
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    if (replyContent.length < 0) {
      toast.error("Reply cannot be empty!");
      return;
    }
    const response = await makeComment({
      content: replyContent,
      reviewId,
      parentId: parentId,
    });
    if (response?.success) {
      toast.success("Reply added");
    } else {
      toast.error("Failed to reply");
    }
    setReplyContent("");
    setReplyingTo(null);
  };

  // Close reply box on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        replyBoxRef.current &&
        !replyBoxRef.current.contains(event.target as Node)
      ) {
        setReplyingTo(null);
        setReplyContent("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section className="my-20" ref={commentRef}>
      <h2 className="text-2xl font-semibold mb-3 container mx-auto">
        Comments
      </h2>
      <hr />
      <div className="container mx-auto mt-5 space-y-8">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-500 p-4 rounded-lg outline-none resize-none"
            name="comment"
            id="comment"
            placeholder="Write a comment..."
            rows={3}
          ></textarea>
          <button
            type="button"
            onClick={handleCommentSubmit}
            className="uppercase font-semibold tracking-wider px-5 py-2 bg-primary rounded-lg text-sm mt-2  text-white"
          >
            Submit
          </button>
        </div>
        {comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2">
            <div className="flex gap-4">
              {comment.user?.profileUrl ? (
                <Image
                  className="size-12 rounded-full object-cover"
                  src={comment.user.profileUrl}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                />
              ) : (
                <div className="size-12 rounded-full object-cover bg-black/10 dark:bg-white/10 shrink-0"></div>
              )}

              <div className="space-y-1">
                <h3 className="text-base font-semibold">
                  {comment.user.username}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => handleReplyClick(comment.id)}
                    className="text-gray-700 dark:text-gray-400 font-semibold focus:outline-none"
                  >
                    Reply
                  </button>
                  <p className="text-gray-700 dark:text-gray-400 text-sm">
                    {timeAgoFormatter(comment.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Reply textarea if this comment is being replied to */}
            {replyingTo === comment.id && (
              <div ref={replyBoxRef} className="ml-16 mt-2">
                <textarea
                  className="w-full border border-gray-500 p-3 rounded-lg outline-none resize-none"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows={3}
                ></textarea>
                <button
                  type="button"
                  onClick={() => handleReplySubmit(comment.id)}
                  className="uppercase font-semibold tracking-wider px-4 py-1.5 bg-primary rounded-lg text-sm mt-2 text-white"
                >
                  Reply
                </button>
              </div>
            )}

            {comment.replies.length > 0 && (
              <div className="ml-8 mt-4 space-y-2">
                {comment.replies.map((reply, index) => (
                  <div key={index} className="flex gap-4">
                    {reply.user?.profileUrl ? (
                      <Image
                        className="size-12 rounded-full object-cover"
                        src={reply.user.profileUrl}
                        alt={reply.user.name}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="size-12 rounded-full object-cover bg-black/10 dark:bg-white/10 shrink-0"></div>
                    )}
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold">
                        {reply.user.username}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {reply.content}
                      </p>
                      <p className="text-gray-700 dark:text-gray-400 text-sm">
                        {timeAgoFormatter(reply.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
