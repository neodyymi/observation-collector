import boto3
import json
import uuid

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
    table = dynamodb.Table('reaktor-locations')

    item = json.loads(event['body'])['Item']
    if not item['xCoord'].replace('.','',1).lstrip('-+').isnumeric() or not item['yCoord'].replace('.','',1).lstrip('-+').isnumeric():
        return create_response(error={'error': 'Invalid coordinates.', 'item': item})
    if not item['name'].isalnum():
        return create_response(error={'error': 'Location name must be alphanumeric', 'item': item})
    
    newItem = {
            'id': uuid.uuid1().hex,
            'name': item['name'],
            'xCoord': item['xCoord'],
            'yCoord': item['yCoord']
            }
    table.put_item(
        Item = newItem
        )
    
    return create_response(body={'message': 'Location added.', 'Item': newItem})