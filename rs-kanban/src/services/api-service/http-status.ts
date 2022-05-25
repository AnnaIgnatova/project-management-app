export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ToastMessage {
  BAD_REQUEST = 'The request was not recognized by the server due to a possible syntax error',
  UNAUTHORIZED = 'You are not authorized. Please sign in',
  NOT_FOUND = 'The requested data was not found on this server',
  CONFLICT = 'The request cannot be completed due to a conflict with the current state of the resource',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}
