import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('reaktor-observations')
    
    observation_id = event['pathParameters']['id']
    
    table.delete_item(
        Key={
            'id': observation_id
        }
    )
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*',
        }
    }