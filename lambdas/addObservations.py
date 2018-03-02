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
    
    with table.batch_writer() as batch:
        for item in body['Items']:
            if not item['temperature'].isnumeric():
                return create_response(error="Temperature has to be numeric.")
            if item['temperature-scale'] != 'celcius' and item['temperature-scale'] != 'fahrenheit' :
                return create_response(error="Temperature scale can only be fahrenheit or celcius")
            if not item['location-id'].isalnum():
                return create_response(error="Invalid location id.")
            batch.put_item(
                Item = {
                    'id': uuid.uuid1().hex,
                    'location-id': item['location-id'],
                    'timestamp': datetime.utcnow().isoformat()+'Z',
                    'temperature': item['temperature'],
                    'temperature-scale': item['temperature-scale']
                }
            )
    
    return create_response()