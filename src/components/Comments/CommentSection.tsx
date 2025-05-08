"use client";

import { timeAgoFormatter } from "@/lib/timeAgoFormatter";
import { RefObject, useEffect, useRef, useState } from "react";

interface CommentSectionProps {
  commentRef: RefObject<HTMLDivElement | null>;
}

const CommentSection = ({ commentRef }: CommentSectionProps) => {
  const replyBoxRef = useRef<HTMLDivElement | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const commentData = [
    {
      id: "1",
      userName: "shakiqur75",
      avatar: "2025-05-08T00:00:00Z",
      content: "You're right brother.",
      createdAt: "2025-05-08T17:23:30Z",
      replies: [
        {
          userName: "rezwan435435",
          content: "I agree with you!",
          createdAt: "2025-05-08T10:30:00Z",
        },
      ],
    },
    {
      id: "2",
      userName: "rezwan435435",
      avatar: "2025-05-08T00:00:00Z",
      content: "Nowadays it's common",
      createdAt: "2025-05-02T15:00:00Z",
      replies: [
        {
          userName: "shakiqur75",
          content: "True, it's becoming a norm.",
          createdAt: "2025-05-08T11:00:00Z",
        },
        {
          userName: "shakiqur75",
          content: "True, it's becoming a norm.",
          createdAt: "2025-05-08T11:00:00Z",
        },
      ],
    },
    {
      id: "3",
      userName: "rakib_ah434",
      avatar: "2025-05-08T00:00:00Z",
      content: "💯 true!",
      createdAt: "2025-02-17T10:30:00Z",
      replies: [],
    },
  ];

  // Close reply box on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        replyBoxRef.current &&
        !replyBoxRef.current.contains(event.target as Node)
      ) {
        setReplyingTo(null);
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
            onChange={handleComment}
            value={content}
            className="w-full border border-gray-500 p-4 rounded-lg outline-none resize-none"
            name="comment"
            id="comment"
            placeholder="Write a comment..."
            rows={3}
          ></textarea>
          <button
            type="button"
            onClick={() => console.log(content)}
            className="uppercase font-semibold tracking-wider px-5 py-2 bg-primary rounded-lg text-sm mt-2  text-white"
          >
            Submit
          </button>
        </div>
        {commentData.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="size-12 rounded-full object-cover bg-black/10 dark:bg-white/10 shrink-0"></div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold">{comment.userName}</h3>
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
                  placeholder="Write a reply..."
                  rows={3}
                ></textarea>
                <button
                  type="button"
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
                    <div className="size-12 rounded-full object-cover bg-black/10 dark:bg-white/10 shrink-0"></div>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold">
                        {reply.userName}
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
