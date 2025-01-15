#!/bin/bash

# Create the S3 bucket
echo "creating documents-bucket"
awslocal s3api create-bucket --bucket documents-bucket

# Upload the initial document
echo "uploading file to documents-bucket"
awslocal s3 cp /data/initial-doc.txt s3://documents-bucket/initial-doc.txt
