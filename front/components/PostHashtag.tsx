import Link from 'next/link';
import React from 'react';

// Types
type PostHashtagProps = {
  hashtag: string;
};

// export
function PostHashtag({ hashtag }: PostHashtagProps) {
  return (
    <>
      {hashtag.split(/(#[^\s#,]+)/g).map((value, i) => {
        if (value.match(/(#[^\s#,]+)/)) {
          return (
            <Link href={`/hashtag/${value.slice(1)}`} key={i}>
              <a>{value}</a>
            </Link>
          );
        }
        return value;
      })}
    </>
  );
}

export default PostHashtag;
