// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: setting up base response code
// ;===========================================
// */

// constructing base response parameters
class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}

// exporting the base response
module.exports = BaseResponse;
