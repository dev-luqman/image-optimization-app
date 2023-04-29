'use strict';
module.exports.handler = async (event) => {
  console.log('Start Printing S3 Collection...', event);
  for (const record of event.Records) {
    const key = record.s3.object.key;
    console.log('Processing S3 event', key);
  }
};
