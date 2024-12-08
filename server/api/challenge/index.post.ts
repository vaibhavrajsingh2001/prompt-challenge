import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
    try {
        // Parse multipart form data
        const form = await readFormData(event);

        // Extract image and title from the form data
        const imageFile = form.get('image') as File
        const titlePart = form.get('title') as string

        // Validate inputs
        if (!imageFile || !titlePart) {
            throw createError({
                statusCode: 400,
                message: 'Image file and title are required'
            });
        }

        ensureBlob(imageFile, {
            maxSize: '8MB',
            types: ['image/png', 'image/jpeg']
        })

        // Generate a unique filename using UUID
        const fileName = `${uuidv4()}${getFileExtension(imageFile.name || '')}`;

        // Upload to Cloudflare Blob Storage
        await hubBlob().put(fileName, imageFile, {
            addRandomSuffix: false,
            prefix: 'challenges'
        });

        // Save metadata to KV storage
        await hubKV().set(`challenge:${fileName}`, {
            title: titlePart.toString(),
            fileName: fileName,
            uploadedAt: new Date().toISOString()
        });

        // Return success response
        return {
            success: true,
            fileName: fileName,
            title: titlePart
        };
    } catch (error) {
        // Handle any errors
        console.error('Image upload error:', error);
        throw createError({
            statusCode: 500,
            message: 'Failed to upload image'
        });
    }
});

// Helper function to extract file extension
function getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}