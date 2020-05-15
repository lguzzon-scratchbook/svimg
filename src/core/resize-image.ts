import sharp from "sharp";

interface ResizeImageOptions {
    width: number;
    height?: number;
    quality?: number;
}

async function resizeImage(inputFile: string, options: ResizeImageOptions, outputFile: string): Promise<sharp.OutputInfo>;
async function resizeImage(inputFile: string, options: ResizeImageOptions): Promise<Buffer>;
async function resizeImage(inputFile: string, options: ResizeImageOptions, outputFile?: string): Promise<Buffer | sharp.OutputInfo> {
    if (!inputFile) {
        throw new Error('Input file is required');
    }

    let sharpInstance = sharp(inputFile);
    if (options.quality) {
        sharpInstance = sharpInstance.jpeg({
            quality: options.quality,
            force: false,
        }).png({
            quality: options.quality,
            force: false,
        }).webp({
            quality: options.quality,
            force: false,
        });
    }

    sharpInstance = sharpInstance.resize(options.width, options.height);

    return outputFile !== undefined ? sharpInstance.toFile(outputFile) : sharpInstance.toBuffer();
}

export default resizeImage;