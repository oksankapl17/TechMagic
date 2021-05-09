export default class ErrorHandler {
  handleError(e) {
    // Inner Lexical Environment
    if (typeof e === 'string') {
      console.log(e);
    } else {
      console.error('Error:', e && e.message);
    }
  }
}
