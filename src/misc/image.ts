/**
 * Create an image from a file.
 * @param file The file containing an image.
 * @returns A promise that fulfills to a decoded image or null
 */
export function fileToImage(file: File): Promise<HTMLImageElement | null> {
	const reader = new FileReader();

	let promiseResolve: (value: HTMLImageElement | null) => void;
	const promise = new Promise<HTMLImageElement | null>((resolve) => {
		promiseResolve = resolve;
	});

	reader.onload = (): void => {
		const image = new Image();
		image.src = reader.result as string;

		image.decode()
			.then(() => promiseResolve(image))
			.catch(() => promiseResolve(null));
	};

	reader.readAsDataURL(file);

	return promise;
}
