import boto3
import json

def lambda_handler(event, context): 
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('reaktor-observations')
    
    response = table.get_item(
        Key={
            'id': event['pathParameters']['id']
        }
    )
    
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
        },
        "body": json.dumps(response)
    }