import handler from '../libs/handler';
import dynamoDB from '../libs/dynamoDB';

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
            // - 'userId': Identity Pool identity id of the authenticated user
            // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    const result = await dynamoDB.get(params);

    if (!result.Item) {
        throw new Error("Item not found! 😕");
    }

    // Return the retrieved Item
    return result.Item;
});