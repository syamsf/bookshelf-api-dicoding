class SuccessResponse {
  constructor({ message = null, status = 'success', data = null }) {
    this.message = message;
    this.status = status;
    this.data = data;
  }

  format() {
    const data = {
      status: this.status,
    };

    if (this.message) {
      data.message = this.message;
    }

    if (this.data) {
      data.data = this.data;
    }

    return data;
  }
}

module.exports = SuccessResponse;
