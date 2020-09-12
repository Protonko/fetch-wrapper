export interface IOptions {
  [key: string]: string
}

export interface IRequestOptions {
  [key: string]: string | Headers
}

export interface IConfig {
  url?: URL
  headers?: Headers
  method?: string
  baseURL?: string
  body?: string
}

export interface IErrorResponse {
 response: null
 errorCode: number
 errorMessage: string
}

export interface ISuccessResponse {
  response: Response
  errorCode: null
  errorMessage: null
}
