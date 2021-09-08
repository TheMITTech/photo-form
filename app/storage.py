import os
import boto3
from botocore.exceptions import ClientError

# get environment variables
S3_ENDPOINT = os.environ.get('S3_ENDPOINT', None)
S3_ACCESS_KEY = os.environ['S3_ACCESS_KEY']
S3_SECRET_KEY = os.environ['S3_SECRET_KEY']
S3_BUCKET_NAME = os.environ['S3_BUCKET_NAME']

# S3 Setup - this should go in individual functions
s3 = boto3.resource('s3',
    endpoint_url = S3_ENDPOINT,
    aws_access_key_id = S3_ACCESS_KEY,
    aws_secret_access_key = S3_SECRET_KEY
)
bucket = s3.Bucket(S3_BUCKET_NAME)


def create_presigned_post(object_name, bucket_name=S3_BUCKET_NAME,
                          fields=None, conditions=None, expiration=3600):
    """Generate a presigned URL S3 POST request to upload a file

    :param bucket_name: string
    :param object_name: string
    :param fields: Dictionary of prefilled form fields
    :param conditions: List of conditions to include in the policy
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Dictionary with the following keys:
        url: URL to post to
        fields: Dictionary of form fields and values to submit with the POST
    :return: None if error.
    """
    s3_client = boto3.client('s3',
        endpoint_url = S3_ENDPOINT,
        aws_access_key_id = S3_ACCESS_KEY,
        aws_secret_access_key = S3_SECRET_KEY
    )

    try:
        response = s3_client.generate_presigned_post(bucket_name,
                                                     object_name,
                                                     Fields=fields,
                                                     Conditions=conditions,
                                                     ExpiresIn=expiration)
    except ClientError as e:
        return None

    # The response contains the presigned URL and required fields
    return response

def get_download_url(object_name, bucket_name=S3_BUCKET_NAME, expiration=3600):
    """Generate a presigned URL to share an S3 object

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Presigned URL as string. If error, returns None.

    this may be too slow because I will need to call it on a lot of objects.
    Unless it happens locally? that could be. Will experiment.
    """

    # Generate a presigned URL for the S3 object
    s3_client = boto3.client('s3',
        endpoint_url = S3_ENDPOINT,
        aws_access_key_id = S3_ACCESS_KEY,
        aws_secret_access_key = S3_SECRET_KEY
    )

    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response

