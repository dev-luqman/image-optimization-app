'use strict';
const { uuid } = require('uuidv4');
const GroupDbAccess = require('../../helperFunction/GroupDbAccess.js');

module.exports.handler = async (event) => {
  console.log('Start Creating Image Collection...', event);

  let groupDate = JSON.parse(event.body);

  let ImageItems = {
    name: groupDate.name,
    id: uuid(),
    description: groupDate.name,
  };

  const result = await GroupDbAccess.createGroupHandler(ImageItems);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Create Group successfully',
      item: result,
    }),
  };
};
