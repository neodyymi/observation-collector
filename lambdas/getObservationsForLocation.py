import boto3
import json
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    
    table = dynamodb.Table('reaktor-observations')
    location_id = event['pathParameters']['id']
    response = table.query(
        IndexName='location-id-index',
        KeyConditionExpression=Key('location-id').eq(location_id)
    )

    while 'LastEvaluatedKey' in response:
        response = table.query(
            IndexName='location-id-index',
            KeyConditionExpression=Key('location-id').eq(location_id),
            ExclusiveStartKey=response['LastEvaluatedKey']
        )
        data.extend(response['Items'])
    
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
        },
        "body": json.dumps(response)
    }