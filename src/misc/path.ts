/**
 * Joins path segments.  Preserves initial "/" and resolves ".." and "."
 * Does not support using ".." to go above/outside the root.
 * This means that join("foo", "../../bar") will not resolve to "../bar"
 *
 * @see https://gist.github.com/creationix/7435851
 *
 * @param segments The path segments to join
 * @returns The joined path
 */
export function joinPath(...segments: string[]): string {
	// Split the inputs into a list of path commands.
	let parts: string[] = [];
	for (const segment of segments) {
		parts = parts.concat(segment.split("/"));
	}
	// Interpret the path commands to get the new resolved path.
	const newParts: string[] = [];
	for (const part of parts) {
		// Remove leading and trailing slashes
		// Also remove "." segments
		if (!part || part === ".") {
			continue;
		}
		// Interpret ".." to pop the last segment
		if (part === "..") {
			newParts.pop();
		} else {
			// Push new path segments.
			newParts.push(part);
		}
	}
	// Preserve the initial slash if there was one.
	if (parts[0] === "") {
		newParts.unshift("");
	}
	// Turn back into a single string path.
	return newParts.join("/") || (newParts.length ? "/" : ".");
}
