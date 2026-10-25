/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(value) {
	// A plain file name with an extension; no slashes, no leading dot (hides .resized/).
	return /^[\w-][\w.-]*\.[a-z0-9]{2,5}$/i.test(value);
}
