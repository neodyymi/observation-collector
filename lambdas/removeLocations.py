import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('reaktor-locations')
    
    body = json.loads(event['body'])
    
    for item in body['Items']:
        table.delete_item(
            Key={
                'id': item['id']
            }
        )
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
        }
    }