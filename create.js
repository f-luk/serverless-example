import { v1 as uuidv1 } from 'uuid';
import * as dynamoDBClient from './libs/dynamodb-lib';
import { success, failure } from './libs/reponse-lib';

export async function main(event, context) {
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
            UserId: event.requestContext.identity.cognitoIdentityId,
            NoteId: uuidv1(),
            Content: data.content,
            Attachment: data.attachment,
            CreatedAt: Date.now()
        }
    };

    try {
        await dynamoDBClient.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}