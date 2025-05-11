export const timeAgoFormatter = (createdAt: string | Date) => {
  const now = new Date();
  const past = new Date(createdAt);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const week = 604800;

  if (diffInSeconds < minute) return "just now";
  if (diffInSeconds < hour)
    return `${Math.floor(diffInSeconds / minute)}min ago`;
  if (diffInSeconds < day) return `${Math.floor(diffInSeconds / hour)}hr ago`;
  if (diffInSeconds < week) return `${Math.floor(diffInSeconds / day)}d ago`;

  return past.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
