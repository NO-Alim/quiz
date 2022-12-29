import React from 'react';
import {
  LinkedinShareButton,
  FacebookShareButton,
  LinkedinIcon,
  FacebookIcon,
} from 'react-share';
import { AiFillLinkedin } from 'react-icons/ai';
const ShareSocial = () => {
  return (
    <div className="flex flex-col gap-5 text-center">
      <h1 className="text-3xl font-thin">Share Result in Social Media.</h1>
      <div className="flex gap-5 justify-center ">
        <LinkedinShareButton
          url={`https://cdn.pixabay.com/photo/2020/11/01/21/44/angel-5705040_960_720.jpg`}
          title="Check out this iHateReading custom repository "
          hashtag="#mralim"
        >
          <LinkedinIcon size={36} />
        </LinkedinShareButton>
        <FacebookShareButton
          url={`www.mralim.com`}
          title="Check out this iHateReading custom repository "
          hashtag="#mralim"
          quote="hello world"
        >
          <FacebookIcon size={36} />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default ShareSocial;
