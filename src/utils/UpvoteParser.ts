const upvoteParser = (upvotes: number) => {
  if (upvotes >= 1000 && upvotes < 1000000) {
    return `${(upvotes / 1000).toFixed(1)}k`;
  } else if (upvotes >= 1000000) {
    return `${(upvotes / 1000000).toFixed(1)}m`;
  }
  return upvotes;
};
export default upvoteParser;
