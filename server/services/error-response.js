// /*
// ============================================
// ; Title: Nodebucket
// ; Author: Professor Krasso
// ; Modified By: Jonathan Kobyluck
// ; Data: 7 October 2020
// ; Description: setting up error response code
// ;===========================================
// */

// constructing error response parameters
class ErrorResponse {
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

// exporting error response
module.exports = ErrorResponse;
