import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('ccfun_completed')
    
    response = table.scan()
    data = response['Items']
    
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
        },
        "body": json.dumps(data)
    }
