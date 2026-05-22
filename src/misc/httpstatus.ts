/**
 * Check is an http status code is a successful response
 * @param status Http status code
 * @returns True if the code in the {200..299} range, false otherwise
 */
export function isHTTPSuccess(status: number): boolean {
	return status >= 200 && status < 300;
}
