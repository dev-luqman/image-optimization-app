'use strict';

const imageDbAccess = require('../../helperFunction/imageDbAccess.js');

module.exports.handler = async (event) => {
  console.log('Start Creating Image Collection...', event);

  let image = JSON.parse(event.body);

  let ImageItems = {
    imageUrl: image.imageUrl,
    createdAt: new Date().toISOString(),
  };

  const result = await imageDbAccess.createImageHandler(ImageItems);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Create Image successfully',
      item: result,
    }),
  };
};
