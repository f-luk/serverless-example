import AWS from 'aws-sdk';

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export default {
    get: (params) => dynamoClient.get(params).promise(),
    put: (params) => dynamoClient.put(params).promise(),
    query: (params) => dynamoClient.query(params).promise(),
    update: (params) => dynamoClient.update(params).promise(),
    delete: (params) => dynamoClient.delete(params).promise(),
};