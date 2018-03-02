import boto3
import json
import uuid
from datetime import datetime

def create_response(body=None, error=None):
    if error is None:
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin" : "*",
            },
            "body": body
        }
    else:
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin" : "*",
            },
            "error": error
        }

def lambda_handler(event, context): 
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('reaktor-observations')
    
    body = json.loads(event['body'])
    if not body['Item']['xCoord'].replace('.','',1).isnumeric() or not body['Item']['yCoord'].replace('.','',1).isnumeric():
        return create_response(error="Invalid coordinates.")
    if not body['Item']['name'].isalnum():
        return create_response(error="Location name must be alphanumeric")
    
    table.put_item(
        Item={
            'id': uuid.uuid1().hex,
            'name': body['Item']['name'],
            'xCoord': body['Item']['xCoord'],
            'yCoord': body['Item']['yCoord']
            }
        )
    
    return create_response(body="Location added.")