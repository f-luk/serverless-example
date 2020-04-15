import { v1 as uuidv1 } from 'uuid';
import handler from './libs/handler';
import dynamoDB from './libs/dynamoDB';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,

        // 'Item' contains the attributes of the item to be created
        //  'userId': user identities are federated through the
        //            Cognito Identity Pool, we will use the identity id
        //            as the user id of the authenticated user
        //  'noteId': a unique uuid
        //  'content': parsed from request body
        //  'attachment': parsed from request body
        //  'createdAt': current Unix timestamp

        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuidv1(),
            Content: data.content,
            Attachment: data.attachment,
            CreatedAt: Date.now()
        }
    };

    await dynamoDB.put(params);

});