import boto3
import json
import uuid
from datetime import datetime

def create_response(body=None, error=None):
    if error is None:
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin' : '*',
            },
            'body': json.dumps(body)
        }
    else:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin' : '*',
            },
            'error': json.dumps(error)
        }

def lambda_handler(event, context): 
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('reaktor-observations')
    
    body = json.loads(event['body'])
    
    with table.batch_writer() as batch:
        for item in body['Items']:
            if not item['temperature'].replace('.','',1).lstrip('-+').isnumeric():
                return create_response(error={'error':'Temperature has to be numeric.'})
            if item['temperatureScale'] != 'celcius' and item['temperatureScale'] != 'fahrenheit' :
                return create_response(error={'error':'Temperature scale can only be fahrenheit or celcius'})
            if not item['locationId'].isalnum():
                return create_response(error={'error':'Invalid location id.'})
            batch.put_item(
                Item = {
                    'id': uuid.uuid1().hex,
                    'locationId': item['locationId'],
                    'timestamp': datetime.utcnow().isoformat()+'Z',
                    'temperature': item['temperature'],
                    'temperatureScale': item['temperatureScale']
                }
            )
    
    return create_response(body={'message' : 'Observation(s) added.'})