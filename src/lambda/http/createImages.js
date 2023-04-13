'use strict';

import { createImageHandler } from '../../helperFunction/imageDbAccess';

module.exports.handler = async (event) => {
  console.log('Start Creating Image Collection...', event);

  let image = JSON.parse(event.body);

  let ImageItems = {
    image: image.imageUrl,
    createdAt: new Date().toISOString(),
  };

  const result = await createImageHandler(ImageItems);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Create Image successfully',
      item: result,
    }),
  };
};
