import imageCompression from "browser-image-compression";

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

export const comporessImage = async (image: File): Promise<string | undefined> => {
    try {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: false,
        }

        const compressedFile = await imageCompression(image, options);
        const base64Image = await convertToBase64(compressedFile);
        return base64Image;
    } catch (error) {
        console.error("Failed to compress image: ERROR - ", error);
    }
}