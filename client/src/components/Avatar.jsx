import React from 'react';
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

const Avatar = ({ options }) => {
  const avatar = createAvatar(bottts, {
    ...options // Pass the options provided by the user
  });

  

  // Convert the SVG to a string
  const svgString = avatar.toString();

  return (
    <div dangerouslySetInnerHTML={{ __html: svgString }} />
  );
};

export default Avatar;